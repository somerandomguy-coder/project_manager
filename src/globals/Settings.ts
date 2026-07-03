import type { GlobalConfig } from 'payload'

export const Settings: GlobalConfig = {
  slug: 'settings',
  access: {
    read: () => true,
    update: () => true,
  },
  fields: [
    {
      name: 'filterCategory',
      type: 'select',
      defaultValue: 'all',
      required: true,
      options: [
        { label: 'Show All Categories', value: 'all' },
        { label: 'AI Only', value: 'AI' },
        { label: 'MLOps Only', value: 'MLOps' },
        { label: 'Backend Only', value: 'Backend' },
        { label: 'Tools Only', value: 'Tools' },
        { label: 'Frontend Only', value: 'Frontend' },
        { label: 'Other Only', value: 'Other' },
      ],
      admin: {
        description: 'Filter what category of projects is visible to visitors on the frontend. Choose "Show All Categories" to show everything.',
      },
    },
  ],
}
