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
            className="grid items-center w-full grid-cols-2 gap-4 justify-items-center sm:grid-cols-3"
        >
            {movies.map((movie) => (
                <BigMoviePoster key={movie.id} movie={movie} />
            ))}
        </motion.ul>
    );
}

export default MovieList;
