<script lang="ts">
  import { signinOrSignup } from '$lib/api/auth.remote';
  import { getErrorMessage } from '$lib/utils';
  import { Button } from '$lib/components/ui/button';
  import { Label } from '$lib/components/ui/label';
  import { Input } from '$lib/components/ui/input';
  import * as Card from '$lib/components/ui/card';
  let error = $state<string | undefined>(undefined);
</script>

<form
  class="flex flex-col gap-6 w-full h-full justify-center items-center"
  {...signinOrSignup.enhance(async (form) => {
    try {
      await form.submit();
    } catch (err) {
      error = getErrorMessage(err);
    }
  })}
>
  <Card.Root class="w-full max-w-sm">
    <Card.Header>
      <Card.Title>Login</Card.Title>
    </Card.Header>
    <Card.Content>
      <div class="flex flex-col gap-6">
        <div class="grid gap-2">
          <Label for="email">Email</Label>
          <Input id="email" {...signinOrSignup.fields.email.as('email')} />
        </div>
        <div class="grid gap-2">
          <Label for="password">Password</Label>
          <Input id="password" {...signinOrSignup.fields._password.as('password')} />
        </div>
        <div class="grid gap-2">
          <Label for="name">Name (for registration)</Label>
          <Input id="name" {...signinOrSignup.fields.name.as('text')} />
        </div>

        {#if error}
          <p class="text-red-500">{error}</p>
        {/if}
      </div>
    </Card.Content>
    <Card.Footer class="flex-col gap-2">
      <Button class="w-full" {...signinOrSignup.fields.action.as('submit', 'signin')}>Login</Button>
      <Button class="w-full" {...signinOrSignup.fields.action.as('submit', 'signup')}
        >Register</Button
      >
    </Card.Footer>
  </Card.Root>
</form>
