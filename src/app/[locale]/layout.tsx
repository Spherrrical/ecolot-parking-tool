import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages, unstable_setRequestLocale} from 'next-intl/server';
import {LanguageDialog} from "@/components/LanguageDialog";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Eco-Lot",
    description: "Sustainable parking solutions for a greener future",
};

const locales = ['en', 'es', 'zh', 'so', 'vi', 'fl', 'ar', 'ur', 'pn'];

export function generateStaticParams() {
    return locales.map((locale) => ({locale}));
}

export default async function AnotherLayout({children, params: {locale}
                                         }: {
    children: React.ReactNode;
    params: {locale: string};
}) {


    const messages = await getMessages();
    unstable_setRequestLocale(locale);

    return (
        <html lang={locale}>
        <NextIntlClientProvider messages={messages}>
            <body className={inter.className}>

            {children}
            </body>
        </NextIntlClientProvider>
        </html>
    );
}
