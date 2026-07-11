import { mount, type Component } from 'svelte';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChild<T> = T extends { child?: any } ? Omit<T, 'child'> : T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChildren<T> = T extends { children?: any } ? Omit<T, 'children'> : T;
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>;
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & { ref?: U | null };

export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  if (error && typeof error === 'object') {
    if ('message' in error) {
      return String(error.message);
    }
    if (
      'body' in error &&
      error.body &&
      typeof error.body === 'object' &&
      'message' in error.body
    ) {
      return String(error.body.message);
    }
  }
  return typeof error === 'string' ? error : 'Unknown error';
}

export function renderComponentToHtml<P extends Record<string, unknown>>(
  component: Component<P>,
  props: P
) {
  const container = document.createElement('div');
  mount(component, { target: container, props });
  return container.innerHTML;
}
