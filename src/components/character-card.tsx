'use client';

import Image from 'next/image';
import { MapPin, Tv2 } from 'lucide-react';
import type { Character } from '@/types/character';
import { Badge } from '@/components/ui/badge';

interface CharacterCardProps {
  character: Character;
}

function getStatusVariant(status: string) {
  if (status === 'Alive') return 'alive';
  if (status === 'Dead') return 'dead';
  return 'unknown';
}

export function CharacterCard({ character }: CharacterCardProps) {
  return (
    <article className="group overflow-hidden rounded-xl border border-border/60 bg-card transition-colors duration-200 hover:border-border">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={character.image}
          alt={character.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
        <div className="absolute bottom-2.5 left-2.5">
          <h3 className="truncate text-sm font-semibold leading-tight text-foreground drop-shadow-sm">
            {character.name}
          </h3>
          <p className="mt-0.5 text-xs text-foreground/70">{character.species}</p>
        </div>
        <div className="absolute right-2 top-2">
          <Badge variant={getStatusVariant(character.status)}>{character.status}</Badge>
        </div>
      </div>

      <div className="space-y-1.5 p-3">
        <div className="flex items-start gap-1.5">
          <MapPin className="mt-0.5 h-3 w-3 shrink-0 text-muted-foreground" />
          <span className="line-clamp-1 text-xs text-muted-foreground">
            {character.location.name}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <Tv2 className="h-3 w-3 shrink-0 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">
            {character.episode.length} episode{character.episode.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>
    </article>
  );
}
