import {NextIntlClientProvider} from 'next-intl';
import {getMessages, unstable_setRequestLocale} from 'next-intl/server';

const locales = ['en', 'es', 'zh', 'so', 'vi', 'fl', 'ar', 'ur', 'pn'];

export function generateStaticParams() {
    return locales.map((locale) => ({locale}));
}

export default async function LocaleLayout({
                                               children,
                                               params: {locale}
                                           }: {
    children: React.ReactNode;
    params: {locale: string};
}) {
    unstable_setRequestLocale(locale);



    // Providing all messages to the client
    // side is the easiest way to get started
    const messages = await getMessages();

    return (
        <html lang={locale}>
            <body>
                <NextIntlClientProvider messages={messages}>
                    {children}
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
