import { useQuery } from '@tanstack/react-query';
import { fetchCharacters } from '@/lib/api';
import type { CharacterFilters } from '@/types/character';

export const characterKeys = {
  all: ['characters'] as const,
  list: (filters: CharacterFilters) => [...characterKeys.all, filters] as const,
};

export function useCharacters(filters: CharacterFilters) {
  return useQuery({
    queryKey: characterKeys.list(filters),
    queryFn: () => fetchCharacters(filters),
    staleTime: 5 * 60 * 1000,
    refetchOnMount: false,
    placeholderData: (prev) => prev,
  });
}
