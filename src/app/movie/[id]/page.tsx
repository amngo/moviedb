import { tmdb } from '@/lib/tmdb';
import { ExtendedMovieDetails } from '@/types';
import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from '@tanstack/react-query';
import {
    getCastImages,
    getCertification,
    getDirectors,
    getRecommendations,
    getTrailer,
} from '@/lib/tmdb';
import { getAverageImageColor } from '@/lib/utils';
import MovieScreen from '@/components/screens/MovieScreen';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const movieId = Number(id);
    if (isNaN(movieId)) {
        throw new Error('Invalid movie ID');
    }

    const result = await tmdb.movies.details(movieId);
    const year = new Date(result.release_date).getFullYear();
    const title = `${result.title} (${year}) | MovieDB`;

    return {
        title,
        description: result.overview,
    };
}

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const queryClient = new QueryClient();

    await Promise.all([
        queryClient.prefetchQuery({
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
        }),
        queryClient.prefetchQuery({
            queryKey: ['certification', id],
            queryFn: () => getCertification(Number(id)),
        }),
        queryClient.prefetchQuery({
            queryKey: ['cast', id],
            queryFn: () => getCastImages(Number(id)),
        }),
        queryClient.prefetchQuery({
            queryKey: ['crew', id],
            queryFn: () => getDirectors(Number(id)),
        }),
        queryClient.prefetchQuery({
            queryKey: ['recommendations', id],
            queryFn: () => getRecommendations(Number(id)),
        }),
        queryClient.prefetchQuery({
            queryKey: ['trailer', id],
            queryFn: () => getTrailer(Number(id)),
        }),
    ]);

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <MovieScreen />
        </HydrationBoundary>
    );
}
