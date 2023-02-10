/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({
    dest: 'public',
});

module.exports = withPWA({
    reactStrictMode: true,
    swcMinify: true,
    // images: {
    //     domains: ['cdn.sanity.io'],
    // },
    compiler: {
        styledComponents: true,
    },
    compilerOptions: {
        target: 'es2017',
    },

    webpack: (config) => {
        config.experiments = {
            topLevelAwait: true,
        };
        return config;
    },
});
