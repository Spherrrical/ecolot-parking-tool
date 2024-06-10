import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';

// Add vietnamese locale
const locales = ['en', 'es', 'zh', 'so', 'vi', 'fl', 'ar', 'ur', 'pn'];

export default getRequestConfig(async ({locale}) => {
    // Validate that the incoming `locale` parameter is valid
    if (!locales.includes(locale as any)) notFound();

    return {
        messages: (await import(`../locales/${locale}.json`)).default
    };
});
