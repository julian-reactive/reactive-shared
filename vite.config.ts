import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ReactiveShared',
      fileName: (format) => `index.${format}.js`,
      formats: ['es', 'umd']
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'yup',
        'lodash',
        '@mui/material',
        '@mui/lab',
        '@mui/icons-material',
        '@mui/system',
        '@fontsource/roboto'
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          yup: 'Yup',
          lodash: 'lodash',
          '@mui/material': 'MaterialUI',
          '@mui/lab': 'MaterialUILab',
          '@mui/icons-material': 'MaterialUIIcons',
          '@mui/system': 'MaterialUISystem',
          '@fontsource/roboto': 'FontsourceRoboto'
        }
      }
    },
    sourcemap: true,
    minify: 'terser'
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
})