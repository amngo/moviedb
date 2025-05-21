import { formatDate } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { IoInformationCircle } from 'react-icons/io5';
import { Movie, MovieDetails, Recommendation } from 'tmdb-ts';

function BigMoviePoster({
    movie,
}: {
    movie: Movie | Recommendation | MovieDetails;
}) {
    return (
        <Link href={`/movie/${movie.id}`} className="group">
            <div className="h-full w-full overflow-hidden rounded-md">
                <Image
                    src={
                        movie.poster_path
                            ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
                            : '/movie_placeholder.png'
                    }
                    alt={movie.title}
                    width={250}
                    height={375}
                    quality={100}
                    priority
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out">
                    <div
                        className="absolute top-0 left-0 w-full h-full"
                        style={{
                            backgroundImage: `linear-gradient(to bottom, transparent 0, rgba(0,0,0,0.3) 200px, rgba(0,0,0,0.75) 300px)`,
                        }}
                    />
                    <div className="absolute w-full bottom-0 left-0 grid">
                        <div className="h-[50px] flex justify-between items-center px-4">
                            <h2 className="font-bold truncate w-[200px]">
                                {movie.title}
                            </h2>
                        </div>
                        <div className="h-[50px] flex justify-between items-center px-4 bg-black/25">
                            <p className="text-sm">
                                {formatDate(movie.release_date)}
                            </p>
                            <IoInformationCircle className="text-2xl" />
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default BigMoviePoster;
