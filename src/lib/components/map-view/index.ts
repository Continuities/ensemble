import { cancelOffer, cancelRequest, offerAid } from '$lib/api/aid.remote';
import { invalidate } from '$app/navigation';
import Root from './map-view.svelte';

export {
  Root,
  //
  Root as MapView
};

export function bindPopup() {
  const offerAidButton = document.getElementById('offer-aid-button');
  const cancelRequestButton = document.getElementById('cancel-request-button');
  const cancelOfferButton = document.getElementById('cancel-offer-button');
  if (offerAidButton) {
    offerAidButton.addEventListener('click', async function (e) {
      const target = e.target as HTMLElement;
      target.setAttribute('disabled', 'true');
      const id = target.getAttribute('data-aid-request-id');
      if (id) {
        await offerAid(id);
        invalidate('aidRequests');
      } else {
        console.error('Bad data-aid-request-id:', id);
      }
    });
  }
  if (cancelRequestButton) {
    cancelRequestButton.addEventListener('click', async function (e) {
      const target = e.target as HTMLElement;
      target.setAttribute('disabled', 'true');
      const id = target.getAttribute('data-aid-request-id');
      if (id) {
        await cancelRequest(id);
        invalidate('aidRequests');
      } else {
        console.error('Bad data-aid-request-id:', id);
      }
    });
  }
  if (cancelOfferButton) {
    cancelOfferButton.addEventListener('click', async function (e) {
      const target = e.target as HTMLElement;
      target.setAttribute('disabled', 'true');
      const id = target.getAttribute('data-aid-request-id');
      if (id) {
        await cancelOffer(id);
        invalidate('aidRequests');
      } else {
        console.error('Bad data-aid-request-id:', id);
      }
    });
  }
}
