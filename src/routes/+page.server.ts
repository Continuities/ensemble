import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (): Promise<{ aidRequests: AidRequest[] }> => {
  return {
    aidRequests: [
      {
        id: '1',
        aidType: 'social',
        shortDescription: 'Body Doubling',
        details: 'I need someone to sit with me while I make medical appointments.',
        date: new Date('2027-01-01'),
        location: {
          address: '6482 Boul. Saint-Laurent, Montréal, QC, Canada',
          lat: 45.53057025954018,
          lng: -73.60939989314936
        }
      }
    ]
  };
};
