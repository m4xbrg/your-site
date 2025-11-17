// astro.config.mjs
import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import { remarkTexFencesToMath } from './scripts/remark-tex-fences-to-math.js'

export default defineConfig({
  integrations: [
    mdx({
      remarkPlugins: [
        remarkMath,
        remarkTexFencesToMath,
      ],
      rehypePlugins: [
        [rehypeKatex, { strict: 'ignore' }],
      ],
    }),
  ],
})
