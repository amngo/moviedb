'use client';
import { AnimatePresence, motion } from 'motion/react';
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
import { useState } from 'react';

function HomeScreen() {
    const [tab, setTab] = useState<'Now Playing' | 'Upcoming' | 'Popular'>(
        'Now Playing'
    );

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
            <div className="hidden max-w-[1080px] rounded-md overflow-hidden sm:block max-h-[600px]">
                <BigCarousel movies={nowPlayingMovies.slice(0, 5)} />
            </div>

            <section className="grid gap-8 grid-cols-1 sm:grid-cols-2 items-center">
                <Heading>{tab}</Heading>
                <div className="flex gap-3 justify-self-center sm:justify-self-end">
                    <button
                        onClick={() => setTab('Now Playing')}
                        className={`px-4 py-2 border rounded-full text-xs cursor-pointer opacity-25 hover:opacity-100 transition-opacity duration-300${
                            tab === 'Now Playing' ? ' opacity-100' : ''
                        }`}
                    >
                        Now Playing
                    </button>
                    <button
                        onClick={() => setTab('Popular')}
                        className={`px-4 py-2 border rounded-full text-xs cursor-pointer opacity-25 hover:opacity-100 transition-opacity duration-300${
                            tab === 'Popular' ? ' opacity-100' : ''
                        }`}
                    >
                        Popular
                    </button>
                    <button
                        onClick={() => setTab('Upcoming')}
                        className={`px-4 py-2 border rounded-full text-xs cursor-pointer opacity-25 hover:opacity-100 transition-opacity duration-300${
                            tab === 'Upcoming' ? ' opacity-100' : ''
                        }`}
                    >
                        Upcoming
                    </button>
                </div>
                <AnimatePresence mode="wait">
                    {tab === 'Now Playing' && (
                        <motion.ul
                            key="nowPlaying"
                            variants={MOTION_CONTAINER}
                            initial="hidden"
                            animate="show"
                            exit="exit"
                            className="sm:col-span-2 grid items-center w-full grid-cols-2 sm:grid-cols-5 gap-x-4 gap-y-8 justify-items-center"
                        >
                            {nowPlayingMovies.map((movie) => (
                                <BigMoviePoster key={movie.id} movie={movie} />
                            ))}
                        </motion.ul>
                    )}

                    {tab === 'Upcoming' && (
                        <motion.ul
                            key="upcoming"
                            variants={MOTION_CONTAINER}
                            initial="hidden"
                            animate="show"
                            exit="exit"
                            className="sm:col-span-2 grid items-center w-full grid-cols-2 sm:grid-cols-5 gap-x-4 gap-y-8 justify-items-center"
                        >
                            {upcomingMovies.map((movie) => (
                                <BigMoviePoster key={movie.id} movie={movie} />
                            ))}
                        </motion.ul>
                    )}
                    {tab === 'Popular' && (
                        <motion.ul
                            key="popular"
                            variants={MOTION_CONTAINER}
                            initial="hidden"
                            animate="show"
                            exit="exit"
                            className="sm:col-span-2 grid items-center w-full grid-cols-2 sm:grid-cols-5 gap-x-4 gap-y-8 justify-items-center"
                        >
                            {popularMovies.map((movie) => (
                                <BigMoviePoster key={movie.id} movie={movie} />
                            ))}
                        </motion.ul>
                    )}
                </AnimatePresence>
            </section>
        </div>
    );
}

export default HomeScreen;
