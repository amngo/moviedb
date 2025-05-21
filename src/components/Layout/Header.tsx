'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SearchBar from './SearchBar';

function Header() {
    const pathname = usePathname();
    return (
        <header className="fixed top-0 left-0 w-full z-[2000] flex justify-center h-16 px-4 bg-black/75 backdrop-blur-lg">
            <div className="grid grid-cols-3 items-center w-full max-w-[1080px]">
                <Link href="/">
                    <h1 className="text-xl uppercase font-[audiowide] font-bold bg-gradient-to-r from-blue-400 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">
                        Movie•DB
                    </h1>
                </Link>

                <nav>
                    <ul className="flex justify-center space-x-4">
                        <li>
                            <Link
                                href="/"
                                className={`text-white ${
                                    pathname === '/'
                                        ? 'underline decoration-3 underline-offset-6 font-bold'
                                        : ''
                                }`}
                            >
                                Home
                            </Link>
                        </li>

                        <li>
                            <Link
                                href="/genre"
                                className={`text-white ${
                                    pathname === '/genre'
                                        ? 'underline decoration-3 underline-offset-6 font-bold'
                                        : ''
                                }`}
                            >
                                Genres
                            </Link>
                        </li>

                        <li>
                            <Link
                                href="/history"
                                className={`text-white ${
                                    pathname === '/history'
                                        ? 'underline decoration-3 underline-offset-6 font-bold'
                                        : ''
                                }`}
                            >
                                History
                            </Link>
                        </li>
                    </ul>
                </nav>

                <div className="justify-self-end">
                    <SearchBar />
                </div>
            </div>
        </header>
    );
}

export default Header;
