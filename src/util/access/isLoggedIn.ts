import { User } from '@/payload-types'
import type { AccessArgs } from 'payload'

export const isLoggedIn = ({ req: { user } }: AccessArgs<User>): boolean => {
  return !!user
}
