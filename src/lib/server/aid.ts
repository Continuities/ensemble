import { db } from '$lib/server/db';
import { aidRequest } from './db/aid.schema';

const getLocation = (row: typeof aidRequest.$inferSelect) =>
  row.address && row.location
    ? {
        address: row.address,
        lat: row.location.y,
        lng: row.location.x
      }
    : undefined;

export async function getAidRequests(): Promise<AidRequest[]> {
  const rows = await db.select().from(aidRequest);
  return rows.map((r) => ({
    id: r.id,
    createdBy: r.createdBy,
    aidType: r.aidType as AidTypeKey,
    shortDescription: r.shortDescription,
    details: r.details,
    location: getLocation(r),
    date: new Date(r.date)
  }));
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
