'use client';
import { getMutipleMovies } from '@/lib/tmdb';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'motion/react';
import BigMoviePoster from '../BigMoviePoster';
import Heading from '../ui/Heading';
import { MOTION_CONTAINER } from '@/lib/constants';

function HistoryScreen() {
    const { data } = useQuery({
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

    if (!data) return null;

    return (
        <section className="flex flex-col items-start w-full pt-4">
            {data.length === 0 ? (
                <Heading>No history found. Start looking up movies!</Heading>
            ) : (
                <Heading>Your Movie History</Heading>
            )}
            <motion.ul
                variants={MOTION_CONTAINER}
                initial="hidden"
                animate="show"
                className="grid items-center w-full grid-cols-2 gap-4 mt-4 sm:grid-cols-3 lg:grid-cols-4 justify-items-center"
            >
                {data.map((movie) => (
                    <BigMoviePoster key={movie.id} movie={movie} />
                ))}
            </motion.ul>
        </section>
    );
}

export default HistoryScreen;
