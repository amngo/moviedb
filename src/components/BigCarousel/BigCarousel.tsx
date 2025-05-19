import { MovieWithRgb } from '@/lib/tmdb';
import Carousel from 'react-multi-carousel';
import './BigCarousel.css';
import 'react-multi-carousel/lib/styles.css';
import Image from 'next/image';
import Link from 'next/link';

function BigCarousel({ movies }: { movies: MovieWithRgb[] }) {
    return (
        <Carousel
            additionalTransfrom={0}
            autoPlaySpeed={8000}
            autoPlay
            centerMode={false}
            draggable
            focusOnSelect={false}
            infinite
            keyBoardControl
            minimumTouchDrag={80}
            pauseOnHover
            responsive={{
                desktop: {
                    breakpoint: {
                        max: 1920,
                        min: 1024,
                    },
                    items: 1,
                },
            }}
            shouldResetAutoplay
            showDots
            swipeable
        >
            {movies.slice(0, 20).map((movie) => (
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
                        className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                    />

                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `linear-gradient(to bottom, transparent 300px, rgba(0,0,0,0.75) 100%)`,
                        }}
                    >
                        <div className="absolute bottom-0 left-0 px-12 py-16">
                            <h2 className="mb-2 text-2xl font-bold">
                                {movie.title}
                            </h2>
                            <p className="text-sm w-2xl">{movie.overview}</p>
                        </div>
                    </div>
                </Link>
            ))}
        </Carousel>
    );
}

export default BigCarousel;
