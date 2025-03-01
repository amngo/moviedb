'use client';

import CastGroup from '@/components/CastGroup';
import CrewGroup from '@/components/CrewGroup';
import GenreTags from '@/components/GenreTags';
import MainPoster from '@/components/MainPoster';
import MovieInfo from '@/components/MovieInfo';
import MovieList from '@/components/MovieList';
import Overview from '@/components/Overview';
import SearchBar from '@/components/SearchBar';
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

export default function Page() {
  const { id } = useParams();
  const { data: movie, isLoading } = useQuery({
    queryKey: ['movie', id],
    queryFn: async () => {
      const movieId = Number(id);
      if (isNaN(movieId)) {
        throw new Error('Invalid movie ID');
      }
      const result = (await tmdb.movies.details(
        movieId
      )) as ExtendedMovieDetails;
      console.log(result);
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

  //   const { data: images, isLoading: imagesLoading } = useQuery({
  //     queryKey: ['images', id],
  //     queryFn: () => getMovieImages(Number(id)),
  //   });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!movie) {
    return <div>Error loading movie details</div>;
  }

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
      <div className="absolute top-8 right-12">
        <SearchBar />
      </div>

      <main
        className="w-full h-full"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${backdrop_path})`,
          backgroundSize: 'contain',
          backgroundPosition: 'top',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div
          className="mt-[350px] p-6 pb-24 grid grid-cols-[min-content_1fr_1fr] grid-rows-[min-content_min-content_min-content_min-content_min-content] gap-x-8 gap-y-12"
          style={{
            backgroundImage: `linear-gradient(to bottom, transparent 0, oklch(0.21 0.006 285.885) 200px, oklch(0.21 0.006 285.885) 300px)`,
          }}
        >
          <div className="flex flex-col items-center col-span-1 row-span-5 gap-4">
            <MainPoster
              posterPath={poster_path ?? ''}
              trailer={trailer ?? undefined}
            />

            {/* <Ratings /> */}
          </div>

          <div className="flex flex-col col-span-2 row-span-1 gap-4">
            <h1 className="text-5xl font-bold">{title}</h1>
            <GenreTags genres={genres} />
            <MovieInfo
              certification={certification ?? undefined}
              release_date={release_date}
              runtime={runtime}
              budget={budget}
              revenue={revenue}
            />
          </div>

          <div className="col-span-2">
            <Overview overview={overview} />
          </div>

          <div className="col-span-2">
            <CrewGroup loading={crewLoading} crew={crew ?? []} />
          </div>

          <div className="col-span-2">
            <CastGroup loading={castLoading} cast={cast ?? []} />
          </div>

          <div className="flex flex-col items-start justify-start col-span-2 row-span-4 gap-4">
            <Heading>Recommendations</Heading>
            <MovieList movies={recommendations ?? []} />
          </div>
        </div>
      </main>
    </>
  );
}
