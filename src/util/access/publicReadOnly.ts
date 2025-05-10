import type { CollectionConfig, GlobalConfig } from 'payload'
import { isLoggedIn } from './isLoggedIn'

export const publicReadOnly: CollectionConfig['access'] = {
  read: () => true,
  create: isLoggedIn,
  update: isLoggedIn,
  delete: isLoggedIn,
}

export const publicReadOnlyGlobal: GlobalConfig['access'] = {
  read: () => true,
  update: isLoggedIn,
}
