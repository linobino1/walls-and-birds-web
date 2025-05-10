import { isLoggedIn } from '@/util/access/isLoggedIn'
import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  access: {
    // Only allow creation of users to non-admins if no users exist
    create: async ({ req: { payload, user } }) =>
      !!user || (await payload.find({ collection: 'users' })).totalDocs === 0,
    read: isLoggedIn, // Only allow reading of users to admins
    update: isLoggedIn,
    delete: isLoggedIn,
  },
  fields: [
    // Email added by default
    // Add more fields as needed
  ],
}
