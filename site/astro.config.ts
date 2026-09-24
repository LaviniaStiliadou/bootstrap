import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

import astroBrokenLinksChecker from 'astro-broken-links-checker'
import { bootstrap } from './src/libs/astro'
import { getConfig } from './src/libs/config'
import { algoliaPlugin } from './src/plugins/algolia-plugin'
import { stackblitzPlugin } from './src/plugins/stackblitz-plugin'

const isDev = process.env.NODE_ENV === 'development'

const site = isDev
  ? 'http://localhost:9001'
  : 'https://laviniastiliadou.github.io/bootstrap'

export default defineConfig({
  site,
  base: '/bootstrap/',

  build: {
    assets: `docs/${getConfig().docs_version}/assets`
  },

  integrations: [
    mdx({
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex]
    }),

    bootstrap(),

    astroBrokenLinksChecker({
      checkExternalLinks: false,
      cacheExternalLinks: false,
      throwError: false,
      linkCheckerDir: '.link-checker'
    })
  ],

  markdown: {
    smartypants: false,
    syntaxHighlight: 'prism'
  },

  vite: {
    plugins: [algoliaPlugin(), stackblitzPlugin()]
  }
})