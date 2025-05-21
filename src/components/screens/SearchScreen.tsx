'use client';
import { searchMovies } from '@/lib/tmdb';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'motion/react';
import BigMoviePoster from '../BigMoviePoster';
import Loader from '../Loader/Loader';
import Pagination from '../Pagination/Pagination';
import { MOTION_CONTAINER, MOTION_ITEM } from '@/lib/constants';

function SearchScreen({ q, page }: { q: string; page: string }) {
    const pathname = '/search';

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
                variants={MOTION_CONTAINER}
                initial="hidden"
                animate="show"
                className="mt-4 grid grid-cols-4 col-span-2 justify-items-center gap-y-4 w-full"
            >
                {data.results.map((movie) => (
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

export default SearchScreen;
