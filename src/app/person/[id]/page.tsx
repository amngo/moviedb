'use client';

import Biography from '@/components/Biography';
import PopularRoles from '@/components/PopularRoles';
import Timeline from '@/components/Timeline/Timeline';
import { tmdb } from '@/lib/tmdb';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import React from 'react';

export default function Page() {
  const { id } = useParams();
  const { data: person, isLoading } = useQuery({
    queryKey: ['person', id],
    queryFn: async () => {
      const personId = Number(id);
      if (isNaN(personId)) {
        throw new Error('Invalid person ID');
      }
      const result = await tmdb.people.details(personId);
      console.log(result);
      return result;
    },
  });

  const { data: credits, isLoading: creditsLoading } = useQuery({
    queryKey: ['credits', id],
    queryFn: () => tmdb.people.movieCredits(Number(id)),
  });

  if (isLoading || creditsLoading || !person || !credits) {
    return <div>Loading...</div>;
  }

  // Sort credits.cast by popularity without mutating the original array
  const sortedByPopularity = [...credits.cast].sort(
    (a, b) => b.popularity - a.popularity
  );

  return (
    <div className="grid grid-cols-[300px_1fr] gap-12 p-6 pb-24 bg-zinc-900">
      <img
        src={
          person.profile_path
            ? `https://image.tmdb.org/t/p/w500${person.profile_path}`
            : '/actor_placeholder.jpg'
        }
        alt={person.name}
        className="rounded-lg w-[300px]"
      />

      <div className="col-start-2">
        <Biography bio={person.biography} />
      </div>

      <div className="col-span-2">
        <PopularRoles movies={sortedByPopularity.slice(0, 10)} />
      </div>

      <div className="col-span-2">
        <Timeline credits={credits.cast} />
      </div>
    </div>
  );
}
