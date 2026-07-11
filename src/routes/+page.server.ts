import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (): Promise<{ needs: Need[] }> => {
  return {
    needs: [
      {
        id: '1',
        title: 'Body Doubling',
        description: 'I need someone to sit with me while I make medical appointments.',
        location: {
          address: '6482 Boul. Saint-Laurent, Montréal, QC, Canada',
          lat: 45.53057025954018,
          lng: -73.60939989314936
        }
      }
    ]
  };
};
