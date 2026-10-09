import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext',
    minify: 'oxc',
    cssCodeSplit: true,
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Separate Leaflet into dedicated vendor chunk (loaded only on map view)
          if (id.includes('node_modules/leaflet')) {
            return 'vendor-leaflet';
          }
          // Core React & Router in a fast, cached vendor chunk
          if (
            id.includes('node_modules/react') ||
            id.includes('node_modules/react-dom') ||
            id.includes('node_modules/react-router')
          ) {
            return 'vendor-react';
          }
          // Lucide icons in separate chunk
          if (id.includes('node_modules/lucide-react')) {
            return 'vendor-icons';
          }
          // Comprehensive dataset isolated for seamless caching
          if (id.includes('src/data/panchayats.js')) {
            return 'data-panchayats';
          }
        },
      },
    },
  },
  // Optimize dependency pre-bundling for instantaneous dev server responses
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'lucide-react', 'leaflet'],
  },
});
