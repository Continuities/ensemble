<script lang="ts">
  import type { PageProps } from './$types';
  import { m } from '$lib/paraglide/messages';
  import { Button } from '$lib/components/ui/button';
  import * as Card from '$lib/components/ui/card';
  import { signout } from '$lib/api/auth.remote';

  let { data }: PageProps = $props();
  let name = $derived(data.user?.name ?? 'Anon');
</script>

<Card.Root class="-my-4 w-full max-w-sm">
  <Card.Header>
    <Card.Title>Mutual Aid Map</Card.Title>
    <Card.Action>
      {#if !data.user}
        <Button variant="link" href="/login">Sign in</Button>
      {:else}
        <form {...signout} method="POST">
          <Button type="submit" variant="link">Sign out</Button>
        </form>
      {/if}
    </Card.Action>
  </Card.Header>
  <Card.Content>
    <p>{m.hello_world({ name })}</p>
  </Card.Content>
  <Card.Footer></Card.Footer>
</Card.Root>
