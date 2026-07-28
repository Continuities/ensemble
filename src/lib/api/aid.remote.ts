import * as v from 'valibot';
import { form, command, getRequestEvent } from '$app/server';
import { APIError } from 'better-auth';
import { error } from '@sveltejs/kit';
import { AID_TYPE } from '$lib/aid';
import {
  createAidOffer,
  createAidRequest,
  deleteAidOffer,
  deleteAidRequest,
  getAidRequest
} from '$lib/server/aid';
import { geocodeAddress } from '$lib/geocode';
import { auth } from '$lib/server/auth';

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
    const event = getRequestEvent();
    const session = await auth.api.getSession({
      headers: event.request.headers
    });
    if (!session) {
      error(401, 'Not logged in');
    }
    try {
      const aidRequest = await createAidRequest({
        aidType,
        shortDescription,
        details,
        location: await getLocationFromAddress(location),
        date: new Date(date),
        createdBy: session.user.id
      });
      return { success: true, aidRequest };
    } catch (e) {
      if (e instanceof APIError) {
        error(400, e.message || 'Failed to create aid request');
      }
      error(500, 'Unexpected error');
    }
  }
);

export const offerAid = command(
  v.pipe(v.string(), v.uuid(), v.nonEmpty()),
  async (aidRequestId) => {
    const event = getRequestEvent();
    const session = await auth.api.getSession({
      headers: event.request.headers
    });
    if (!session) {
      error(401, 'Not logged in');
    }
    await createAidOffer(session.user.id, aidRequestId);
    return { success: true };
  }
);

export const cancelOffer = command(
  v.pipe(v.string(), v.uuid(), v.nonEmpty()),
  async (aidRequestId) => {
    const event = getRequestEvent();
    const session = await auth.api.getSession({
      headers: event.request.headers
    });
    if (!session) {
      error(401, 'Not logged in');
    }
    await deleteAidOffer(session.user.id, aidRequestId);
    return { success: true };
  }
);

export const cancelRequest = command(
  v.pipe(v.string(), v.uuid(), v.nonEmpty()),
  async (aidRequestId) => {
    const event = getRequestEvent();
    const session = await auth.api.getSession({
      headers: event.request.headers
    });
    if (!session) {
      error(401, 'Not logged in');
    }
    const aidRequest = await getAidRequest(aidRequestId);
    if (!aidRequest || aidRequest.createdBy !== session.user.id) {
      error(401, 'Permission denied');
    }
    await deleteAidRequest(aidRequestId);
    return { success: true };
  }
);
