<script lang="ts">
  import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
  import CrossIcon from '@lucide/svelte/icons/cross';
  import { m } from '$lib/paraglide/messages';
  import { createAidRequestForm } from '$lib/api/aid.remote';
  import { AID_TYPE } from '$lib/aid';
  import * as Dialog from '$lib/components/ui/dialog';
  import { Label } from '$lib/components/ui/label';
  import * as Select from '$lib/components/ui/select';
  import { Input } from '$lib/components/ui/input';
  import { Textarea } from '$lib/components/ui/textarea/';
  import { AddressInput } from '$lib/components/address-input';

  const aidTypes = Object.entries(AID_TYPE);
  aidTypes.sort(([a], [b]) => a.localeCompare(b));

  interface Props {
    isLoggedIn?: boolean;
    onCreate?: (created: AidRequest) => void;
  }
  let { isLoggedIn, onCreate }: Props = $props();

  let isDialogOpen = $state(false);
  let selectedKey = $state<AidTypeKey | undefined>(undefined);
  let selected = $derived(selectedKey ? AID_TYPE[selectedKey] : undefined);
</script>

{#if !isLoggedIn}
  <Button href="/signin" variant="default" size="lg">
    <CrossIcon />
    {m.aid_create()}
  </Button>
{:else}
  <Dialog.Root bind:open={isDialogOpen}>
    <Dialog.Trigger type="button" class={buttonVariants({ variant: 'default', size: 'lg' })}>
      <CrossIcon />
      {m.aid_create()}
    </Dialog.Trigger>
    <Dialog.Content class="z-900 flex">
      <form
        class="flex flex-col gap-6 w-full"
        {...createAidRequestForm.enhance(async (form) => {
          try {
            const success = await form.submit();
            if (success) {
              selectedKey = undefined;
              isDialogOpen = false;
              if (form.result && form.result.success && onCreate) {
                onCreate(form.result.aidRequest);
              }
            }
          } catch (err) {
            console.error(err);
          }
        })}
      >
        <Dialog.Header>
          <Dialog.Title>{m.aid_create()}</Dialog.Title>
          <Dialog.Description>
            {m.aid_description()}
            <div class="italic mt-1">{m.aid_disclaimer()}</div>
          </Dialog.Description>
        </Dialog.Header>
        <div class="flex flex-col gap-4 w-full">
          <div class="grid gap-2">
            <Label for="aid-type">{m.aid_type()}</Label>
            <Select.Root
              required
              type="single"
              {...createAidRequestForm.fields.aidType.as('select')}
              bind:value={selectedKey}
            >
              <Select.Trigger id="aid-type">
                {#if selected}
                  <selected.icon />
                  {selected.name}
                {:else}
                  {m.aid_selecttype()}
                {/if}
              </Select.Trigger>
              <Select.Content>
                {#each aidTypes as [key, { name, icon: AidIcon }] (key)}
                  <Select.Item value={key}><AidIcon />{name}</Select.Item>
                {/each}
              </Select.Content>
            </Select.Root>
          </div>
          <div class="grid gap-2">
            <Label for="short-description">{m.aid_shortdescription()}</Label>
            <Input
              required
              id="short-description"
              {...createAidRequestForm.fields.shortDescription.as('text')}
            />
          </div>
          <div class="grid gap-2">
            <Label for="details">{m.aid_details()}</Label>
            <Textarea required id="details" {...createAidRequestForm.fields.details.as('text')} />
          </div>
          <div class="grid gap-2">
            <Label for="date">{m.aid_date()}</Label>
            <Input required id="date" {...createAidRequestForm.fields.date.as('date')} />
          </div>
          <div class="flex flex-col gap-2">
            <Label for="location">{m.aid_location()}</Label>
            <AddressInput id="location" {...createAidRequestForm.fields.location.as('text')} />
          </div>
        </div>
        <Dialog.Footer>
          <Dialog.Close type="button" class={buttonVariants({ variant: 'outline' })}>
            {m.cancel()}
          </Dialog.Close>
          <Button type="submit" disabled={!!createAidRequestForm.pending}>{m.save()}</Button>
        </Dialog.Footer>
      </form>
    </Dialog.Content>
  </Dialog.Root>
{/if}
