import { browser } from '$app/environment';

type Theme = 'light' | 'dark';

const getInitialTheme = (): Theme => {
  if (!browser) {
    return 'light';
  }
  return (document.documentElement.getAttribute('data-theme') as Theme) || 'light';
};

export const theme = $state<Theme>(getInitialTheme());
