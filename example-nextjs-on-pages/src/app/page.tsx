
import { getRequestContext } from "@cloudflare/next-on-pages";
import { drizzle } from "drizzle-orm/d1";
import { users } from "@schema/drizzle";
import UserList from "@/app/UserList";

export const runtime = 'edge'

export default async function Home() {
  const { env } = getRequestContext();
  const DB = drizzle(env.DB);

  const userList = await DB.select().from(users).all();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <UserList initialUsers={userList} />
    </main>
  );
}
