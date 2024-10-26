import { sql } from "drizzle-orm";
import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";

export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  name: text('name'),
  created: integer("created", { mode: "timestamp_ms" }).default(sql`(STRFTIME('%s', 'now') * 1000)`)
}); 