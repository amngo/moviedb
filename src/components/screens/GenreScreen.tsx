'use client';

import { GENRE_POSTERS, MOTION_CONTAINER, MOTION_ITEM } from '@/lib/constants';
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
            <div className="flex flex-col gap-2 justify-center items-center min-h-screen w-fulll">
                <p className="text-3xl">Invalid genre ID</p>
                <Loader />
            </div>
        );
    }

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

export default GenreScreen;
