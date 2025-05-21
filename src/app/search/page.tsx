import SearchScreen from '@/components/screens/SearchScreen';
import { searchMovies } from '@/lib/tmdb';
import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from '@tanstack/react-query';

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{ q: string; page: string }>;
}) {
    const queryClient = new QueryClient();
    const { q, page } = await searchParams;

    await queryClient.prefetchQuery({
        queryKey: ['movies', q, page],
        queryFn: async () => {
            if (!q) {
                return null;
            }
            const result = await searchMovies(q, page ? Number(page) : 1);
            return result;
        },
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <SearchScreen q={q} page={page} />
        </HydrationBoundary>
    );
}
