import * as v from 'valibot';
import { form } from '$app/server';
import { APIError } from 'better-auth';
import { error } from '@sveltejs/kit';
import { AID_TYPE } from '$lib/aid';
import { createAidRequest } from '$lib/server/aid';

const getLocationFromAddress = (address: string | undefined): PreciseLocation | undefined => {
  // TODO: Real gps coords from address
  const pos: { lat: number; lng: number } = {
    lat: 45.53057025954018,
    lng: -73.60939989314936
  };
  pos.lat += Math.random() * 0.01 - 0.005;
  pos.lng += Math.random() * 0.01 - 0.005;
  return address
    ? {
        address,
        ...pos
      }
    : undefined;
};

export const createAidRequestForm = form(
  v.object({
    aidType: v.picklist(Object.keys(AID_TYPE) as AidTypeKey[]),
    shortDescription: v.pipe(v.string(), v.nonEmpty(), v.maxLength(100)),
    details: v.pipe(v.string(), v.nonEmpty(), v.maxLength(300)),
    location: v.optional(v.pipe(v.string(), v.maxLength(100))),
    date: v.pipe(v.string(), v.isoDate())
  }),
  async ({ aidType, shortDescription, details, location, date }) => {
    try {
      await createAidRequest({
        aidType,
        shortDescription,
        details,
        location: getLocationFromAddress(location),
        date: new Date(date)
      });
    } catch (e) {
      if (e instanceof APIError) {
        error(400, e.message || 'Failed to create aid request');
      }
      error(500, 'Unexpected error');
    }

    return { success: true };
  }
);
