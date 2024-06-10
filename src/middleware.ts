import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
    // A list of all locales that are supported
    //const locales = ['en', 'es', 'zh', 'so', 'vi', 'fl', 'ar', 'ur', 'pn'];
    locales: ['en', 'es', 'zh', 'so', 'vi', 'fl', 'ar', 'ur', 'pn'],

    // Used when no locale matches
    defaultLocale: 'en'
});

export const config = {
    // Match only internationalized pathnames
    matcher: ['/', '/(en|es|zh|so|vi|fl|ar|ur|pn)/:path*']
};
