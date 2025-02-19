import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

import node from '@astrojs/node';

export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },

  adapter: node({
    mode: 'standalone'
  })
});