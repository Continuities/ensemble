import { getAidRequests } from '$lib/server/aid';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (): Promise<{ aidRequests: AidRequest[] }> => {
  const aidRequests = await getAidRequests();
  return {
    aidRequests
  };
};
