import type { Metadata } from 'next';
import { Audiowide, Roboto_Condensed } from 'next/font/google';
import './globals.css';
import QueryProvider from '@/lib/QueryProvider';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import { Suspense } from 'react';
import { Analytics } from '@vercel/analytics/next';

const robotoCondensed = Roboto_Condensed({
    variable: '--font-roboto-condensed',
    subsets: ['latin'],
});

const audiowide = Audiowide({
    variable: '--font-audiowide',
    subsets: ['latin'],
    weight: '400',
});

export const metadata: Metadata = {
    title: 'MovieDB',
    description:
        'MovieDB is a web application that provides information about movies and people in the entertainment industry.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${robotoCondensed} ${audiowide} antialiased min-h-screen`}
            >
                <Header />
                <main className="mx-auto w-full my-16 max-w-[1080px] relative flex-1 p-4">
                    <QueryProvider>
                        <Suspense>{children}</Suspense>
                    </QueryProvider>
                </main>
                <Footer />

                <Analytics />
            </body>
        </html>
    );
}
