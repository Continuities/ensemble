import { m } from '$lib/paraglide/messages';
import HammerIcon from '@lucide/svelte/icons/hammer';

export const AID_TYPE = {
  labour: {
    name: m.aid_type_labour(),
    icon: HammerIcon
  }
} satisfies Record<string, AidType>;
