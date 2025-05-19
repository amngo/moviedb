'use client';
import BigMoviePoster from '@/components/BigMoviePoster';
import Loader from '@/components/Loader/Loader';
import Pagination from '@/components/Pagination/Pagination';
import Heading from '@/components/ui/Heading';
import { GENRE_POSTERS } from '@/lib/constants';
import { getMoviesFromGenre } from '@/lib/tmdb';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'motion/react';
import { useParams, useSearchParams } from 'next/navigation';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } },
};

const item = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.75 } },
};

export default function Page() {
  const params = useParams();
  const searchParams = useSearchParams();

  const { id } = params;
  const page = searchParams.get('page');

  const { data } = useQuery({
    queryKey: ['movies', id, page],
    queryFn: async () => {
      if (typeof id !== 'string') {
        throw new Error('Invalid genre ID');
      }

      const result = await getMoviesFromGenre(id, page ? Number(page) : 1);
      return result;
    },
    enabled: typeof id === 'string',
  });

  if (!data) {
    return (
      <div className="flex flex-col gap-2 justify-center items-center min-h-screen w-full">
        <p className="text-3xl">Fetching movies...</p>
        <Loader />
      </div>
    );
  }

  if (!id) {
    return (
      <div className="flex flex-col gap-2 justify-center items-center min-h-screen w-fulll">
        <p className="text-3xl">Invalid genre ID</p>
        <Loader />
      </div>
    );
  }

  console.log(data);

  return (
    <section className="grid grid-cols-[min-content,1fr] w-full min-h-screen pt-12 items-center">
      <Heading>{GENRE_POSTERS.find((genre) => genre.id === id)?.name}</Heading>
      <Pagination
        totalResults={data.total_results}
        totalPages={data.total_pages}
        currentPage={page ? Number(page) : 1}
      />
      <motion.ul
        variants={container}
        initial="hidden"
        animate="show"
        className="mt-4 grid grid-cols-4 col-span-2 justify-items-center gap-y-4"
      >
        {data.results.map((movie) => (
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
  );
}
