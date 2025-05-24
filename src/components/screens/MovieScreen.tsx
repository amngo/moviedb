'use client';
import CastGroup from '@/app/movie/[id]/_components/CastGroup';
import CrewGroup from '@/app/movie/[id]/_components/CrewGroup';
import GenreTags from '@/app/movie/[id]/_components/GenreTags';
import MainPoster from '@/app/movie/[id]/_components/MainPoster';
import MovieInfo from '@/app/movie/[id]/_components/MovieInfo';
import MovieList from '@/app/movie/[id]/_components/MovieList';
import Overview from '@/app/movie/[id]/_components/Overview';
import { tmdb } from '@/lib/tmdb';
import { ExtendedMovieDetails } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import {
    getCastImages,
    getCertification,
    getDirectors,
    getRecommendations,
    getTrailer,
} from '@/lib/tmdb';
import Heading from '@/components/ui/Heading';
import { getAverageImageColor } from '@/lib/utils';
import Image from 'next/image';
import { useEffect } from 'react';

function MovieScreen() {
    const { id } = useParams();
    const { data: movie, isError } = useQuery({
        queryKey: ['movie', id],
        queryFn: async () => {
            const movieId = Number(id);
            if (isNaN(movieId)) {
                throw new Error('Invalid movie ID');
            }
            const result = (await tmdb.movies.details(
                movieId
            )) as ExtendedMovieDetails;

            const rgb = await getAverageImageColor(
                `https://image.tmdb.org/t/p/original${result.poster_path}`
            );
            result.rgb = rgb;

            return result;
        },
    });

    const { data: certification } = useQuery({
        queryKey: ['certification', id],
        queryFn: () => getCertification(Number(id)),
    });

    const { data: cast, isLoading: castLoading } = useQuery({
        queryKey: ['cast', id],
        queryFn: () => getCastImages(Number(id)),
    });

    const { data: crew, isLoading: crewLoading } = useQuery({
        queryKey: ['crew', id],
        queryFn: () => getDirectors(Number(id)),
    });

    const { data: recommendations } = useQuery({
        queryKey: ['recommendations', id],
        queryFn: () => getRecommendations(Number(id)),
    });

    const { data: trailer } = useQuery({
        queryKey: ['trailer', id],
        queryFn: () => getTrailer(Number(id)),
    });

    useEffect(() => {
        const history = localStorage.getItem('history');
        const historyArray = history ? JSON.parse(history) : [];

        // If duplicate, remove it first
        const index = historyArray.indexOf(id);
        if (index !== -1) {
            historyArray.splice(index, 1);
        }

        historyArray.push(id);
        localStorage.setItem('history', JSON.stringify(historyArray));

        if (historyArray.length > 20) {
            historyArray.shift();
            localStorage.setItem('history', JSON.stringify(historyArray));
        }
    }, [id]);

    if (isError) {
        return (
            <div className="flex flex-col items-center justify-center w-full gap-2">
                <p className="text-3xl">
                    Error when fetching movie information. Please try again or
                    another movie.
                </p>
            </div>
        );
    }

    if (!movie) return <div className="w-full h-screen"></div>;

    const {
        title,
        poster_path,
        backdrop_path,
        release_date,
        runtime,
        overview,
        budget,
        revenue,
        genres,
    } = movie;

    return (
        <>
            <div className="fixed top-0 left-0 w-full h-screen">
                <div
                    className="absolute inset-0 z-10 backdrop-blur-sm"
                    style={{
                        backgroundColor: `rgba(${movie.rgb}, 0.60)`,
                    }}
                ></div>
                <Image
                    src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                    alt={`${title} backdrop`}
                    className="object-cover w-full h-full"
                    layout="fill"
                />
            </div>

            <div
                className="movie-bg w-full h-full max-w-[1080px] min-h-screen z-10 relative rounded-md overflow-hidden"
                style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original${backdrop_path})`,
                    backgroundSize: 'contain',
                    backgroundPosition: 'top',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <div
                    className="lg:pt-[350px] p-4 lg:p-6 pb-24 grid justify-center lg:grid-cols-[min-content_1fr] gap-x-8"
                    style={{
                        backgroundImage: `linear-gradient(to bottom, transparent 0, rgb(${movie.rgb}) 550px, rgb(${movie.rgb}) 100%)`,
                    }}
                >
                    <div className="flex flex-col items-center col-start-1">
                        <MainPoster
                            posterPath={poster_path ?? ''}
                            trailer={trailer ?? undefined}
                        />
                    </div>

                    <div className="flex flex-col gap-12 mt-8 lg:mt-0">
                        <div className="flex flex-col items-center gap-4 lg:items-start">
                            <h1 className="text-3xl font-bold lg:text-5xl">
                                {title}
                            </h1>
                            <GenreTags genres={genres} />
                            <MovieInfo
                                certification={certification ?? undefined}
                                release_date={release_date}
                                runtime={runtime}
                                budget={budget}
                                revenue={revenue}
                            />
                        </div>
                        {overview && (
                            <div className="col-start-2">
                                <Overview overview={overview} />
                            </div>
                        )}
                        <CrewGroup loading={crewLoading} crew={crew ?? []} />
                        <CastGroup loading={castLoading} cast={cast ?? []} />
                        {recommendations && recommendations.length > 0 && (
                            <div className="flex flex-col items-start justify-start gap-4 overflow-hidden">
                                <Heading>Recommendations</Heading>
                                <MovieList movies={recommendations ?? []} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default MovieScreen;
