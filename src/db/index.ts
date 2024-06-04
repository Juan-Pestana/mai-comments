import { LibSQLDatabase, drizzle } from 'drizzle-orm/libsql'
import { createClient } from '@libsql/client'

import * as authSchema from './schema/authSchema'

const schema = { ...authSchema }

const client = createClient({
  url:
    process.env.NODE_ENV != 'production'
      ? 'http://127.0.0.1:8080'
      : (process.env.DATABASE_URL! as string),
  authToken: process.env.DATABASE_AUTH_TOKEN as string,
})
export const db = drizzle(client, {
  schema,
})
