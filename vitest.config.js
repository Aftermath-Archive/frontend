import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config.js';

export default mergeConfig(
    viteConfig,
    defineConfig({
        test: {
            globals: true,
            environment: 'jsdom',
            setupFiles: './src/__tests__/setupTest.js',
            mockReset: true, // Reset mocks between tests
            include: ['src/__tests__/**/*.test.{js,jsx,ts,tsx}'],
        },
    })
);
