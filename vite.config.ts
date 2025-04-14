import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import compression from 'vite-plugin-compression';
import Sitemap from 'vite-plugin-sitemap'; // Import Sitemap

// https://vite.dev/config/
export default defineConfig({
    base: '/',
    plugins: [
        vue(),
        vueDevTools(),
        ViteImageOptimizer({
            webp: {
                quality: 75,
            },
        }),
        compression({
            algorithm: 'gzip',
            ext: '.gz',
        }),
        Sitemap({
            hostname: 'https://alphatalentmanagement.com/',
            exclude: ['/checkout', '/success'], // Exclude checkout and success pages
            // Provide static routes via dynamicRoutes (plugin might pick these up)
            dynamicRoutes: ['/', '/talents', '/blogs', '/become-a-talent', '/about', '/events'],
            // Note: True dynamic routes like /talents/:slug still require fetching slugs during build.
        }),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    css: {
        postcss: './postcss.config.js',
    },
    server: {
        port: 3000,
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
        },
    },
});
