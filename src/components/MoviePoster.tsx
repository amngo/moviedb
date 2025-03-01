import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function MoviePoster({
  id,
  title,
  posterPath,
  width = 175,
}: {
  id: number;
  title: string;
  posterPath?: string;
  width?: number;
}) {
  return (
    <Link
      href={`/movie/${id}`}
      className="relative flex items-center justify-center transition-all duration-300 ease-out hover:scale-105 group "
      style={{ width: width }}
    >
      <Image
        className="rounded-lg"
        src={
          posterPath
            ? `https://image.tmdb.org/t/p/w500${posterPath}`
            : '/movie_placeholder.png'
        }
        alt={title}
        width={200}
        height={300}
        priority
      />
      <span className="absolute bottom-0 left-0 flex items-center justify-center w-full p-4 text-xs font-bold text-center text-white transition-opacity duration-300 bg-black opacity-0 group-hover:opacity-100">
        {title}
      </span>
    </Link>
  );
}

export default MoviePoster;
