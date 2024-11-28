import js from '@eslint/js';
import reactRecommended from 'eslint-plugin-react/configs/recommended.js';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

export default [
    js.configs.recommended,
    reactRecommended,
    {
        files: ['**/*.{js,jsx}'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                ...globals.browser,
                ...globals.es2021,
            },
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        plugins: {
            'react-hooks': reactHooks,
        },
        rules: {
            // React Hooks rules
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',

            // Common JavaScript rules
            'no-unused-vars': 'warn',
            'no-console': ['warn', { allow: ['warn', 'error'] }],
            'no-undef': 'warn',

            // React specific rules
            'react/react-in-jsx-scope': 'off',
            'react/prop-types': 'off',

            // TailwindCSS specific (minimal interference)
            'max-len': 'off', // Disable line length restrictions for Tailwind classes
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
    },
];
