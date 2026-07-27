import { db } from '$lib/server/db';
import { eq, and } from 'drizzle-orm';
import { aidRequest, helper } from './db/aid.schema';

const getLocation = (row: typeof aidRequest.$inferSelect) =>
  row.address && row.location
    ? {
        address: row.address,
        lat: row.location.y,
        lng: row.location.x
      }
    : undefined;

// I'm sick of trying to get the types to work here, and I'd really rather
// just be writing SQL instead of using this ORM...
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const rowToAidRequest = (row: any): AidRequest => ({
  id: row.id,
  createdBy: row.createdBy,
  aidType: row.aidType as AidTypeKey,
  shortDescription: row.shortDescription,
  details: row.details,
  location: getLocation(row),
  date: new Date(row.date),
  helpers: row.helpers
});

export async function getAidRequest(id: string): Promise<AidRequest | undefined> {
  const row = await db.query.aidRequest.findFirst({
    where: eq(aidRequest.id, id)
  });
  return row ? rowToAidRequest(row) : undefined;
}

export async function getAidRequests(): Promise<AidRequest[]> {
  const rows = await db.query.aidRequest.findMany({
    with: {
      helpers: true
    }
  });
  return rows.map(rowToAidRequest);
}

export async function createAidRequest(newAidRequest: Omit<AidRequest, 'id'>) {
  await db.insert(aidRequest).values({
    createdBy: newAidRequest.createdBy,
    aidType: newAidRequest.aidType,
    shortDescription: newAidRequest.shortDescription,
    details: newAidRequest.details,
    address: newAidRequest.location?.address,
    location: newAidRequest.location
      ? { x: newAidRequest.location.lng, y: newAidRequest.location.lat }
      : undefined,
    date: newAidRequest.date.toISOString().split('T')[0]
  });
}

export async function createAidOffer(helperId: string, aidRequestId: string) {
  await db
    .insert(helper)
    .values({
      helperId,
      aidRequestId,
      status: 'helping'
    })
    .onConflictDoNothing();
}

export async function deleteAidRequest(aidRequestId: string) {
  await db.delete(aidRequest).where(eq(aidRequest.id, aidRequestId));
}

export async function deleteAidOffer(helperId: string, aidRequestId: string) {
  await db
    .delete(helper)
    .where(and(eq(helper.helperId, helperId), eq(helper.aidRequestId, aidRequestId)));
}
