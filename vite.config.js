import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { config } from 'dotenv';
import process from 'process';

config();

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Split vendor
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        }
      }
    },
    chunkSizeWarningLimit: 600
  },
  server: {
    host: true,
    strictPort: true,
    port: 3000
  },
  envDir: './src',
  define: {
    'process.env': process.env
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  }
});
