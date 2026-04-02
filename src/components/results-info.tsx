'use client';

import { useCharacters } from '@/hooks/use-characters';
import { useFilters } from '@/hooks/use-filters';
import { Users } from 'lucide-react';

export function ResultsInfo() {
  const { status, gender, page } = useFilters();

  const { data } = useCharacters({
    status: status || undefined,
    gender: gender || undefined,
    page,
  });

  return (
    <div className="flex items-center text-sm text-muted-foreground">
      <div className="flex items-center gap-2">
        <Users className="h-4 w-4" />
        {data ? (
          <span>
            <span className="font-medium text-foreground">{data.info.count}</span> characters found
          </span>
        ) : (
          <span>Loading...</span>
        )}
      </div>
    </div>
  );
}
