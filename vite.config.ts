import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/Unidas_MS_TranscribeContract/',
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
