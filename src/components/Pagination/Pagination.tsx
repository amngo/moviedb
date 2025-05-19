'use client';

import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import PaginationItem from './PaginationItem';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function Pagination({
    currentPage,
    totalResults,
    totalPages,
}: {
    currentPage: number;
    totalResults: number;
    totalPages: number;
}) {
    const pathname = usePathname();

    return (
        <div className="flex items-center justify-between bg-black/50 backdrop-blur-md px-4 py-3 rounded-md w-3xl justify-self-end">
            <div className="flex flex-1 items-center justify-between">
                <div>
                    <p className="text-sm">
                        Showing{' '}
                        <span className="font-medium">
                            {(currentPage - 1) * 20 + 1}
                        </span>{' '}
                        to{' '}
                        <span className="font-medium">
                            {(currentPage - 1) * 20 + 20}
                        </span>{' '}
                        of <span className="font-medium">{totalResults}</span>{' '}
                        results
                    </p>
                </div>
                <div>
                    <nav
                        aria-label="Pagination"
                        className="isolate inline-flex -space-x-px rounded-md shadow-xs"
                    >
                        <Link
                            aria-disabled={currentPage === 0}
                            href={
                                currentPage !== 1
                                    ? `${pathname}?page=${currentPage - 1}`
                                    : '#'
                            }
                            className="relative inline-flex items-center rounded-l-md px-2 py-2 ring-1 ring-gray-300 ring-inset hover:bg-white hover:text-black focus:z-20 focus:outline-offset-0"
                        >
                            <span className="sr-only">Previous</span>
                            <BiChevronLeft
                                aria-hidden="true"
                                className="size-5"
                            />
                        </Link>

                        <PaginationItem
                            current
                            page={currentPage}
                            url={pathname + '?page=' + currentPage}
                        />
                        <PaginationItem
                            page={currentPage + 1}
                            url={pathname + '?page=' + (currentPage + 1)}
                        />
                        <PaginationItem
                            page={currentPage + 2}
                            url={pathname + '?page=' + (currentPage + 2)}
                        />

                        <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-gray-300 ring-inset focus:outline-offset-0">
                            ...
                        </span>

                        <PaginationItem
                            page={currentPage + 7}
                            url={pathname + '?page=' + (currentPage + 7)}
                        />
                        <PaginationItem
                            page={currentPage + 8}
                            url={pathname + '?page=' + (currentPage + 8)}
                        />
                        <PaginationItem
                            page={currentPage + 9}
                            url={pathname + '?page=' + (currentPage + 9)}
                        />

                        <Link
                            href={
                                currentPage !== totalPages - 1
                                    ? `${pathname}?page=${currentPage + 1}`
                                    : '#'
                            }
                            className="relative inline-flex items-center rounded-r-md px-2 py-2 ring-1 ring-gray-300 ring-inset hover:bg-white hover:text-black focus:z-20 focus:outline-offset-0"
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
        </div>
    );
}

export default Pagination;
