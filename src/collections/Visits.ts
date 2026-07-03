import type { CollectionConfig } from 'payload'

export const Visits: CollectionConfig = {
  slug: 'visits',
  admin: {
    useAsTitle: 'ipAddress',
    defaultColumns: ['ipAddress', 'referrer', 'filterActive', 'createdAt'],
  },
  access: {
    create: () => true,
    read: ({ req: { user } }) => Boolean(user),
    update: () => false,
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'ipAddress',
      type: 'text',
      admin: {
        description: 'IP Address of the visitor.',
      },
    },
    {
      name: 'userAgent',
      type: 'text',
      admin: {
        description: 'User Agent string (device & browser details).',
      },
    },
    {
      name: 'referrer',
      type: 'text',
      admin: {
        description: 'HTTP Referer (where they came from).',
      },
    },
    {
      name: 'filterActive',
      type: 'text',
      admin: {
        description: 'The active curator category filter at the time of the visit.',
      },
    },
  ],
}
