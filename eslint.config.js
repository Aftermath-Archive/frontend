import js from '@eslint/js';
import react from '@eslint-react/eslint-plugin';
import { defineConfig } from 'eslint/config';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

const sourceFiles = ['src/**/*.{js,jsx}'];

export default defineConfig([
    { ignores: ['dist/**', 'coverage/**'] },
    js.configs.recommended,
    {
        files: sourceFiles,
        extends: [react.configs.recommended],
        languageOptions: {
            globals: globals.browser,
            parserOptions: { ecmaFeatures: { jsx: true } },
        },
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
        },
        rules: {
            // Keep the official Hooks plugin as the authority for these checks.
            '@eslint-react/rules-of-hooks': 'off',
            '@eslint-react/exhaustive-deps': 'off',
            // These codemods prefer new syntax; the existing APIs remain supported.
            '@eslint-react/no-context-provider': 'off',
            '@eslint-react/no-use-context': 'off',
            '@eslint-react/dom-no-dangerously-set-innerhtml': 'error',
            '@eslint-react/dom-no-unknown-property': 'error',
            '@eslint-react/dom-no-unsafe-target-blank': 'error',
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',
            'react-refresh/only-export-components': [
                'warn',
                { allowConstantExport: true },
            ],
            'no-unused-vars': 'warn',
            'no-console': ['warn', { allow: ['warn', 'error'] }],
        },
    },
    {
        files: ['src/components/ui/**', 'src/contexts/**'],
        rules: { 'react-refresh/only-export-components': 'off' },
    },
    {
        files: ['src/components/ui/**'],
        // Preserve copied Radix/shadcn ref wrappers until their own migration.
        rules: { '@eslint-react/no-forward-ref': 'off' },
    },
    {
        files: [
            'src/components/Incident/IncidentForm/IncidentForm.jsx',
            'src/components/Incident/IncidentView/IncidentView.jsx',
        ],
        // Tags and links may repeat; these lists contain stateless text badges.
        rules: { '@eslint-react/no-array-index-key': 'off' },
    },
    {
        files: ['*.{js,mjs}', 'scripts/**/*.{js,mjs}'],
        languageOptions: { globals: globals.node },
    },
    {
        files: ['src/__tests__/**/*.{js,jsx}'],
        languageOptions: {
            globals: {
                ...globals.node,
                beforeEach: 'readonly',
                afterEach: 'readonly',
                beforeAll: 'readonly',
                afterAll: 'readonly',
                describe: 'readonly',
                it: 'readonly',
                test: 'readonly',
                expect: 'readonly',
                vi: 'readonly',
            },
        },
        rules: { 'react-refresh/only-export-components': 'off' },
    },
    prettier,
]);
