import type { CharacterFilters, CharactersResponse } from '@/types/character';

const EXTERNAL_URL = 'https://rickandmortyapi.com/api';

function buildParams(filters: CharacterFilters): string {
  const params = new URLSearchParams();
  if (filters.page) params.set('page', String(filters.page));
  if (filters.status) params.set('status', filters.status);
  if (filters.gender) params.set('gender', filters.gender);
  return params.toString();
}

export async function fetchCharacters(filters: CharacterFilters): Promise<CharactersResponse> {
  const query = buildParams(filters);
  const isServer = typeof window === 'undefined';

  const url = isServer ? `${EXTERNAL_URL}/character?${query}` : `/api/characters?${query}`;

  const res = await fetch(url, isServer ? { next: { revalidate: 60 } } : undefined);

  if (!res.ok) {
    if (res.status === 404) {
      return { info: { count: 0, pages: 0, next: null, prev: null }, results: [] };
    }
    throw new Error(`API error: ${res.status}`);
  }

  return res.json() as Promise<CharactersResponse>;
}
