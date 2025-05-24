'use client';
import { searchMovies } from '@/lib/tmdb';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'motion/react';
import BigMoviePoster from '../BigMoviePoster';
import Pagination from '../Pagination/Pagination';
import { MOTION_CONTAINER } from '@/lib/constants';

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
        return null;
    }

    return (
        <section className="flex flex-col items-start w-full pt-4 gap-4">
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
                className="items-center w-full grid grid-cols-2 col-span-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 justify-items-center"
            >
                {data.results.map((movie) => (
                    <BigMoviePoster key={movie.id} movie={movie} />
                ))}
            </motion.ul>
            <Pagination
                path={pathname}
                query={`q=${q}`}
                title={`Search results for "${q}"`}
                totalResults={data.total_results}
                totalPages={data.total_pages}
                currentPage={page ? Number(page) : 1}
            />
        </section>
    );
}

export default SearchScreen;
