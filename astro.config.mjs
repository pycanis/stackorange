import node from '@astrojs/node';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },
  adapter: node({
    mode: 'middleware',
  })
});