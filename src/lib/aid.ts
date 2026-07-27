import { m } from '$lib/paraglide/messages';
import HammerIcon from '@lucide/svelte/icons/hammer';
import MessageIcon from '@lucide/svelte/icons/message-circle';
import CarIcon from '@lucide/svelte/icons/car-front';
import ShoppingIcon from '@lucide/svelte/icons/shopping-basket';
import BrainIcon from '@lucide/svelte/icons/brain';

export const AID_TYPE = {
  labour: {
    name: m.aid_type_labour(),
    icon: HammerIcon
  },
  social: {
    name: m.aid_type_social(),
    icon: MessageIcon
  },
  transport: {
    name: m.aid_type_transport(),
    icon: CarIcon
  },
  resources: {
    name: m.aid_type_resources(),
    icon: ShoppingIcon
  },
  skill: {
    name: m.aid_type_skill(),
    icon: BrainIcon
  }
} satisfies Record<string, AidType>;
