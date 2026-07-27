<script lang="ts">
  import { AID_TYPE } from '$lib/aid';
  import markerIcon from '$lib/assets/marker-icon.png';
  import markerShadow from '$lib/assets/marker-shadow.png';

  interface Props {
    aidRequest: AidRequest;
  }

  let { aidRequest }: Props = $props();
  let AidIcon = $derived(AID_TYPE[aidRequest.aidType].icon);
</script>

<div class="relative">
  <img src={markerIcon} alt="marker" />
  <img src={markerShadow} alt="shadow" class="absolute top-0 left-0 z-[-1]" />
  <AidIcon size={16} class="absolute top-1 left-1.25" />
</div>
