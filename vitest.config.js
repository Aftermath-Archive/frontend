import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'), // Map `@` to the `src` folder
        },
    },
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/__tests__/setupTest.js',
        mockReset: true, // Reset mocks between tests
        include: ['./src/__tests__/*/*.test.{js,jsx,ts,tsx}'],
    },
});
