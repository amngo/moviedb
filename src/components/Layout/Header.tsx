'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SearchBar from './SearchBar';
import MobileNav from './MobileNav';

function Header() {
    const pathname = usePathname();
    return (
        <header className="fixed top-0 left-0 w-full z-[2000] flex justify-center h-16 bg-black/75 backdrop-blur-lg">
            <div className="grid grid-cols-2 lg:grid-cols-3 items-center w-full max-w-[1080px] px-4">
                <Link href="/">
                    <h1 className="text-xl uppercase font-[audiowide] font-bold bg-gradient-to-r from-blue-400 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">
                        Movie•DB
                    </h1>
                </Link>

                <nav className="hidden lg:block">
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

                <div className="flex items-center justify-self-end">
                    <SearchBar />
                    <MobileNav />
                </div>
            </div>
        </header>
    );
}

export default Header;
