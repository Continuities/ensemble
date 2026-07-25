import * as v from 'valibot';
import { form } from '$app/server';
import { APIError } from 'better-auth';
import { error } from '@sveltejs/kit';
import { AID_TYPE } from '$lib/aid';

export const createAidRequest = form(
  v.object({
    aidType: v.picklist(Object.keys(AID_TYPE) as AidTypeKey[]),
    shortDescription: v.pipe(v.string(), v.nonEmpty(), v.maxLength(100)),
    details: v.pipe(v.string(), v.nonEmpty(), v.maxLength(300)),
    location: v.optional(v.pipe(v.string(), v.maxLength(100))),
    date: v.pipe(v.string(), v.isoDate())
  }),
  async ({ aidType, shortDescription, details, location, date }) => {
    try {
      console.log('CREATE AID REQUEST ::: ', {
        aidType,
        shortDescription,
        details,
        location,
        date
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
