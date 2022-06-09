import { Plugin } from '@vuepress/core'
import { Options } from './client/core/types'
import { path } from '@vuepress/utils'
import * as chokidar from 'chokidar'
import { prepareSearchIndex } from './client/core/prepareSearchIndex'

const nextSearchPlugin: (options: Options) => Plugin = (options) => {
  const nextSearchOptions: Options = {
    fullText: options.fullText ?? true,
    placeholder: options.placeholder ?? '搜索',
    frontmatter: {
      category: options.frontmatter?.category ?? '分类',
      tag: options.frontmatter?.tag ?? '标签',
    },
  }
  return {
    name: 'vuepress-plugin-next-search',
    clientConfigFile: path.resolve(__dirname, './client/core/clientConfig.ts'),
    define: {
      __NEXT_SEARCH_OPTIONS__: nextSearchOptions,
    },
    onPrepared(app) {
      prepareSearchIndex({ app, nextSearchOptions })
    },
    onWatched: (app, watchers) => {
      const searchIndexWatcher = chokidar.watch('internal/pageData/*', {
        cwd: app.dir.temp(),
        ignoreInitial: true,
      })
      searchIndexWatcher.on('add', () => {
        prepareSearchIndex({ app, nextSearchOptions })
      })
      searchIndexWatcher.on('change', () => {
        prepareSearchIndex({ app, nextSearchOptions })
      })
      searchIndexWatcher.on('unlink', () => {
        prepareSearchIndex({ app, nextSearchOptions })
      })
      watchers.push(searchIndexWatcher)
    },
  }
}

export { nextSearchPlugin }
