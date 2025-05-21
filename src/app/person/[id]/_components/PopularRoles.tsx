import Heading from '../../../../components/ui/Heading';
import { PersonMovieCast } from 'tmdb-ts';
import BigMoviePoster from '../../../../components/BigMoviePoster';
import { motion } from 'motion/react';

const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.75 } },
};

interface PopularRolesProps {
    movies: PersonMovieCast[];
}

function PopularRoles({ movies }: PopularRolesProps) {
    return (
        <div className="flex flex-col items-start justify-start gap-4">
            <Heading>Popular Roles</Heading>
            <motion.ul
                variants={container}
                initial="hidden"
                animate="show"
                className="flex gap-2 overflow-x-scroll w-full py-4"
            >
                {movies.slice(0, 8).map((movie) => (
                    <motion.li
                        variants={item}
                        key={movie.id}
                        className="relative"
                    >
                        <div className="min-w-[250px] min-h-[375px] relative">
                            <BigMoviePoster movie={movie} />
                        </div>

                        <h3 className="mt-2">{movie.character}</h3>
                    </motion.li>
                ))}
            </motion.ul>
        </div>
    );
}

export default PopularRoles;
