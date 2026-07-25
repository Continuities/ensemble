import {} from 'better-auth';
import { pgTable, uuid, text, timestamp, date } from 'drizzle-orm/pg-core';

export const aidRequest = pgTable('aid_request', {
  id: uuid().defaultRandom().primaryKey(),
  aidType: text('aid_type').notNull(),
  shortDescription: text('short_description').notNull(),
  date: date('date').notNull(),
  location: text('location'),
  latitude: text('latitude'),
  longitude: text('longitude'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull()
});
