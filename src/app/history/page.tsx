'use client';
import BigMoviePoster from '@/components/BigMoviePoster';
import Loader from '@/components/Loader/Loader';
import Heading from '@/components/ui/Heading';
import { getMutipleMovies } from '@/lib/tmdb';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'motion/react';

const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.07 } },
};

const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.75 } },
};

export default function Page() {
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
                variants={container}
                initial="hidden"
                animate="show"
                className="mt-4 grid grid-cols-4 col-span-2 justify-items-center gap-y-4 w-full"
            >
                {data.map((movie) => (
                    <motion.li
                        variants={item}
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
