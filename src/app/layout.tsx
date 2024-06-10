import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Eco-Lot",
  description: "Sustainable parking solutions for a greener future",
};

export default async function RootLayout({children, params: {locale}
}: {
  children: React.ReactNode;
  params: {locale: string};
}) {


  return (
    <html lang={locale}>
    <body className={inter.className}>
    {children}
    </body>
    </html>
  );
}
