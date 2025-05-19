import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaRegPlayCircle } from 'react-icons/fa';

function MainPoster({
    posterPath,
    trailer,
}: {
    posterPath: string;
    trailer?: { key: string };
}) {
    if (!trailer) {
        return (
            <Image
                src={`https://image.tmdb.org/t/p/original${posterPath}`}
                alt="movie poster"
                width={200}
                height={300}
                objectFit="contain"
                className="rounded-xl min-w-[200px] min-h-[300px]"
            />
        );
    }

    return (
        <Link
            target="_blank"
            rel="noopener noreferrer"
            href={`https://www.youtube.com/watch?v=${trailer.key}`}
            className="relative overflow-hidden group rounded-xl"
        >
            <Image
                src={`https://image.tmdb.org/t/p/original${posterPath}`}
                alt="movie trailer"
                width={200}
                height={300}
                objectFit="contain"
                className="min-w-[200px] min-h-[300px]"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center transition-opacity duration-300 bg-black/75 opacity-0 group-hover:opacity-100">
                <FaRegPlayCircle className="text-4xl" />
                <span className="text-lg font-bold">Play Trailer</span>
            </div>
        </Link>
    );
}

export default MainPoster;
