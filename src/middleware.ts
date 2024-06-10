import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
    // A list of all locales that are supported
    locales: ['vi', 'es', 'zh', 'so', 'en', 'fl', 'ar', 'ur', 'pn'],

    // Used when no locale matches
    defaultLocale: 'en'
});

export const config = {
    // Match only internationalized pathnames
    matcher: ['/', '/(es|en|zh|so|vi|fl|ar|ur|pn)/:path*']
};
