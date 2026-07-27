import type { Component } from 'svelte';
import { AID_TYPE } from '$lib/aid';

declare global {
  interface AidType {
    name: string;
    icon: Component;
  }

  type AidTypeKey = keyof typeof AID_TYPE;

  interface PreciseLocation {
    address: string;
    lat: number;
    lng: number;
  }

  interface Helper {
    helperId: string;
    aidRequestId: string;
    status: 'helping' | 'pending' | 'declined';
  }
  interface AidRequest {
    id: string;
    createdBy: string;
    aidType: AidTypeKey;
    shortDescription: string;
    details: string;
    location?: PreciseLocation;
    date: Date;
    helpers?: Helper[];
  }
}
