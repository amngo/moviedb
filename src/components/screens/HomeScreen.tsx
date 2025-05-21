'use client';
import { motion } from 'motion/react';
import BigCarousel from '../BigCarousel/BigCarousel';
import BigMoviePoster from '../BigMoviePoster';
import Heading from '../ui/Heading';
import { useQuery } from '@tanstack/react-query';
import {
    getNowPlayingMovies,
    getPopularMovies,
    getUpcomingMovies,
} from '@/lib/tmdb';
import Loader from '../Loader/Loader';
import { MOTION_CONTAINER, MOTION_ITEM } from '@/lib/constants';

function HomeScreen() {
    const { data: nowPlayingMovies } = useQuery({
        queryKey: ['nowPlayingMovies'],
        queryFn: getNowPlayingMovies,
    });

    const { data: upcomingMovies } = useQuery({
        queryKey: ['upcomingMovies'],
        queryFn: getUpcomingMovies,
    });

    const { data: popularMovies } = useQuery({
        queryKey: ['popularMovies'],
        queryFn: getPopularMovies,
    });

    if (!nowPlayingMovies || !upcomingMovies || !popularMovies) {
        return (
            <div className="flex flex-col gap-2 justify-center items-center min-h-screen w-full">
                <p className="text-3xl">Fetching the latest movies</p>
                <Loader />
            </div>
        );
    }

    return (
        <div className="w-full grid gap-12 min-h-screen pt-12">
            <section className="grid gap-2">
                <Heading>Now Playing</Heading>
                <motion.div
                    variants={MOTION_CONTAINER}
                    initial="hidden"
                    animate="show"
                    className="w-[1080px] max-h-[600px] min-h-[600px] rounded-md overflow-hidden"
                >
                    <BigCarousel movies={nowPlayingMovies.slice(0, 8)} />
                </motion.div>
            </section>

            <section className="grid">
                <Heading>Upcoming</Heading>
                <motion.ul
                    variants={MOTION_CONTAINER}
                    initial="hidden"
                    animate="show"
                    className="flex gap-2 overflow-x-scroll w-full py-4"
                >
                    {upcomingMovies.slice(0, 8).map((movie) => (
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

            <section className="grid">
                <Heading>Popular</Heading>
                <motion.ul
                    variants={MOTION_CONTAINER}
                    initial="hidden"
                    animate="show"
                    className="flex gap-2 overflow-x-scroll w-full py-4"
                >
                    {popularMovies.slice(0, 8).map((movie) => (
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
        </div>
    );
}

export default HomeScreen;
