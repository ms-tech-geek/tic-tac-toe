import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        short_name: 'TicTacToe',
        name: 'Tic Tac Toe',
        icons: [
          {
            src: 'icon-16x16.png',
            sizes: '16x16',
            type: 'image/png',
          },
          {
            src: 'icon-24x24.png',
            sizes: '24x24',
            type: 'image/png',
          },
          {
            src: 'icon-32x32.png',
            sizes: '32x32',
            type: 'image/png',
          },
          {
            src: 'icon-64x64.png',
            sizes: '64x64',
            type: 'image/png',
          },
          {
            src: 'icon-144x144.png',
            sizes: '144x144',
            type: 'image/png',
          },
          {
            src: 'icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
        screenshots: [
          {
            src: 'screenshot1.png',
            sizes: '640x480',
            type: 'image/png',
            form_factor: 'wide',
          },
          {
            src: 'screenshot2.png',
            sizes: '640x480',
            type: 'image/png',
            form_factor: 'wide',
          },
          {
            src: 'screenshot3.png',
            sizes: '320x480',
            type: 'image/png',
            form_factor: 'narrow',
          },
          {
            src: 'screenshot4.png',
            sizes: '320x480',
            type: 'image/png',
            form_factor: 'narrow',
          },
        ],
        start_url: '.',
        display: 'standalone',
        theme_color: '#000000',
        background_color: '#ffffff',
      },
    }),
  ],
  base: './',
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
  },
  logLevel: 'debug', // Add this line for more detailed logging
});
