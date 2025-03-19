import node from '@astrojs/node';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

export default defineConfig({
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
    resolve: { alias: { '.prisma/client/index-browser': `@prisma/client/index-browser` } }
  },
  adapter: node({
    mode: 'middleware'
  })
});