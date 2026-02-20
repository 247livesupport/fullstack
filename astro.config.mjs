// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react'; // 1. Import React

// https://astro.build/config
export default defineConfig({
  integrations: [react()], // 2. Add the integration here
  vite: {
    plugins: [tailwindcss()]
  }
});