import type { Metadata } from 'next';
import { Audiowide, Roboto_Condensed } from 'next/font/google';
import './globals.css';
import QueryProvider from '@/lib/QueryProvider';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import Background from '@/components/Background/Background';
import { Suspense } from 'react';

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
    description: 'A Movie Database',
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
                <main className="mx-auto w-full my-16 max-w-[1080px] relative flex-1">
                    <QueryProvider>
                        <Suspense>{children}</Suspense>
                    </QueryProvider>
                </main>
                <Footer />
                <Background />
            </body>
        </html>
    );
}
