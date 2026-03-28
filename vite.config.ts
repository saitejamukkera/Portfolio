/// <reference types="vitest/config" />
import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-motion': ['framer-motion'],
          'vendor-forms': [
            'react-hook-form',
            '@hookform/resolvers',
            'zod',
            '@emailjs/browser',
          ],
          'vendor-supabase': ['@supabase/supabase-js'],
          'vendor-icons': ['react-icons', 'lucide-react'],
        },
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/__tests__/setup.ts',
    css: true,
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/**/__tests__/**',
        'src/main.tsx',
        'src/assets/**',
        'src/components/ui/dropdown-menu.tsx',
        'src/components/ui/separator.tsx',
        'src/components/ui/card.tsx',
        'src/components/techStack.tsx',
        'src/components/ui/grid-background-demo.tsx',
        'src/Icons/TypeScriptIcon.tsx',
        'src/Icons/SpringIcon.tsx',
        'src/Icons/ReactIcon.tsx',
        'src/Icons/PostgresIcon.tsx',
        'src/Icons/NodeIcon.tsx',
      ],
    },
  },
})
