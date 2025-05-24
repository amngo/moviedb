'use client';

import { AnimatePresence, motion } from 'motion/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';

function MobileNav() {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    const toggleMenu = () => {
        setOpen((prev) => !prev);
    };
    const closeMenu = () => {
        setOpen(false);
    };
    return (
        <div>
            <button
                onClick={toggleMenu}
                className="flex items-center justify-center w-10 h-10 lg:hidden"
            >
                <GiHamburgerMenu className="text-xl" />
            </button>

            <AnimatePresence>
                {open && (
                    <motion.nav
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute left-0 w-full px-4 py-8 text-white bg-black top-16"
                    >
                        <ul className="space-y-6">
                            <li>
                                <Link
                                    onClick={closeMenu}
                                    href="/"
                                    className={`text-white px-4 py-2 ${
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
                                    onClick={closeMenu}
                                    href="/genre"
                                    className={`text-white px-4 py-2 ${
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
                                    onClick={closeMenu}
                                    href="/history"
                                    className={`text-white px-4 py-2 ${
                                        pathname === '/history'
                                            ? 'underline decoration-3 underline-offset-6 font-bold'
                                            : ''
                                    }`}
                                >
                                    History
                                </Link>
                            </li>
                        </ul>
                    </motion.nav>
                )}
            </AnimatePresence>
        </div>
    );
}

export default MobileNav;
