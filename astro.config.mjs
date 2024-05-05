import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  integrations: [
      mdx(),
      sitemap(),
      react(),
      tailwind()
  ],
  vite: {
    build: {
      rollupOptions: {
        output: {
          entryFileNames: 'entry.[hash].mjs',
          chunkFileNames: 'chunks/chunk.[hash].mjs',
          assetFileNames: 'assets/asset.[hash][extname]',
        },
      },
    }
  },
	server: {
		// host: true,
		headers: {
			'Chuan-Yang': 'Chuan-Yang'
		},
	}
});
