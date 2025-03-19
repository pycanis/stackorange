import baseConfig from "@repo/eslint-config/eslint.config.mjs";
import eslintPluginAstro from 'eslint-plugin-astro';
import { defineConfig } from "eslint/config";

export default defineConfig([
    {
        extends: [baseConfig],
    },
    ...eslintPluginAstro.configs.recommended,
])