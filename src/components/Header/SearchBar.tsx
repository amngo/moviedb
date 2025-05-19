'use client';

import { useState, useRef, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import MovieList from '../MovieList';
import { debounce, getAverageImageColor } from '@/lib/utils';
import { MovieWithRgb, tmdb } from '@/lib/tmdb';
import { AnimatePresence, motion } from 'motion/react';

function SearchBar() {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<MovieWithRgb[]>([]);
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    setIsOverlayOpen(true);
  };

  const handleClose = () => {
    setIsOverlayOpen(false);
    setSearchResults([]);
  };

  const handleSearch = async (query: string) => {
    const result = await tmdb.search.movies({ query });

    // Get rgb values for each movie
    const promises = result.results.map(async (movie) => {
      const rgb = await getAverageImageColor(
        `https://image.tmdb.org/t/p/original${movie.poster_path}`
      );
      (movie as MovieWithRgb).rgb = rgb;
    });
    await Promise.all(promises);

    console.log(result.results);

    setSearchResults(result.results.slice(0, 20) as MovieWithRgb[]);
  };

  const debouncedHandleSearch = debounce(handleSearch, 300);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        overlayRef.current &&
        !overlayRef.current.contains(event.target as Node)
      ) {
        handleClose();
      }
    };

    const handleEscapePress = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    if (isOverlayOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapePress);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapePress);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapePress);
    };
  }, [isOverlayOpen]);

  return (
    <>
      <button
        className="relative flex items-center justify-center w-[250px]"
        onClick={handleClick}
      >
        <input
          type="text"
          placeholder="Search for a movie"
          className="w-full h-12 px-4 py-4 font-bold transparent border-white border-[1px] rounded-xl placeholder:text-white pointer-events-none"
        />
        <FaSearch className="absolute text-2xl right-4" />
      </button>
      <AnimatePresence>
        {isOverlayOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm"
          >
            <div className="absolute top-[150px] left-0 right-0 max-w-4xl mx-auto">
              <motion.div
                key="search"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                ref={overlayRef}
                className="relative flex flex-col w-full h-full gap-8 p-4 rounded-lg bg-zinc-800"
              >
                <FaSearch className="absolute z-10 text-2xl text-white top-8 left-8" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Search for a movie..."
                  className="w-full pl-16 pr-32 py-4 font-bold bg-black bg-opacity-10 backdrop-blur-lg border-white border-[1px] rounded-xl placeholder:text-white outline-none"
                  onChange={(e) => debouncedHandleSearch(e.target.value)}
                />

                <div className="max-h-[500px] overflow-y-scroll">
                  <MovieList movies={searchResults} />
                </div>

                <button
                  onClick={handleClose}
                  className="absolute flex px-2 py-1 text-2xl rounded-lg top-[28px] right-12 bg-zinc-900"
                >
                  <span className="text-base">esc</span>
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default SearchBar;
