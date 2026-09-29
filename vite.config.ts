import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    base: './',
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'html-dev-transform',
        transformIndexHtml(html, ctx) {
          if (ctx.server) {
            // In dev mode, ensure it points to raw src/main.tsx for live HMR
            return html
              .replace(
                /<script type="module" crossorigin src="\.\/assets\/[^"]*"><\/script>/,
                '<script type="module" src="/src/main.tsx"></script>'
              )
              .replace(/<link rel="stylesheet" crossorigin href="\.\/assets\/[^"]*">/, '');
          }
          return html;
        },
      },
    ],
    build: {
      outDir: 'dist',
      rollupOptions: {
        output: {
          entryFileNames: 'assets/[name].js',
          chunkFileNames: 'assets/[name].js',
          assetFileNames: 'assets/[name].[ext]',
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
