<script lang="ts">
  import type { PageProps } from './$types';
  import { m } from '$lib/paraglide/messages';
  import * as Card from '$lib/components/ui/card';

  let { data }: PageProps = $props();
  let name = $derived(data.user?.name ?? 'Anon');
</script>

<Card.Root class="-my-4 w-full max-w-sm">
  <Card.Header>
    <Card.Title>Mutual Aid Map</Card.Title>
  </Card.Header>
  <Card.Content>
    <p>{m.hello_world({ name })}</p>
  </Card.Content>
  <Card.Footer></Card.Footer>
</Card.Root>
