import { AnimatePresence, motion } from 'motion/react';
import Link from 'next/link';
import React, { useState } from 'react';

interface TimelineItemProps {
    id: number;
    poster_path: string;
    date?: string;
    title: string;
    description: string;
    position: 'left' | 'right';
    showYearSeparator?: boolean;
    year?: string;
}

function TimelineItem({
    id,
    poster_path,
    date,
    title,
    description,
    position,
    showYearSeparator,
    year,
}: TimelineItemProps) {
    const [hovered, setHovered] = useState(false);
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

    const handleMouseEnter = () => setHovered(true);
    const handleMouseLeave = () => setHovered(false);
    const handleMouseMove = (e: React.MouseEvent) => {
        setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    return (
        <>
            {showYearSeparator && (
                <div className="w-full text-center my-4">
                    <h2 className="text-2xl font-bold">{year || 'TBA'}</h2>
                </div>
            )}
            <Link
                href={`/movie/${id}`}
                className={`flex items-center justify-between w-full mb-2 ${
                    position === 'left'
                        ? 'flex-row-reverse left-timeline'
                        : 'right-timeline'
                }`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onMouseMove={handleMouseMove}
            >
                <div className="order-1 w-5/12" />
                <div className="z-20 flex items-center order-1 w-2 h-2 bg-gray-700 rounded-full shadow-xl" />
                <div
                    className="order-1 w-5/12 px-1 py-4"
                    style={{
                        textAlign: position === 'right' ? 'left' : 'right',
                    }}
                >
                    <p className="mb-2 text-sm text-gray-400">{date}</p>
                    <h4 className="mb-2 text-lg font-bold">{title}</h4>
                    <p className="text-sm leading-snug text-opacity-100 text-gray-50">
                        {description}
                    </p>
                </div>
                <AnimatePresence>
                    {hovered && poster_path && (
                        <motion.img
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                            className="rounded-lg"
                            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                            alt={title}
                            style={{
                                position: 'fixed',
                                top: cursorPosition.y + 20,
                                left: cursorPosition.x + 20,
                                width: '150px',
                                height: '225px',
                                zIndex: 40,
                            }}
                        />
                    )}
                </AnimatePresence>
            </Link>
        </>
    );
}

export default TimelineItem;
