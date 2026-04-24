import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'url', 'isActive', 'sortOrder', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'Project display name (example: Personal Portfolio).',
      },
    },
    {
      name: 'url',
      type: 'text',
      required: true,
      validate: (value) => {
        if (!value) return 'Project URL is required.'

        try {
          const parsed = new URL(String(value))
          return parsed.protocol === 'http:' || parsed.protocol === 'https:'
            ? true
            : 'URL must start with http:// or https://.'
        } catch {
          return 'Please enter a valid URL (example: https://example.com).'
        }
      },
      admin: {
        position: 'sidebar',
        description: 'Live hosting URL for this project.',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
        description: 'Toggle this on/off to show or hide project from the public list.',
      },
    },
    {
      name: 'sortOrder',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        step: 1,
        description: 'Lower numbers appear first on the public page.',
      },
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Project thumbnail image, similar to a product card image.',
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      admin: {
        description: 'Optional short internal/public note shown under the project title.',
      },
    },
  ],
}
