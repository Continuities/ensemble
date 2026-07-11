<script lang="ts">
  import 'leaflet/dist/leaflet.css';
  import { onMount } from 'svelte';
  import { theme } from '$lib/theme.svelte';

  const TILE_LAYER_URL = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
  const DARK_TILE_LAYER_URL =
    'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}.png';

  const tileLayerUrl = theme === 'dark' ? DARK_TILE_LAYER_URL : TILE_LAYER_URL;

  onMount(async () => {
    const { default: Leaflet } = await import('leaflet');
    const map = Leaflet.map('map').setView([51.505, -0.09], 13);
    Leaflet.tileLayer(tileLayerUrl, {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
  });
</script>

<div id="map" class="h-full w-full"></div>
