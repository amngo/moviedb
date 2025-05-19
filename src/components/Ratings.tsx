import React from 'react';
import { FaImdb } from 'react-icons/fa6';
import { SiRottentomatoes, SiMetacritic } from 'react-icons/si';

function Ratings() {
    return (
        <>
            {/* Add IMDb rating */}
            <div className="flex gap-4 items-center w-[150px]">
                <FaImdb className="text-4xl text-yellow-500" />
                <span className="text-xl font-bold tracking-tighter">9.4</span>
            </div>

            {/* Add Rotten Tomatoes rating */}
            <div className="flex gap-4 items-center w-[150px]">
                <SiRottentomatoes className="text-4xl text-red-500" />
                <span className="text-xl font-bold tracking-tighter">87%</span>
            </div>

            {/* Add Metacritic rating */}
            <div className="flex gap-4 items-center w-[150px]">
                <SiMetacritic className="text-4xl text-yellow-400" />
                <span className="text-xl font-bold tracking-tighter">92</span>
            </div>
        </>
    );
}

export default Ratings;
