'use client';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './BigCarousel.css';
import Image from 'next/image';
import Link from 'next/link';
import { Movie } from 'tmdb-ts';

function BigCarousel({ movies }: { movies: Movie[] }) {
    return (
        <Carousel
            autoPlaySpeed={8000}
            autoPlay
            draggable
            focusOnSelect={false}
            infinite
            keyBoardControl
            minimumTouchDrag={80}
            pauseOnHover
            responsive={{
                desktop: {
                    breakpoint: {
                        max: 4000,
                        min: 0,
                    },
                    items: 1,
                },
            }}
            shouldResetAutoplay
            showDots
            swipeable
        >
            {movies.map((movie) => (
                <Link
                    href={`/movie/${movie.id}`}
                    key={movie.id}
                    className="group"
                >
                    <Image
                        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                        alt={movie.title}
                        width={1080}
                        height={650}
                        quality={100}
                        priority
                        className="object-cover w-auto h-auto transition-transform duration-1000 ease-out group-hover:scale-105"
                    />

                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.75) 100%)`,
                        }}
                    >
                        <div className="absolute bottom-0 left-0 px-4 py-12 lg:px-12">
                            <h2 className="mb-2 text-xl font-bold lg:text-2xl">
                                {movie.title}
                            </h2>
                            <p className="w-full text-xs lg:text-sm lg:w-2xl">
                                {movie.overview}
                            </p>
                        </div>
                    </div>
                </Link>
            ))}
        </Carousel>
    );
}

export default BigCarousel;
