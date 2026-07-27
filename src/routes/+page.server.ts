import { getAidRequests } from '$lib/server/aid';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ depends }): Promise<{ aidRequests: AidRequest[] }> => {
  depends('aidRequests');
  const aidRequests = await getAidRequests();
  return {
    aidRequests
  };
};
