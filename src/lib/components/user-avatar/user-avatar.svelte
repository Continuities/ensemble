<script lang="ts">
  import * as Avatar from '$lib/components/ui/avatar';
  import type { User } from 'better-auth';
  import type { ComponentProps } from 'svelte';

  interface Props {
    user: User;
    size?: ComponentProps<typeof Avatar.Root>['size'];
  }

  let { user, size = 'default' }: Props = $props();
</script>

<Avatar.Root {size}>
  <Avatar.Image src={user.image} alt={user.name} />
  <Avatar.Fallback>
    {user.name[0]}
  </Avatar.Fallback>
</Avatar.Root>
