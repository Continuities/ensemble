<script lang="ts">
  import { enhance } from '$app/forms';
  import { m } from '$lib/paraglide/messages';
  import type { PageProps } from './$types';
  let { data }: PageProps = $props();
  let name = $derived(data.user?.name ?? 'Anon');
</script>

<p>{m.hello_world({ name })}</p>
{#if data.user}
  <form method="post" action="?/signOut" use:enhance>
    <button class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
      >Sign out</button
    >
  </form>
{/if}
