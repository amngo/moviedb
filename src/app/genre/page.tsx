'use client';
import GenrePoster from '@/components/GenrePoster';
import { GENRE_POSTERS } from '@/lib/constants';
import { motion } from 'motion/react';

const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.07 } },
};

const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.75 } },
};

export default function Genre() {
    return (
        <div className="w-full grid gap-12 min-h-screen pt-12">
            <section className="grid">
                <motion.ul
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="flex gap-2 flex-wrap"
                >
                    {GENRE_POSTERS.map((genre) => (
                        <motion.li
                            variants={item}
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
