import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: true,
  },
  plugins: [
    // https://github.com/vitejs/vite/issues/6215#issuecomment-1015002835
    react({
      jsxRuntime: 'classic',
    }),
  ],
  resolve: {
    alias: [
      {
        find: /@assets\//,
        replacement: path.join(__dirname, 'src', 'assets/'),
      },
      {
        find: /@components\//,
        replacement: path.join(__dirname, 'src', 'components/'),
      },
      {
        find: /@mocks\//,
        replacement: path.join(__dirname, 'src', 'mocks/'),
      },
      {
        find: /@helpers\//,
        replacement: path.join(__dirname, 'src', 'helpers/'),
      },
      {
        find: /@types\//,
        replacement: path.join(__dirname, 'src', 'types'),
      },
      {
        find: /@hooks\//,
        replacement: path.join(__dirname, 'src', 'hooks/'),
      },
    ],
  },
});
