'use client';

import { GENRE_POSTERS, MOTION_CONTAINER } from '@/lib/constants';
import { motion } from 'motion/react';
import BigMoviePoster from '../BigMoviePoster';
import Pagination from '../Pagination/Pagination';
import { getMoviesFromGenre } from '@/lib/tmdb';
import { useQuery } from '@tanstack/react-query';
import Loader from '../Loader/Loader';
import { usePathname } from 'next/navigation';

function GenreScreen({ id, page }: { id: string; page: string }) {
    const pathname = usePathname();
    const { data } = useQuery({
        queryKey: ['movies', id, page],
        queryFn: async () => {
            if (typeof id !== 'string') {
                throw new Error('Invalid genre ID');
            }

            const result = await getMoviesFromGenre(
                id,
                page ? Number(page) : 1
            );
            return result;
        },
        enabled: typeof id === 'string',
    });

    if (!id) {
        return (
            <div className="flex flex-col items-center justify-center gap-2 w-fulll">
                <p className="text-3xl">Invalid genre ID</p>
                <Loader />
            </div>
        );
    }

    if (!data) {
        return null;
    }

    return (
        <section className="flex flex-col items-start w-full pt-4 gap-4">
            <Pagination
                title={
                    GENRE_POSTERS.find((genre) => genre.id === id)?.name ?? ''
                }
                path={pathname}
                totalResults={data.total_results}
                totalPages={data.total_pages}
                currentPage={page ? Number(page) : 1}
            />
            <motion.ul
                variants={MOTION_CONTAINER}
                initial="hidden"
                animate="show"
                className="items-center w-full grid grid-cols-2 col-span-2 gap-x-4 gap-y-8 sm:grid-cols-4 lg:grid-cols-5 justify-items-center"
            >
                {data.results.map((movie) => (
                    <BigMoviePoster key={movie.id} movie={movie} />
                ))}
            </motion.ul>
            <Pagination
                title={
                    GENRE_POSTERS.find((genre) => genre.id === id)?.name ?? ''
                }
                path={pathname}
                totalResults={data.total_results}
                totalPages={data.total_pages}
                currentPage={page ? Number(page) : 1}
            />
        </section>
    );
}

export default GenreScreen;
