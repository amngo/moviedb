import { motion } from 'motion/react';
import BigMoviePoster from '../../../../components/BigMoviePoster';
import { Movie, Recommendation } from 'tmdb-ts';

const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

function MovieList({ movies }: { movies: Movie[] | Recommendation[] }) {
    return (
        <motion.ul
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.05 }}
            className="items-center w-full grid grid-cols-2 gap-x-4 gap-y-8 justify-items-center sm:grid-cols-4"
        >
            {movies.map((movie) => (
                <BigMoviePoster key={movie.id} movie={movie} />
            ))}
        </motion.ul>
    );
}

export default MovieList;
