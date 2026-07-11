<script lang="ts">
  import './layout.css';
  import type { Pathname } from '$app/types';
  import { resolve } from '$app/paths';
  import { page } from '$app/state';
  import { locales, localizeHref } from '$lib/paraglide/runtime';
  import favicon from '$lib/assets/favicon.svg';
  import Auth from '$lib/components/auth/auth.svelte';

  let { children, data } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<nav class="absolute top-0 right-0 p-4">
  <Auth user={data.user} />
</nav>
<main class="flex flex-col items-center justify-center min-h-screen gap-6 p-4">
  {@render children()}
</main>

<div style="display:none">
  {#each locales as locale (locale)}
    <a href={resolve(localizeHref(page.url.pathname, { locale }) as Pathname)}>{locale}</a>
  {/each}
</div>
