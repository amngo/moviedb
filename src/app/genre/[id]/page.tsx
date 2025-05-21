import GenreScreen from '@/components/screens/GenreScreen';
import { getMoviesFromGenre } from '@/lib/tmdb';
import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from '@tanstack/react-query';

export default async function Page({
    params,
    searchParams,
}: {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ page: string }>;
}) {
    const { id } = await params;
    const { page } = await searchParams;
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['movies', id, page],
        queryFn: async () => {
            const result = await getMoviesFromGenre(
                id,
                page ? Number(page) : 1
            );
            return result;
        },
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <GenreScreen id={id} page={page} />
        </HydrationBoundary>
    );
}
