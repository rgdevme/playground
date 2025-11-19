/// <reference types='vitest' />
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(() => ({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/pomodoro',
  server: {
    port: 4200,
    host: 'localhost',
  },
  preview: {
    port: 4300,
    host: 'localhost',
  },
  plugins: [
    vue(),
    nxViteTsPaths(),
    nxCopyAssetsPlugin(['*.md']),
    VitePWA({
      registerType: 'autoUpdate', // Automatically update the service worker
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,vue}'], // Assets to cache
      },
      devOptions: {enabled: true},
      // 2. Add the Web App Manifest configuration
      manifest: {
        name: 'Pom',
        start_url: '/',
        display:'standalone',
        short_name: 'Pom',
        description: 'Pomodoro timer',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'assets/icon.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'assets/icon.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'assets/icon.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),
  ],
  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },
  build: {
    outDir: '../../dist/apps/pomodoro',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  test: {
    name: 'pomodoro',
    watch: false,
    globals: true,
    environment: 'jsdom',
    include: ['{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    reporters: ['default'],
    coverage: {
      reportsDirectory: '../../coverage/apps/pomodoro',
      provider: 'v8' as const,
    },
  },
}));
