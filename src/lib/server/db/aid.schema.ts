import {} from 'better-auth';
import { relations } from 'drizzle-orm';
import { pgTable, pgEnum, uuid, text, timestamp, date, point } from 'drizzle-orm/pg-core';
import { user } from './auth.schema';

export const aidRequest = pgTable('aid_request', {
  id: uuid().defaultRandom().primaryKey(),
  aidType: text('aid_type').notNull(),
  shortDescription: text('short_description').notNull(),
  details: text('details').notNull(),
  date: date('date').notNull(),
  address: text('address'),
  location: point('location', { mode: 'xy' }),
  createdBy: text('created_by')
    .references(() => user.id, { onDelete: 'cascade' })
    .notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull()
});

export const helperStatus = pgEnum('helper_status', ['helping', 'pending', 'declined']);

export const helper = pgTable('helper', {
  helperId: text('helper_id')
    .references(() => user.id, { onDelete: 'cascade' })
    .notNull(),
  aidRequestId: uuid('aid_request_id')
    .notNull()
    .references(() => aidRequest.id, { onDelete: 'cascade' }),
  status: helperStatus('helper_status').notNull()
});

export const aidRequestRelations = relations(aidRequest, ({ one, many }) => ({
  helpers: many(helper),
  owner: one(user, {
    fields: [aidRequest.createdBy],
    references: [user.id]
  })
}));

export const helperRelations = relations(helper, ({ one }) => ({
  aidRequest: one(aidRequest, {
    fields: [helper.aidRequestId],
    references: [aidRequest.id]
  }),
  helper: one(user, {
    fields: [helper.helperId],
    references: [user.id]
  })
}));
