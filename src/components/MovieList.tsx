import { motion } from 'motion/react';
import BigMoviePoster from './BigMoviePoster';
import { Movie, Recommendation } from 'tmdb-ts';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const item = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.75 } },
};

function MovieList({ movies }: { movies: Movie[] | Recommendation[] }) {
  return (
    <motion.ul
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="grid grid-cols-3 gap-2 w-full"
    >
      {movies.map((movie) => (
        <motion.li
          variants={item}
          key={movie.id}
          className="min-w-[250px] min-h-[375px] relative"
        >
          <BigMoviePoster movie={movie} />
        </motion.li>
      ))}
    </motion.ul>
  );
}

export default MovieList;
