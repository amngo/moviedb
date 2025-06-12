import { MOTION_ITEM } from '@/lib/constants';
import { formatDate } from '@/lib/utils';
import { motion } from 'motion/react';
import Link from 'next/link';
import { Movie, MovieDetails, Recommendation } from 'tmdb-ts';

function BigMoviePoster({
    movie,
}: {
    movie: Movie | Recommendation | MovieDetails;
}) {
    return (
        <motion.li
            variants={MOTION_ITEM}
            key={movie.id}
            className="relative w-auto h-auto"
        >
            <Link
                href={`/movie/${movie.id}`}
                className="group flex flex-col gap-2"
            >
                <div className="w-full h-full overflow-hidden rounded-md">
                    <img
                        src={
                            movie.poster_path
                                ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
                                : '/movie_placeholder.png'
                        }
                        alt={movie.title}
                        width={500}
                        height={750}
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                </div>
                <div className="w-full grid gap-1">
                    <div className="flex justify-between items-center overflow-hidden">
                        <h2 className="font-bold truncate text-sm">
                            {movie.title}
                        </h2>
                    </div>
                    <p className="text-xs">{formatDate(movie.release_date)}</p>
                </div>
            </Link>
        </motion.li>
    );
}

export default BigMoviePoster;
