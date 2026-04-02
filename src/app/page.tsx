import type { SearchParams } from 'nuqs/server';
import { searchParamsCache } from '@/lib/search-params';
import { fetchCharacters } from '@/lib/api';
import { FilterBar } from '@/components/filter-bar';
import { CharacterGrid } from '@/components/character-grid';
import { Pagination } from '@/components/pagination';
import { ResultsInfo } from '@/components/results-info';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { characterKeys } from '@/hooks/use-characters';

interface PageProps {
  searchParams: Promise<SearchParams>;
}

export default async function HomePage({ searchParams }: PageProps) {
  const { status, gender, page } = await searchParamsCache.parse(searchParams);

  const filters = {
    status: status || undefined,
    gender: gender || undefined,
    page,
  };

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: characterKeys.list(filters),
    queryFn: () => fetchCharacters(filters),
  });

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 border-b border-border/60 bg-background/90 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <span className="text-base font-semibold tracking-tight text-foreground">
            Rick &amp; Morty Explorer
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Characters
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Browse and filter all characters from the Rick and Morty universe.
          </p>
        </div>

        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <FilterBar />
          <ResultsInfo />
        </div>

        <HydrationBoundary state={dehydrate(queryClient)}>
          <CharacterGrid />
          <Pagination />
        </HydrationBoundary>
      </main>
    </div>
  );
}
