import {} from 'better-auth';
import { pgTable, uuid, text, timestamp, date, point } from 'drizzle-orm/pg-core';

export const aidRequest = pgTable('aid_request', {
  id: uuid().defaultRandom().primaryKey(),
  aidType: text('aid_type').notNull(),
  shortDescription: text('short_description').notNull(),
  details: text('details').notNull(),
  date: date('date').notNull(),
  address: text('address'),
  location: point('location', { mode: 'xy' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull()
});
