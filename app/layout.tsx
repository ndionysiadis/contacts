import type {Metadata} from "next";
import localFont from "next/font/local";
import {Provider} from '@/app/provider';
import "./globals.css";
import React from "react";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "Ve2max - Contacts",
    description: "nextjs-assessment-ndionysiadis",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-950 p-4`}
        >
        <Provider>
            {children}
        </Provider>
        </body>
        </html>
    );
}
