import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import expressiveCode from 'astro-expressive-code';

// GitHub Pages project site: https://redrabbitdevs.github.io/Programming-Tutorials/
export default defineConfig({
  site: 'https://redrabbitdevs.github.io',
  base: '/Programming-Tutorials',
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [
    // Must come before mdx().
    expressiveCode(),
    mdx(),
    sitemap(),
  ],
});
