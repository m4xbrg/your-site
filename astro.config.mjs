import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  integrations: [mdx(), tailwind({
    applyBaseStyles: false
  })],
  markdown: {
    shikiConfig: { theme: 'github-dark' }
  }
});
