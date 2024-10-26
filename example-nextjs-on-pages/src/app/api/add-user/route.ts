import type { NextRequest } from 'next/server'
import { getRequestContext } from '@cloudflare/next-on-pages'
import { v4 as uuidv4 } from 'uuid';
import { drizzle } from 'drizzle-orm/d1';
import { users } from '@schema/drizzle';


export const runtime = 'edge'

export async function POST(request: NextRequest) {
  const data = await request.json() as { name: string };

  const { env } = getRequestContext();

  const DB = drizzle(env.DB);

  await DB.insert(users).values([
    { id: uuidv4(), name: data.name },
  ]).run();

  const allUsers = await DB.select().from(users).all();

  return new Response(JSON.stringify(allUsers))
}
