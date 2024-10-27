import { users } from '@schema/drizzle'
import { drizzle } from 'drizzle-orm/d1'
import { Hono } from 'hono'

const app = new Hono<{ Bindings: CloudflareBindings }>()

app.get('/', (c) => {
  return c.text('Hello Hono changed!')
})

app.get('/users', async (c) => {
  const db = drizzle(c.env.DB)
  const result = await db.select().from(users).all()
  return c.json(result)
})

export default app