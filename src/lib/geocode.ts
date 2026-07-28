import { PUBLIC_AUTOCOMPLETE_TOKEN } from '$env/static/public';

const NOMINATIM_URI = 'https://nominatim.openstreetmap.org';
const APP_USERAGENT = 'ensemble/1.0 (michael@doublespeakgames.com)';

const AUTOCOMPLETE_URI = 'https://api.mapbox.com/search/searchbox/v1/suggest';
const AUTOCOMPLETE_MIN_CHARS = 5;

// Use free Nominatim for geocoding
export async function geocodeAddress(address: string) {
  const url = new URL(`${NOMINATIM_URI}/search`);
  url.search = new URLSearchParams({
    q: address,
    format: 'json',
    limit: '1'
  }).toString();
  const headers = new Headers();
  headers.append('User-Agent', APP_USERAGENT);
  const response = await fetch(url, {
    method: 'GET',
    headers
  });
  const data = await response.json();
  if (!Array.isArray(data) || data.length === 0) {
    return undefined;
  }
  return {
    lat: data[0].lat,
    lng: data[0].lon
  };
}

interface AutocompleteProps {
  search: string;
  signal: AbortSignal;
  sessionId: string;
}

// Use Mapbox for autocomplete.
// If usage blows past free tier, will need another solution.
export async function autocomplete({
  search,
  signal,
  sessionId
}: AutocompleteProps): Promise<AddressSearchResult[]> {
  if (search.length < AUTOCOMPLETE_MIN_CHARS) {
    return [];
  }
  const url = new URL(`${AUTOCOMPLETE_URI}`);
  url.search = new URLSearchParams({
    access_token: PUBLIC_AUTOCOMPLETE_TOKEN,
    session_token: sessionId,
    q: search,
    limit: '5',
    types: 'address'
  }).toString();
  const response = await fetch(url, { signal });
  const data = await response.json();
  if (!Array.isArray(data.suggestions)) {
    return [];
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return data.suggestions.map((d: any) => ({
    id: d.context.address.id,
    name: d.name,
    fullAddress: d.full_address
  }));
}
