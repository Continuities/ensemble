import * as v from 'valibot';
import { form } from '$app/server';
import { APIError } from 'better-auth';
import { error } from '@sveltejs/kit';
import { AID_TYPE } from '$lib/aid';

export const createAidRequest = form(
  v.object({
    aidType: v.picklist(Object.keys(AID_TYPE) as AidTypeKey[])
  }),
  async ({ aidType }) => {
    try {
      console.log('CREATE AID REQUEST ::: ', { aidType });
    } catch (e) {
      if (e instanceof APIError) {
        error(400, e.message || 'Failed to create aid request');
      }
      error(500, 'Unexpected error');
    }

    return { success: true };
  }
);
