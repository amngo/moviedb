'use client';
import BigMoviePoster from '@/components/BigMoviePoster';
import Loader from '@/components/Loader/Loader';
import Pagination from '@/components/Pagination/Pagination';
import { searchMovies } from '@/lib/tmdb';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'motion/react';
import { usePathname, useSearchParams } from 'next/navigation';

const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.07 } },
};

const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.75 } },
};

export default function Page() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const page = searchParams.get('page');
    const q = searchParams.get('q');

    const { data } = useQuery({
        queryKey: ['movies', q, page],
        queryFn: async () => {
            if (!q) {
                return null;
            }
            const result = await searchMovies(q, page ? Number(page) : 1);
            return result;
        },
    });

    if (!data) {
        return (
            <div className="flex flex-col gap-2 justify-center items-center min-h-screen w-full">
                <p className="text-3xl">Fetching movies...</p>
                <Loader />
            </div>
        );
    }

    return (
        <section className="flex flex-col w-full min-h-screen pt-12 items-start">
            <Pagination
                path={pathname}
                query={`q=${q}`}
                title={`Search results for "${q}"`}
                totalResults={data.total_results}
                totalPages={data.total_pages}
                currentPage={page ? Number(page) : 1}
            />
            <motion.ul
                variants={container}
                initial="hidden"
                animate="show"
                className="mt-4 grid grid-cols-4 col-span-2 justify-items-center gap-y-4 w-full"
            >
                {data.results.map((movie) => (
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
