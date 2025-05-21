import PersonScreen from '@/components/screens/PersonScreen';
import { tmdb } from '@/lib/tmdb';
import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from '@tanstack/react-query';

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const queryClient = new QueryClient();

    await Promise.all([
        queryClient.prefetchQuery({
            queryKey: ['person', id],
            queryFn: async () => {
                const personId = Number(id);
                if (isNaN(personId)) {
                    throw new Error('Invalid person ID');
                }
                const result = await tmdb.people.details(personId);
                return result;
            },
        }),
        queryClient.prefetchQuery({
            queryKey: ['credits', id],
            queryFn: () => tmdb.people.movieCredits(Number(id)),
        }),
    ]);

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <PersonScreen id={id} />
        </HydrationBoundary>
    );
}
