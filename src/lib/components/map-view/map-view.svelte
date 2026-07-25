<script lang="ts">
  import 'leaflet/dist/leaflet.css';
  import { onMount } from 'svelte';
  import { theme } from '$lib/theme.svelte';
  import { renderComponentToHtml } from '$lib/utils';
  import { AidRequestPopup } from '../aid-request-popup';

  interface Props {
    aidRequests: AidRequest[];
  }

  const TILE_LAYER_URL = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
  const DARK_TILE_LAYER_URL =
    'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}.png';

  const tileLayerUrl = theme === 'dark' ? DARK_TILE_LAYER_URL : TILE_LAYER_URL;

  let { aidRequests }: Props = $props();

  onMount(async () => {
    const { default: Leaflet } = await import('leaflet');
    const map = Leaflet.map('map').setView([51.505, -0.09], 13);
    Leaflet.tileLayer(tileLayerUrl, {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    map.locate({ setView: true, maxZoom: 16 });
    for (const aidRequest of aidRequests) {
      const marker = Leaflet.marker([aidRequest.location.lat, aidRequest.location.lng]).addTo(map);
      marker.bindPopup(renderComponentToHtml(AidRequestPopup, { aidRequest }));
    }
  });
</script>

<div id="map" class="h-full w-full"></div>
