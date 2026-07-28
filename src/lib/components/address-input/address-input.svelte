<script lang="ts">
  import * as Command from '$lib/components/ui/command/index.js';
  import * as Popover from '$lib/components/ui/popover/index.js';
  import { Button } from '$lib/components/ui/button';
  import { tick } from 'svelte';
  import { m } from '$lib/paraglide/messages';
  import { autocomplete } from '$lib/geocode';
  import { v4 as uuid } from 'uuid';
  import type { WithElementRef } from '$lib/utils';
  import type { HTMLInputAttributes } from 'svelte/elements';
  import MapPinIcon from '@lucide/svelte/icons/map-pin';

  const autocompleteSession = uuid();

  type Props = WithElementRef<Omit<HTMLInputAttributes, 'type'>>;

  let props: Props = $props();
  let open = $state<boolean>(false);
  let triggerRef = $state<HTMLButtonElement>(null!);
  let selectedAddress = $state<AddressSearchResult>();
  let typed = $state<string>('');
  let results = $state<AddressSearchResult[]>([]);
  let value = $derived(selectedAddress?.fullAddress);

  $effect(() => {
    const controller = new AbortController();
    autocomplete({ search: typed, signal: controller.signal, sessionId: autocompleteSession })
      .then((r) => (results = r))
      .catch(() => {
        /* swallow */
      });
    return () => {
      controller.abort('obsolete call');
    };
  });

  // We want to refocus the trigger button when the user selects
  // an item from the list so users can continue navigating the
  // rest of the form with the keyboard.
  function closeAndFocusTrigger() {
    open = false;
    tick().then(() => {
      triggerRef.focus();
    });
  }
</script>

{#if props.name}
  <input type="hidden" name={props.name} {value} />
{/if}
<Popover.Root bind:open>
  <Popover.Trigger bind:ref={triggerRef} id={props.id ?? undefined}>
    {#snippet child({ props })}
      <Button
        {...props}
        variant="outline"
        class="w-full justify-between h-auto p-3"
        role="combobox"
        aria-expanded={open}
      >
        {#if selectedAddress}
          <div class="flex flex-col gap-1 items-start justify-start text-wrap text-left">
            <div class="font-bold">{selectedAddress.name}</div>
            <div class="text-xs">{selectedAddress.fullAddress}</div>
          </div>
        {:else}
          {m.aid_selectaddress()}
        {/if}
        <MapPinIcon class="opacity-50" />
      </Button>
    {/snippet}
  </Popover.Trigger>
  <Popover.Content class="p-0">
    <Command.Root shouldFilter={false}>
      <Command.Input bind:value={typed} placeholder={m.aid_searchaddress()} />
      <Command.List class="p-2">
        <Command.Empty>{m.aid_noaddress()}</Command.Empty>
        {#each results as address (address.id)}
          <Command.Item
            value={address.fullAddress}
            onSelect={() => {
              selectedAddress = address;
              closeAndFocusTrigger();
            }}
          >
            <div class="flex flex-col gap-1 items-start">
              <div class="font-bold">{address.name}</div>
              <div class="text-xs">{address.fullAddress}</div>
            </div>
          </Command.Item>
        {/each}
      </Command.List>
    </Command.Root>
  </Popover.Content>
</Popover.Root>
