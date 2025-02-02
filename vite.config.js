import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  build: {
    sourcemap: mode === 'development',  // Only generate sourcemaps in dev
    rollupOptions: {
      external: mode === 'production' ? ['react-devtools'] : [],
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'], // Splits vendor libraries
        },
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/tests/setup.js',
  },
}));