import js from "@eslint/js";
import react from "eslint-plugin-react";
import prettier from "eslint-config-prettier";

export default [
  // Base ESLint configuration
  js.configs.recommended,

  // Node.js and Browser environments
  {
    languageOptions: {
      ecmaVersion: 2021, // Modern JavaScript syntax
      sourceType: "module", // Enable ES Modules
    },
    // env: {
    //   node: true, // Enable Node.js global variables
    //   browser: true, // Enable Browser global variables
    //   es2021: true, // Include ES2021 features
    // },
  },

  // React plugin configuration
  {
    plugins: {
      react,
    },
    settings: {
      react: {
        version: "detect", 
      },
    },
    rules: {
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
    },
  },

  // Prettier integration to disable conflicting ESLint rules
  prettier,

  // Additional custom rules
  {
    rules: {
      "no-unused-vars": "warn", // Warn about unused variables
      "no-undef": "off", // Disable errors for Node.js globals
    },
  },
];