'use client';
import GenrePoster from '@/app/genre/_components/GenrePoster';
import Heading from '@/components/ui/Heading';
import { GENRE_POSTERS, MOTION_CONTAINER, MOTION_ITEM } from '@/lib/constants';
import { motion } from 'motion/react';

export default function Page() {
    return (
        <div className="w-full min-h-screen pt-4 grid gap-12">
            <section>
                <Heading>Movies by Genres</Heading>
                <motion.ul
                    variants={MOTION_CONTAINER}
                    initial="hidden"
                    animate="show"
                    className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 justify-items-center2"
                >
                    {GENRE_POSTERS.map((genre) => (
                        <motion.li
                            variants={MOTION_ITEM}
                            key={genre.id}
                            className="relative w-full h-full"
                        >
                            <GenrePoster
                                id={genre.id}
                                name={genre.name}
                                image={genre.poster}
                                color={genre.color}
                            />
                        </motion.li>
                    ))}
                </motion.ul>
            </section>
        </div>
    );
}
