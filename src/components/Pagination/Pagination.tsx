'use client';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

function Pagination({
    currentPage,
    totalResults,
    totalPages,
    title,
    path,
    query,
}: {
    currentPage: number;
    totalResults: number;
    totalPages: number;
    title: string;
    path: string;
    query?: string;
}) {
    const [page, setPage] = useState(currentPage);
    const router = useRouter();

    useEffect(() => {
        setPage(currentPage);
    }, [currentPage]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(event.target.value);

        if (!isNaN(value)) {
            setPage(value);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && page) {
            setPage(page);
            router.push(`${path}?page=${page}${query ? `&${query}` : ''}`);
        }
    };

    const handleBlur = () => {
        if (page < 1) {
            setPage(1);
            router.push(`${path}?page=1${query ? `&${query}` : ''}`);
        } else if (page > totalPages) {
            setPage(totalPages);
            router.push(
                `${path}?page=${totalPages}${query ? `&${query}` : ''}`
            );
        } else {
            router.push(`${path}?page=${page}${query ? `&${query}` : ''}`);
        }
    };

    return (
        <div className="flex items-center justify-between w-full px-4 py-3 gap-4 rounded-md bg-black/50 backdrop-blur-md justify-self-end">
            <h2 className="hidden max-w-md font-bold tracking-wider text-white uppercase truncate text lg:block">
                {title}
            </h2>
            {totalResults > 20 && (
                <div className="flex items-center justify-between w-full gap-4">
                    <div>
                        <p className="text-sm">
                            Showing{' '}
                            <span className="font-medium">
                                {(currentPage - 1) * 20 + 1}
                            </span>{' '}
                            to{' '}
                            <span className="font-medium">
                                {(currentPage - 1) * 20 + 20 > totalResults
                                    ? totalResults
                                    : (currentPage - 1) * 20 + 20}
                            </span>{' '}
                            of{' '}
                            <span className="font-medium">{totalResults}</span>{' '}
                            results
                        </p>
                    </div>
                    <div>
                        <nav
                            aria-label="Pagination"
                            className="inline-flex gap-2 -space-x-px rounded-md shadow-xs isolate"
                        >
                            <Link
                                aria-disabled={currentPage === 0}
                                href={
                                    currentPage !== 1
                                        ? `${path}?page=${currentPage - 1}${
                                              query ? `&${query}` : ''
                                          }`
                                        : '#'
                                }
                                className={`relative items-center justify-center w-8 h-8 rounded-l-md ring-1 ring-gray-300 ring-inset hover:bg-white hover:text-black focus:z-20 focus:outline-offset-0${
                                    currentPage === 1
                                        ? ' hidden'
                                        : ' inline-flex'
                                }`}
                            >
                                <span className="sr-only">Previous</span>
                                <BiChevronLeft
                                    aria-hidden="true"
                                    className="size-5"
                                />
                            </Link>

                            <input
                                type="text"
                                value={page}
                                onChange={handleChange}
                                onKeyDown={handleKeyDown}
                                onBlur={handleBlur}
                                className="w-12 h-8 text-center font-bold text-sm bg-black/0 border-white border-[1px] placeholder:text-white"
                            />

                            <Link
                                href={
                                    currentPage !== totalPages
                                        ? `${path}?page=${currentPage + 1}${
                                              query ? `&${query}` : ''
                                          }`
                                        : '#'
                                }
                                className={`relative items-center justify-center w-8 h-8 rounded-r-md ring-1 ring-gray-300 ring-inset hover:bg-white hover:text-black focus:z-20 focus:outline-offset-0 ${
                                    currentPage === totalPages
                                        ? ' hidden'
                                        : ' inline-flex'
                                }`}
                            >
                                <span className="sr-only">Next</span>
                                <BiChevronRight
                                    aria-hidden="true"
                                    className="size-5"
                                />
                            </Link>
                        </nav>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Pagination;
