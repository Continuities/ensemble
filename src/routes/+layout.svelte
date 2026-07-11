<script lang="ts">
  import './layout.css';
  import type { Pathname } from '$app/types';
  import { resolve } from '$app/paths';
  import { page } from '$app/state';
  import { locales, localizeHref } from '$lib/paraglide/runtime';
  import favicon from '$lib/assets/favicon.png';
  import Auth from '$lib/components/auth/auth.svelte';
  import { theme } from '$lib/theme.svelte';
  import { m } from '$lib/paraglide/messages';

  let { children, data } = $props();
  let isAuthPage = $derived(page.url.pathname.startsWith('/signin'));

  $effect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  });
</script>

<svelte:head>
  <title>{m.title()}</title>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="robots" content="noindex,nofollow" />
  <meta name="description" content={m.description()} />
  <meta property="og:description" content={m.description()} />
  <meta property="og:title" content={m.title()} />
  <meta property="og:site_name" content={m.title()} />
  <link rel="icon" href={favicon} />
  <script>
    (function () {
      const theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', theme);
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      }
    })();
  </script>
</svelte:head>
{#if !isAuthPage}
  <nav class="absolute top-0 right-0 p-4 z-900">
    <Auth user={data.user} />
  </nav>
{/if}
<main class="relative h-screen w-screen">
  {@render children()}
</main>

<div style="display:none">
  {#each locales as locale (locale)}
    <a href={resolve(localizeHref(page.url.pathname, { locale }) as Pathname)}>{locale}</a>
  {/each}
</div>
