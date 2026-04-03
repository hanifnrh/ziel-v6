// @ts-check

import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  site: 'https://ziel.work',  
  vite: {
      plugins: [tailwindcss()],
    },

 integrations: [react(), sitemap()],
  adapter: netlify(),
});