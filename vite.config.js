import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { config } from 'dotenv';
import process from 'process';

config();

export default defineConfig({
  plugins: [react()],
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
