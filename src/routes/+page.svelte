<script lang="ts">
  import { MapView } from '$lib/components/map-view';
  import RequestAidButton from '$lib/components/request-aid-button/request-aid-button.svelte';
  let { data } = $props();

  let newAidRequest = $state<AidRequest>();

  const onCreateAidRequest = (newRequest: AidRequest) => {
    newAidRequest = newRequest;
  };
</script>

<MapView currentUser={data.user} aidRequests={data.aidRequests} {newAidRequest} />
<div class="absolute flex justify-center w-full bottom-12 z-900 pointer-events-none">
  <div class="pointer-events-auto">
    <RequestAidButton isLoggedIn={Boolean(data.user)} onCreate={onCreateAidRequest} />
  </div>
</div>
