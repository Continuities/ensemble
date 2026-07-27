<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { m } from '$lib/paraglide/messages';
  interface Props {
    aidRequest: AidRequest;
  }

  let { aidRequest }: Props = $props();
</script>

<div class="flex flex-col gap-2">
  <div>{aidRequest.shortDescription}</div>
  {#if aidRequest.location}
    <div>{aidRequest.location.address}</div>
  {/if}
  <div>{aidRequest.details}</div>
  <div>
    <Button variant="secondary" id="offer-aid-button" data-aid-request-id={aidRequest.id}>
      {m.aid_offer()}
    </Button>
  </div>
</div>
