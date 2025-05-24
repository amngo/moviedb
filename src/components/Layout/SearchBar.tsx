'use client';
import { AnimatePresence, motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

function SearchBar() {
    const router = useRouter();

    const [query, setQuery] = useState('');
    const [overlay, setOverlay] = useState(false);

    const handleClick = () => {
        setOverlay((prev) => !prev);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    const handleSearch = () => {
        if (query) {
            setQuery('');
            setOverlay(false);
            router.push(`/search?q=${query}`);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && query) {
            setQuery('');
            router.push(`/search?q=${query}`);
        }
    };

    return (
        <>
            <div className="relative items-center justify-center lg:w-[250px] hidden lg:flex">
                <input
                    type="text"
                    placeholder="Search for a movie"
                    className="w-full h-8 px-4 py-4 font-bold transparent border-white border-[1px] rounded-md placeholder:text-white placeholder:text-xs text-sm"
                    onChange={handleChange}
                    value={query}
                    onKeyDown={handleKeyDown}
                />
                <FaSearch className="absolute right-4" />
            </div>

            <button
                onClick={handleClick}
                className="flex items-center justify-center w-10 h-10 lg:hidden"
            >
                <FaSearch className="text-xl" />
            </button>

            <AnimatePresence>
                {overlay && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed top-0 left-0 z-[2000] flex w-full h-screen bg-black/90 backdrop-blur-md"
                    >
                        <motion.div
                            initial={{ y: -50 }}
                            animate={{ y: 0 }}
                            exit={{ y: -50 }}
                            transition={{ duration: 0.3 }}
                            className="flex flex-col mt-[100px] w-full max-w-[1080px] gap-4 px-4"
                        >
                            <input
                                type="text"
                                placeholder="Search for a movie"
                                className="w-full h-12 px-4 py-4 font-bold transparent border-white border-[1px] rounded-md placeholder:text-white"
                                onChange={handleChange}
                                value={query}
                                onKeyDown={handleKeyDown}
                            />

                            <div className="flex items-center justify-center w-full gap-4">
                                <button
                                    onClick={handleSearch}
                                    className="flex items-center justify-center h-10 px-4 py-2 border border-white rounded-md w-[150px]"
                                >
                                    Search
                                </button>
                                <button
                                    onClick={() => setOverlay(false)}
                                    className="flex items-center justify-center h-10 gap-2 px-4 py-2 text-red-500 border border-red-500 rounded-md"
                                >
                                    Close
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

export default SearchBar;
