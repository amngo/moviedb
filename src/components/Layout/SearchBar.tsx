'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

function SearchBar() {
    const router = useRouter();

    const [query, setQuery] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && query) {
            setQuery('');
            router.push(`/search?q=${query}`);
        }
    };

    return (
        <>
            <div className="relative flex items-center justify-center w-[250px]">
                <input
                    type="text"
                    placeholder="Search for a movie"
                    className="w-full h-8 px-4 py-4 font-bold transparent border-white border-[1px] rounded-md placeholder:text-white text-sm"
                    onChange={handleChange}
                    value={query}
                    onKeyDown={handleKeyDown}
                />
                <FaSearch className="absolute right-4" />
            </div>
        </>
    );
}

export default SearchBar;
