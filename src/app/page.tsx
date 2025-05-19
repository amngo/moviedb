'use client';
import BigCarousel from '@/components/BigCarousel/BigCarousel';
import BigMoviePoster from '@/components/BigMoviePoster';
import Loader from '@/components/Loader/Loader';
import Heading from '@/components/ui/Heading';
import {
  getNowPlayingMovies,
  getPopularMovies,
  getUpcomingMovies,
} from '@/lib/tmdb';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'motion/react';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const item = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.75 } },
};

export default function Page() {
  const { data: nowPlayingMovies, isLoading } = useQuery({
    queryKey: ['nowPlayingMovies'],
    queryFn: async () => {
      const result = await getNowPlayingMovies();
      return result;
    },
  });

  const { data: popularMovies } = useQuery({
    queryKey: ['popularMovies'],
    queryFn: async () => {
      const result = await getPopularMovies();
      return result;
    },
  });

  const { data: upcomingMovies } = useQuery({
    queryKey: ['upcomingMovies'],
    queryFn: async () => {
      const result = await getUpcomingMovies();
      return result;
    },
  });

  if (isLoading || !nowPlayingMovies || !popularMovies || !upcomingMovies) {
    return (
      <div className="flex flex-col gap-2 justify-center items-center min-h-screen w-full">
        <p className="text-3xl">Fetching movies...</p>
        <Loader />
      </div>
    );
  }

  return (
    <div className="w-full grid gap-12 min-h-screen pt-12">
      <section className="grid gap-2">
        <Heading>Now Playing</Heading>
        <motion.div
          variants={container}
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
          variants={container}
          initial="hidden"
          animate="show"
          className="flex gap-2 overflow-x-scroll w-full py-4"
        >
          {upcomingMovies.slice(0, 8).map((movie) => (
            <motion.li
              variants={item}
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
          variants={container}
          initial="hidden"
          animate="show"
          className="flex gap-2 overflow-x-scroll w-full py-4"
        >
          {popularMovies.slice(0, 8).map((movie) => (
            <motion.li
              variants={item}
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
