import React, { useRef, useState, useEffect } from 'react';
import TimelineItem from './TimelineItem';
import { PersonMovieCast } from 'tmdb-ts';
import { formatDate } from '@/lib/utils';
import Heading from '../ui/Heading';
import { AnimatePresence, motion } from 'motion/react';

interface TimelineProps {
    credits: PersonMovieCast[];
}

function Timeline({ credits }: TimelineProps) {
    const sortedCredits = credits.sort((a, b) => {
        if (!a.release_date) return -1;
        if (!b.release_date) return 1;
        return (
            new Date(b.release_date).getTime() -
            new Date(a.release_date).getTime()
        );
    });

    const yearRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
    const yearSelectorRef = useRef<HTMLDivElement>(null);

    const handleYearClick = (year: string) => {
        if (yearRefs.current[year]) {
            yearRefs.current[year]?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const yearCounts = sortedCredits.reduce((acc, credit) => {
        const year = credit.release_date
            ? new Date(credit.release_date).getFullYear().toString()
            : 'TBA';
        if (!acc[year]) {
            acc[year] = 0;
        }
        acc[year]++;
        return acc;
    }, {} as { [key: string]: number });

    const uniqueYears = Object.keys(yearCounts).sort((a, b) => {
        if (a === 'TBA' || b === 'TBA') return 1;
        return parseInt(b) - parseInt(a);
    });

    const [showBackToTop, setShowBackToTop] = useState(false);
    const timelineRef = useRef<HTMLDivElement>(null);

    const handleScroll = () => {
        if (timelineRef.current) {
            // console.log(window.scrollY, timelineRef.current.offsetTop);
            setShowBackToTop(window.scrollY > timelineRef.current.offsetTop);
        }
    };

    useEffect(() => {
        const timelineElement = timelineRef.current;
        if (timelineElement) {
            document.addEventListener('scroll', handleScroll);
            return () => {
                document.removeEventListener('scroll', handleScroll);
            };
        }
    }, []);

    const handleBackToTopClick = () => {
        if (yearSelectorRef.current) {
            yearSelectorRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div ref={yearSelectorRef} className="flex flex-col w-full gap-4">
            <Heading>Filmography ({credits.length})</Heading>
            <div className="grid grid-cols-12 gap-4 mb-4">
                {uniqueYears.map((year) => (
                    <button
                        key={year}
                        onClick={() => handleYearClick(year)}
                        className="px-2 py-1 text-sm font-bold text-gray-700 bg-gray-200 rounded hover:scale-110 transition-all duration-300 ease-out"
                    >
                        {year} ({yearCounts[year]})
                    </button>
                ))}
            </div>
            <div
                ref={timelineRef}
                className="relative h-full p-10 overflow-hidden wrap"
            >
                <div className="absolute h-full border border-gray-700 border-2-2 border-opacity-20 left-1/2" />
                {sortedCredits.map((credit, index) => {
                    const currentYear = credit.release_date
                        ? new Date(credit.release_date).getFullYear()
                        : 'TBA';
                    const previousYear =
                        index > 0 && sortedCredits[index - 1].release_date
                            ? new Date(
                                  sortedCredits[index - 1].release_date
                              ).getFullYear()
                            : 'TBA';

                    return (
                        <div
                            key={credit.id}
                            ref={(el) => {
                                if (
                                    index === 0 ||
                                    currentYear !== previousYear
                                ) {
                                    yearRefs.current[currentYear.toString()] =
                                        el;
                                }
                            }}
                        >
                            <TimelineItem
                                poster_path={credit.poster_path}
                                id={credit.id}
                                date={
                                    credit.release_date
                                        ? formatDate(credit.release_date)
                                        : ''
                                }
                                year={currentYear.toString()}
                                showYearSeparator={
                                    index === 0 || currentYear !== previousYear
                                }
                                title={credit.title}
                                description={credit.character}
                                position={index % 2 === 0 ? 'right' : 'left'}
                            />
                        </div>
                    );
                })}

                <AnimatePresence>
                    {showBackToTop && (
                        <motion.button
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                            onClick={handleBackToTopClick}
                            className="fixed bottom-4 right-4 px-4 py-2 z-50 text-white font-bold bg-blue-600 rounded-full"
                        >
                            Back to Top
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

export default Timeline;
