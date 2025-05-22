import HistoryScreen from '@/components/screens/HistoryScreen';
import { getMutipleMovies } from '@/lib/tmdb';
import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from '@tanstack/react-query';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'My History | MovieDB',
};

export default async function Page() {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
        queryKey: ['history'],
        queryFn: async () => {
            const history = localStorage.getItem('history');
            if (!history) {
                return [];
            }
            const ids = JSON.parse(history);

            if (ids.length === 0) {
                return [];
            }

            ids.reverse();
            const result = await getMutipleMovies(ids);
            return result;
        },
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <HistoryScreen />
        </HydrationBoundary>
    );
}
