<script lang="ts">
  import 'leaflet/dist/leaflet.css';
  import { onMount } from 'svelte';
  import { theme } from '$lib/theme.svelte';
  import { renderComponentToHtml } from '$lib/utils';
  import { AidRequestPopup } from '../aid-request-popup';
  import { AidRequestMarker } from '../aid-request-marker';
  import { type Marker, type Popup, type LayerGroup, type Map as LeafletMap } from 'leaflet';
  import { bindPopup } from '.';
  import type { User } from 'better-auth';

  interface Props {
    aidRequests: AidRequest[];
    currentUser?: User;
  }

  const TILE_LAYER_URL = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
  const DARK_TILE_LAYER_URL =
    'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}.png';

  const tileLayerUrl = theme === 'dark' ? DARK_TILE_LAYER_URL : TILE_LAYER_URL;

  let { aidRequests, currentUser }: Props = $props();
  let aidRequestsById = $derived(new Map(aidRequests.map((r) => [r.id, r])));
  let Leaflet = $state<typeof import('leaflet') | undefined>(undefined);
  let map = $state<LeafletMap | undefined>(undefined);
  let selectedAidRequestId = $state<string | undefined>(undefined);
  let selectedAidRequest = $derived(
    selectedAidRequestId ? aidRequestsById.get(selectedAidRequestId) : undefined
  );
  let currentPopup = $state<Popup | undefined>(undefined);

  // eslint-disable-next-line svelte/prefer-svelte-reactivity
  const markersById = new Map<string, Marker>();

  // This effect redraws the markers whenever the AidRequests prop changes
  $effect(() => {
    if (!map || !Leaflet) {
      return;
    }
    // eslint-disable-next-line svelte/prefer-svelte-reactivity
    const seenAidRequests = new Set<string>();
    for (const aidRequest of aidRequests) {
      seenAidRequests.add(aidRequest.id);
      if (!aidRequest.location || markersById.has(aidRequest.id)) {
        continue;
      }
      const markerIcon = Leaflet.divIcon({
        html: renderComponentToHtml(AidRequestMarker, { aidRequest }),
        className: '',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
        shadowSize: [41, 41]
      });
      const marker = Leaflet.marker([aidRequest.location.lat, aidRequest.location.lng], {
        icon: markerIcon
      }).addTo(map);
      marker.bindPopup('');
      marker.on('click', () => (selectedAidRequestId = aidRequest.id));
      markersById.set(aidRequest.id, marker);
    }
    for (const [id, marker] of markersById.entries()) {
      if (!seenAidRequests.has(id)) {
        map.removeLayer(marker);
      }
    }
  });

  // This effect redraws the current popup if its backing model changes
  $effect(() => {
    if (!map || !Leaflet || !currentPopup) {
      return;
    }
    if (!selectedAidRequest) {
      currentPopup.close();
      return;
    }
    currentPopup.setContent(
      renderComponentToHtml(AidRequestPopup, { aidRequest: selectedAidRequest, currentUser })
    );
    currentPopup.update();
    bindPopup();
  });

  onMount(async () => {
    Leaflet = (await import('leaflet')).default;
    map = Leaflet.map('map').setView([51.505, -0.09], 13);
    Leaflet.tileLayer(tileLayerUrl, {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    map.locate({ setView: true, maxZoom: 16 });
    map.on('popupopen', ({ popup }) => {
      currentPopup = popup;
    });
    map.on('popupclose', () => {
      currentPopup = undefined;
    });
  });
</script>

<div id="map" class="h-full w-full"></div>
