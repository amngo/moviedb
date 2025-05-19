import React from 'react';
import Heading from './ui/Heading';
import { PersonMovieCast } from 'tmdb-ts';
import MoviePoster from './MoviePoster';

interface PopularRolesProps {
    movies: PersonMovieCast[];
}

function PopularRoles({ movies }: PopularRolesProps) {
    return (
        <div className="flex flex-col items-start justify-start gap-4">
            <Heading>Popular Roles</Heading>
            <ul className="flex gap-4 overflow-x-scroll p-2 w-full">
                {movies.map((movie) => (
                    <li
                        key={movie.id}
                        className="flex flex-col items-center gap-4"
                    >
                        <MoviePoster
                            width={125}
                            id={movie.id}
                            posterPath={movie.poster_path}
                            title={movie.title}
                        />
                        <p className="text-sm text-center">{movie.character}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PopularRoles;
