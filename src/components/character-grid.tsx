'use client';

import { useCharacters } from '@/hooks/use-characters';
import { useFilters } from '@/hooks/use-filters';
import { CharacterCard } from '@/components/character-card';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, Ghost } from 'lucide-react';

function CardSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <Skeleton className="aspect-square w-full" />
      <div className="space-y-2 p-3">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <div className="mt-2.5 space-y-1.5 border-t border-border pt-2">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-2/3" />
        </div>
      </div>
    </div>
  );
}

export function CharacterGrid() {
  const { status, gender, page, isPending } = useFilters();

  const { data, isLoading, isError } = useCharacters({
    status: status || undefined,
    gender: gender || undefined,
    page,
  });

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-muted-foreground">
        <AlertCircle className="mb-3 h-10 w-10 text-red-400" />
        <p className="text-lg font-medium">Something went wrong</p>
        <p className="text-sm">Could not load characters. Please try again.</p>
      </div>
    );
  }

  const isEmpty = !isLoading && data?.results.length === 0;

  if (isEmpty) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-muted-foreground">
        <Ghost className="mb-3 h-10 w-10" />
        <p className="text-lg font-medium">No characters found</p>
        <p className="text-sm">Try adjusting your filters.</p>
      </div>
    );
  }

  return (
    <div
      className={`grid grid-cols-2 gap-4 transition-opacity duration-200 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ${isPending ? 'opacity-60' : 'opacity-100'}`}
    >
      {isLoading
        ? Array.from({ length: 20 }).map((_, i) => <CardSkeleton key={i} />)
        : data?.results.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
    </div>
  );
}
