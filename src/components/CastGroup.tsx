import React from 'react';
import Person from './Person';
import PersonSkeleton from './skeletons/PersonSkeleton';
import { FaArrowRight } from 'react-icons/fa';
import Heading from './ui/Heading';

function CastGroup({
  cast,
  loading,
}: {
  cast: { id: number; name: string; character: string; profile_path: string }[];
  loading: boolean;
}) {
  return (
    <div className="flex flex-col items-start justify-start w-full gap-4">
      <Heading>Cast</Heading>

      {loading && (
        <div
          role="status"
          className="grid w-full grid-cols-3 animate-pulse gap-y-4"
        >
          <PersonSkeleton />
          <PersonSkeleton />
          <PersonSkeleton />
          <PersonSkeleton />
          <PersonSkeleton />
          <PersonSkeleton />
          <PersonSkeleton />
          <PersonSkeleton />
          <PersonSkeleton />
          <PersonSkeleton />
          <PersonSkeleton />
          <PersonSkeleton />
          <span className="sr-only">Loading...</span>
        </div>
      )}

      {cast.length > 0 && (
        <ul className="grid w-full grid-cols-3 gap-y-4">
          {cast.map((person) => (
            <Person
              key={person.id}
              id={person.id}
              name={person.name}
              character={person.character}
              profile_path={person.profile_path}
            />
          ))}
        </ul>
      )}

      <button className="flex items-center self-center gap-2 px-6 py-4 text-lg">
        <span>See All</span>
        <FaArrowRight className="inline-block" />
      </button>
    </div>
  );
}

export default CastGroup;
