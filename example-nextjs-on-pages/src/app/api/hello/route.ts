import type { NextRequest } from 'next/server'
import { getRequestContext } from '@cloudflare/next-on-pages'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  let responseText = 'Hello there World'

  const { env } = getRequestContext()
  const db = env.DB;

  const result = await db.exec("select * from users")

  return new Response(responseText)
}
