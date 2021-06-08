import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      mode: 'development',
      manifest: {
        start_url: `/`,
        name: 'Мои рецепты',
        background_color: '#424242',
      },
      workbox: {
        navigateFallback: '/index.html',
        skipWaiting: true,
        runtimeCaching: [
          {
            urlPattern: new RegExp('/'),
            handler: 'NetworkFirst',
            options: {
              networkTimeoutSeconds: 20,
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 5,
                maxAgeSeconds: 60,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    }),
  ],
})
