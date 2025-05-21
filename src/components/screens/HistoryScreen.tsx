'use client';

import { getMutipleMovies } from '@/lib/tmdb';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'motion/react';
import BigMoviePoster from '../BigMoviePoster';
import Loader from '../Loader/Loader';
import Heading from '../ui/Heading';
import { MOTION_CONTAINER, MOTION_ITEM } from '@/lib/constants';

function HistoryScreen() {
    const { data, isLoading } = useQuery({
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

    if (isLoading || !data) {
        return (
            <div className="flex flex-col gap-2 justify-center items-center min-h-screen w-full">
                <p className="text-3xl">Fetching your history...</p>
                <Loader />
            </div>
        );
    }

    return (
        <section className="flex flex-col w-full min-h-screen pt-12 items-start">
            {data.length === 0 ? (
                <Heading>No history found. Start looking up movies!</Heading>
            ) : (
                <Heading>Your Movie History</Heading>
            )}
            <motion.ul
                variants={MOTION_CONTAINER}
                initial="hidden"
                animate="show"
                className="mt-4 grid grid-cols-4 col-span-2 justify-items-center gap-y-4 w-full"
            >
                {data.map((movie) => (
                    <motion.li
                        variants={MOTION_ITEM}
                        key={movie.id}
                        className="min-w-[250px] min-h-[375px] relative"
                    >
                        <BigMoviePoster movie={movie} />
                    </motion.li>
                ))}
            </motion.ul>
        </section>
    );
}

export default HistoryScreen;
