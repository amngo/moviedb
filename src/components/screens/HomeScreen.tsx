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
import { MOTION_CONTAINER } from '@/lib/constants';

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
        return null;
    }

    return (
        <div className="grid w-full gap-12 pt-4">
            <section className="grid gap-4">
                <Heading>Now Playing</Heading>
                <div className="hidden max-w-[1080px] rounded-md overflow-hidden sm:block max-h-[600px]">
                    <BigCarousel movies={nowPlayingMovies.slice(0, 12)} />
                </div>

                <motion.ul
                    variants={MOTION_CONTAINER}
                    initial="hidden"
                    animate="show"
                    className="grid items-center w-full grid-cols-2 gap-4 justify-items-center sm:grid-cols-3 lg:overflow-x-scroll sm:hidden"
                >
                    {upcomingMovies.slice(0, 12).map((movie) => (
                        <BigMoviePoster key={movie.id} movie={movie} />
                    ))}
                </motion.ul>
            </section>

            <section className="grid gap-4">
                <Heading>Upcoming</Heading>
                <motion.ul
                    variants={MOTION_CONTAINER}
                    initial="hidden"
                    animate="show"
                    className="grid items-center w-full grid-cols-2 gap-4 justify-items-center sm:grid-cols-3 lg:overflow-x-scroll lg:flex"
                >
                    {upcomingMovies.slice(0, 12).map((movie) => (
                        <BigMoviePoster key={movie.id} movie={movie} />
                    ))}
                </motion.ul>
            </section>

            <section className="grid gap-4">
                <Heading>Popular</Heading>
                <motion.ul
                    variants={MOTION_CONTAINER}
                    initial="hidden"
                    animate="show"
                    className="grid items-center w-full grid-cols-2 gap-4 justify-items-center sm:grid-cols-3 lg:overflow-x-scroll lg:flex"
                >
                    {popularMovies.slice(0, 12).map((movie) => (
                        <BigMoviePoster key={movie.id} movie={movie} />
                    ))}
                </motion.ul>
            </section>
        </div>
    );
}

export default HomeScreen;
