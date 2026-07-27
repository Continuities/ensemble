import { offerAid } from '$lib/api/aid.remote';
import Root from './map-view.svelte';

export {
  Root,
  //
  Root as MapView
};

export function bindPopup(refresh: () => void) {
  const offerAidButton = document.getElementById('offer-aid-button');
  if (offerAidButton) {
    offerAidButton.addEventListener('click', async function (e) {
      const target = e.target as HTMLElement;
      target.setAttribute('disabled', 'true');
      const id = target.getAttribute('data-aid-request-id');
      console.log('Button clicked for AidRequestID:', id);
      if (id) {
        await offerAid(id);
        refresh();
      } else {
        console.error('Bad data-aid-request-id:', id);
      }
    });
  }
}
