<script lang="ts">
  import { MapView } from '$lib/components/map-view';
  import RequestAidButton from '$lib/components/request-aid-button/request-aid-button.svelte';
  let { data } = $props();
</script>

<MapView needs={data.needs} />
<div class="absolute flex justify-center w-full bottom-12 z-900 pointer-events-none">
  <div class="pointer-events-auto">
    <RequestAidButton />
  </div>
</div>
