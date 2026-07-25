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
      },
      {
        id: '2',
        aidType: 'labour',
        shortDescription: 'Help build a deck',
        details: 'I have no idea how to build a deck. Please help me.',
        date: new Date('2027-01-01'),
        location: {
          address: '6482 Boul. Saint-Laurent, Montréal, QC, Canada',
          lat: 45.53557025953018,
          lng: -73.60939989314936
        }
      },
      {
        id: '3',
        aidType: 'resources',
        shortDescription: 'I really need a carrot',
        details:
          'This stew needs one thing to be perfect. One thing that I do not have. A single carrot.',
        date: new Date('2027-01-01'),
        location: {
          address: '6482 Boul. Saint-Laurent, Montréal, QC, Canada',
          lat: 45.53057025954018,
          lng: -73.61939989314936
        }
      },
      {
        id: '4',
        aidType: 'skill',
        shortDescription: 'Help with taxes',
        details:
          'I need someone who knows how to do taxes to help me with taxes because I do not know how to do taxes.',
        date: new Date('2027-01-01'),
        location: {
          address: '6482 Boul. Saint-Laurent, Montréal, QC, Canada',
          lat: 45.52557025954018,
          lng: -73.6023998931493
        }
      },
      {
        id: '5',
        aidType: 'transport',
        shortDescription: 'Take me to the movies',
        details: 'Why are all the movie theatres so far away? Can you drive me there? Please?',
        date: new Date('2027-01-01'),
        location: {
          address: '6482 Boul. Saint-Laurent, Montréal, QC, Canada',
          lat: 45.53557025954018,
          lng: -73.6029989314936
        }
      }
    ]
  };
};
