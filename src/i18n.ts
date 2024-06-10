'use client';
import {notFound} from 'next/navigation';
import {getRequestConfig, unstable_setRequestLocale} from 'next-intl/server';

// Add vietnamese locale
const locales = ['en', 'es', 'zh', 'so', 'vi', 'fl', 'ar', 'ur', 'pn'];

export default getRequestConfig(async ({locale}) => {
    // Validate that the incoming `locale` parameter is valid
    if (!locales.includes(locale as any)) throw new Error('Language not supported');

    // Set the request locale for static rendering
    await unstable_setRequestLocale(locale);

    return {
        messages: (await import(`../locales/${locale}.json`)).default,
    };
});
