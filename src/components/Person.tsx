import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function CastMember({
  id,
  name,
  character,
  profile_path,
}: {
  id: number;
  name: string;
  character: string;
  profile_path?: string;
}) {
  return (
    <li>
      <Link href={`/person/${id}`} className="flex items-center gap-4">
        <Image
          src={
            profile_path
              ? `https://image.tmdb.org/t/p/w500${profile_path}`
              : '/actor_placeholder.png'
          }
          alt={name}
          width={100}
          height={200}
          className="object-cover object-center w-12 h-16 rounded-xl"
          priority
        />
        <div className="flex flex-col gap-2">
          <p className="font-bold truncate">{name}</p>
          <p className="text-xs truncate">{character}</p>
        </div>
      </Link>
    </li>
  );
}

export default CastMember;
