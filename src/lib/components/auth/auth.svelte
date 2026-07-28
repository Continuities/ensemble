<script lang="ts">
  import type { User } from 'better-auth';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
  import { Button } from '$lib/components/ui/button';

  import { m } from '$lib/paraglide/messages';
  import { signout } from '$lib/api/auth.remote';
  import UserAvatar from '../user-avatar/user-avatar.svelte';

  interface Props {
    user: User | undefined;
  }

  let { user }: Props = $props();
</script>

{#if user}
  <DropdownMenu.Root>
    <DropdownMenu.Trigger>
      <UserAvatar size="lg" {user} />
    </DropdownMenu.Trigger>
    <DropdownMenu.Content class="w-56 z-900" align="end" sideOffset={16}>
      <DropdownMenu.Label>{m.auth_account()}</DropdownMenu.Label>
      <DropdownMenu.Separator />
      <form {...signout}>
        <Button
          type="submit"
          variant="ghost"
          class="w-full justify-start text-destructive hover:bg-destructive hover:text-destructive-foreground"
        >
          {m.auth_signout()}
        </Button>
      </form>
    </DropdownMenu.Content>
  </DropdownMenu.Root>
{:else}
  <Button variant="default" href="/signin">{m.auth_signin()}</Button>
{/if}
