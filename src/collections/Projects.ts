import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'url', 'isActive', 'sortOrder', 'updatedAt'],
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
      required: false,
      validate: (value: any) => {
        if (!value) return true

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
        description: 'Live hosting URL for this project (optional).',
      },
    },
    {
      name: 'githubUrl',
      type: 'text',
      required: false,
      validate: (value: any) => {
        if (!value) return true

        try {
          const parsed = new URL(String(value))
          return parsed.protocol === 'http:' || parsed.protocol === 'https:'
            ? true
            : 'URL must start with http:// or https://.'
        } catch {
          return 'Please enter a valid URL (example: https://github.com/username/repo).'
        }
      },
      admin: {
        position: 'sidebar',
        description: 'GitHub repository URL (optional).',
      },
    },
    {
      name: 'category',
      type: 'select',
      defaultValue: 'Other',
      required: true,
      options: [
        { label: 'AI', value: 'AI' },
        { label: 'MLOps', value: 'MLOps' },
        { label: 'Backend', value: 'Backend' },
        { label: 'Tools', value: 'Tools' },
        { label: 'Frontend', value: 'Frontend' },
        { label: 'Other', value: 'Other' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Category for dynamic filtering.',
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
      required: false,
      admin: {
        description: 'Project thumbnail image (optional).',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Short public description of the project (optional).',
      },
    },
    {
      name: 'recognition',
      type: 'text',
      admin: {
        description: 'Awards, hackathons, showcases, or special highlights (example: UTS FEIT AI Showcase 2026).',
      },
    },
    {
      name: 'tags',
      type: 'text',
      admin: {
        description: 'Comma-separated list of technologies used (example: React, Next.js, SQLite).',
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      admin: {
        description: 'Optional short internal note (backward compatibility).',
      },
    },
  ],
}
