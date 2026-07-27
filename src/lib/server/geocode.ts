const NOMINATIM_URI = 'https://nominatim.openstreetmap.org';
const APP_USERAGENT = 'ensemble/1.0 (michael@doublespeakgames.com)';

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
