<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { m } from '$lib/paraglide/messages';
  import MapPinIcon from '@lucide/svelte/icons/map-pin';
  import CalendarIcon from '@lucide/svelte/icons/calendar-days';
  import type { User } from 'better-auth';
  import UserAvatar from '../user-avatar/user-avatar.svelte';
  interface Props {
    aidRequest: AidRequest;
    currentUser?: User;
  }

  let { aidRequest, currentUser }: Props = $props();
  let isHelping = $derived(
    Boolean(aidRequest.helpers?.find((h) => h.helperId === currentUser?.id))
  );
</script>

<div class="flex flex-col gap-4">
  <div class="flex items-start gap-2">
    {#if aidRequest.owner}
      <UserAvatar user={aidRequest.owner} size="lg" />
    {/if}
    <div class="flex flex-col gap-1.5">
      <div class="font-bold text-base leading-none">{aidRequest.shortDescription}</div>
      <div class="flex gap-2 items-center leading-none">
        <CalendarIcon class="shrink-0" size="16px" />
        {aidRequest.date.toLocaleDateString(undefined, {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}
      </div>
      {#if aidRequest.location}
        <div class="flex gap-2 items-center leading-none">
          <MapPinIcon class="shrink-0" size="16px" />{aidRequest.location.address}
        </div>
      {/if}
    </div>
  </div>
  <div>{aidRequest.details}</div>
  {#if currentUser}
    <div class="flex justify-end">
      {#if currentUser.id === aidRequest.createdBy}
        <Button
          variant="destructive"
          id="cancel-request-button"
          data-aid-request-id={aidRequest.id}
        >
          {m.aid_cancel()}
        </Button>
      {:else if isHelping}
        <Button variant="destructive" id="cancel-offer-button" data-aid-request-id={aidRequest.id}>
          {m.aid_canceloffer()}
        </Button>
      {:else}
        <Button variant="secondary" id="offer-aid-button" data-aid-request-id={aidRequest.id}>
          {m.aid_offer()}
        </Button>
      {/if}
    </div>
  {/if}
</div>
