<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { m } from '$lib/paraglide/messages';
  import type { User } from 'better-auth';
  interface Props {
    aidRequest: AidRequest;
    currentUser?: User;
  }

  let { aidRequest, currentUser }: Props = $props();
</script>

<div class="flex flex-col gap-2">
  <div>{aidRequest.shortDescription}</div>
  {#if aidRequest.location}
    <div>{aidRequest.location.address}</div>
  {/if}
  <div>{aidRequest.details}</div>
  {#if currentUser}
    <div>
      {#if currentUser.id === aidRequest.createdBy}
        <Button
          variant="destructive"
          id="cancel-request-button"
          data-aid-request-id={aidRequest.id}
        >
          {m.aid_cancel()}
        </Button>
      {:else}
        <Button variant="secondary" id="offer-aid-button" data-aid-request-id={aidRequest.id}>
          {m.aid_offer()}
        </Button>
      {/if}
    </div>
  {/if}
</div>
