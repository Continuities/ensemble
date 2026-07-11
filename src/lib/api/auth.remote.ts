import * as v from 'valibot';
import { form, getRequestEvent } from '$app/server';
import { auth } from '$lib/server/auth';
import { APIError } from 'better-auth';
import { error, redirect } from '@sveltejs/kit';

export const signout = form(async () => {
  const event = getRequestEvent();
  await auth.api.signOut({
    headers: event.request.headers
  });
  return { success: true };
});

export const signinOrSignup = form(
  v.object({
    email: v.pipe(v.string(), v.email()),
    _password: v.pipe(v.string(), v.nonEmpty()),
    name: v.optional(v.string()),
    action: v.picklist(['signin', 'signup'])
  }),
  async ({ email, _password: password, name, action }) => {
    try {
      if (action === 'signin') {
        await auth.api.signInEmail({
          body: {
            email,
            password,
            callbackURL: '/auth/verification-success'
          }
        });
      } else {
        await auth.api.signUpEmail({
          body: {
            email,
            password,
            name: name ?? 'UNDEFINED',
            callbackURL: '/auth/verification-success'
          }
        });
      }
    } catch (e) {
      if (e instanceof APIError) {
        error(400, e.message || 'Signin failed');
      }
      error(500, 'Unexpected error');
    }

    return redirect(302, '/');
  }
);
