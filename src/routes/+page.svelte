<script lang="ts">
  import { MapView } from '$lib/components/map-view';
  let { data } = $props();
</script>

<MapView needs={data.needs} />
