import { getPayload, Payload } from 'payload'
import config from '@/payload.config'

import { describe, it, beforeAll, expect } from 'vitest'

let payload: Payload

describe('API', { timeout: 30000 }, () => {
  beforeAll(async () => {
    const payloadConfig = await config
    payload = await getPayload({ config: payloadConfig })

    await payload.delete({
      collection: 'projects',
      where: { id: { exists: true } },
    })
    await payload.delete({
      collection: 'media',
      where: { id: { exists: true } },
    })
  }, 30000)

  it('creates and fetches projects', async () => {
    const media = await payload.create({
      collection: 'media',
      data: {
        alt: 'Test Thumbnail',
      },
      filePath: 'public/media/test.png',
    })

    const project = await payload.create({
      collection: 'projects',
      data: {
        name: 'Test Project',
        url: 'https://example.com/test-project',
        thumbnail: media.id,
        isActive: true,
        sortOrder: 1,
        notes: 'Demo project entry.',
      },
    })

    expect(project).toBeDefined()
    expect(project.name).toBe('Test Project')
    expect(project.isActive).toBe(true)

    const fetchedProjects = await payload.find({
      collection: 'projects',
      where: {
        isActive: {
          equals: true,
        },
      },
    })
    expect(fetchedProjects.docs.some((doc) => doc.id === project.id)).toBe(true)
  })

  it('toggles project activation', async () => {
    const media = await payload.create({
      collection: 'media',
      data: {
        alt: 'Toggle Thumbnail',
      },
      filePath: 'public/media/test.png',
    })

    const project = await payload.create({
      collection: 'projects',
      data: {
        name: 'Visible Project',
        url: 'https://example.com/visible-project',
        thumbnail: media.id,
        isActive: true,
      },
    })

    let visibleProjects = await payload.find({
      collection: 'projects',
      where: {
        isActive: {
          equals: true,
        },
      },
    })
    expect(visibleProjects.docs.some((p) => p.id === project.id)).toBe(true)

    await payload.update({
      collection: 'projects',
      id: project.id,
      data: {
        isActive: false,
      },
    })

    visibleProjects = await payload.find({
      collection: 'projects',
      where: {
        isActive: {
          equals: true,
        },
      },
    })
    expect(visibleProjects.docs.some((p) => p.id === project.id)).toBe(false)
  })

  it('rejects invalid project URL values', async () => {
    const mediaForInvalid = await payload.create({
      collection: 'media',
      data: {
        alt: 'Validation Image',
      },
      filePath: 'public/media/test.png',
    })

    await expect(
      payload.create({
        collection: 'projects',
        data: {
          name: 'Broken URL Project',
          url: 'not-a-valid-url',
          thumbnail: mediaForInvalid.id,
        },
      }),
    ).rejects.toThrow()
  })
})
