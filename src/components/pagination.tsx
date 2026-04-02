'use client';

import { useCharacters } from '@/hooks/use-characters';
import { useFilters } from '@/hooks/use-filters';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function Pagination() {
  const { status, gender, page, setPage } = useFilters();

  const { data } = useCharacters({
    status: status || undefined,
    gender: gender || undefined,
    page,
  });

  if (!data || data.info.pages <= 1) return null;

  const { pages } = data.info;

  const getPageNumbers = () => {
    const delta = 2;
    const range: (number | '...')[] = [];

    for (let i = Math.max(2, page - delta); i <= Math.min(pages - 1, page + delta); i++) {
      range.push(i);
    }

    if (page - delta > 2) range.unshift('...');
    if (page + delta < pages - 1) range.push('...');

    range.unshift(1);
    if (pages > 1) range.push(pages);

    return range;
  };

  return (
    <div className="flex items-center justify-center gap-1.5 py-8">
      <Button
        variant="outline"
        size="icon"
        onClick={() => setPage(page - 1)}
        disabled={page <= 1}
        className="h-8 w-8"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {getPageNumbers().map((p, i) =>
        p === '...' ? (
          <span key={`dot-${i}`} className="px-1 text-muted-foreground">
            …
          </span>
        ) : (
          <Button
            key={p}
            variant={p === page ? 'default' : 'outline'}
            size="sm"
            onClick={() => setPage(p as number)}
            className="h-8 min-w-[2rem] px-2.5 text-xs"
          >
            {p}
          </Button>
        )
      )}

      <Button
        variant="outline"
        size="icon"
        onClick={() => setPage(page + 1)}
        disabled={page >= pages}
        className="h-8 w-8"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
