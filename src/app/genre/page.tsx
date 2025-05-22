'use client';
import GenrePoster from '@/app/genre/_components/GenrePoster';
import { GENRE_POSTERS, MOTION_CONTAINER, MOTION_ITEM } from '@/lib/constants';
import { motion } from 'motion/react';

export default function Page() {
    return (
        <div className="w-full grid gap-12 min-h-screen pt-12">
            <section className="grid">
                <motion.ul
                    variants={MOTION_CONTAINER}
                    initial="hidden"
                    animate="show"
                    className="flex gap-2 flex-wrap"
                >
                    {GENRE_POSTERS.map((genre) => (
                        <motion.li
                            variants={MOTION_ITEM}
                            key={genre.id}
                            className="w-[250px] h-[375px] relative"
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
