import React from 'react';
import MoviePoster from './MoviePoster';

function MovieList({
  movies,
  width,
  cols = 4,
}: {
  movies: { id: number; title: string; poster_path?: string }[];
  width?: number;
  cols?: number;
}) {
  return (
    <ul
      className="grid w-full h-full place-items-center gap-y-8"
      style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
    >
      {movies.map((movie) => (
        <li key={movie.id}>
          <MoviePoster
            id={movie.id}
            title={movie.title}
            posterPath={movie.poster_path}
            width={width}
          />
        </li>
      ))}
    </ul>
  );
}

export default MovieList;
