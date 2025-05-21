import HomeScreen from '@/components/screens/HomeScreen';
import {
    getNowPlayingMovies,
    getPopularMovies,
    getUpcomingMovies,
} from '@/lib/tmdb';
import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from '@tanstack/react-query';

export default async function Page() {
    const queryClient = new QueryClient();
    await Promise.all([
        queryClient.prefetchQuery({
            queryKey: ['nowPlayingMovies'],
            queryFn: getNowPlayingMovies,
        }),
        queryClient.prefetchQuery({
            queryKey: ['popularMovies'],
            queryFn: getPopularMovies,
        }),
        queryClient.prefetchQuery({
            queryKey: ['upcomingMovies'],
            queryFn: getUpcomingMovies,
        }),
    ]);

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <HomeScreen />
        </HydrationBoundary>
    );
}
