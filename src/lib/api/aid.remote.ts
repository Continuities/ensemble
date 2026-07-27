import * as v from 'valibot';
import { form } from '$app/server';
import { APIError } from 'better-auth';
import { error } from '@sveltejs/kit';
import { AID_TYPE } from '$lib/aid';
import { createAidRequest } from '$lib/server/aid';
import { geocodeAddress } from '$lib/server/geocode';

const getLocationFromAddress = async (
  address: string | undefined
): Promise<PreciseLocation | undefined> => {
  if (!address) {
    return undefined;
  }
  const coords = await geocodeAddress(address);
  if (!coords) {
    console.warn('Could not geocode address ', address);
    return undefined;
  }
  return {
    address,
    lat: coords.lat,
    lng: coords.lng
  };
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
        location: await getLocationFromAddress(location),
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
