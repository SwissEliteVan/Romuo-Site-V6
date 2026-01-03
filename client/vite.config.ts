import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt', 'icons/*.png'],
      manifest: {
        name: 'ROMUO VTC - Transport Premium Suisse',
        short_name: 'ROMUO VTC',
        description: 'Service de transport VTC premium en Suisse',
        theme_color: '#d4af37',
        background_color: '#0a0a0a',
        display: 'standalone',
        icons: [
          {
            src: '/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable any'
          },
          {
            src: '/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable any'
          }
        ]
      },
      workbox: {
        // Cache des assets
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\.tomtom\.com\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'tomtom-api-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 // 24 heures
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      }
    })
  ],
  build: {
    // Optimisations de build
    target: 'es2015',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Supprimer console.log en production
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          // Séparer les vendors pour un meilleur cache
          'react-vendor': ['react', 'react-dom'],
          'router': ['wouter'],
          'helmet': ['react-helmet-async'],
          'icons': ['lucide-react']
        }
      }
    },
    // Taille des chunks
    chunkSizeWarningLimit: 1000
  },
  server: {
    port: 5173,
    open: true
  },
  preview: {
    port: 4173,
    open: true
  }
});
