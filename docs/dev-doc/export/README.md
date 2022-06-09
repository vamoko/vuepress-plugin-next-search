---
title: 第一步-导出
date: 2022-06-09
icon: editor
category:
- 开发文档
tag:
- 导出
---

<!-- more -->

## 创建一个插件

[官网是这样讲的](https://v2.vuepress.vuejs.org/zh/advanced/plugin.html#%E5%88%9B%E5%BB%BA%E4%B8%80%E4%B8%AA%E6%8F%92%E4%BB%B6)

> 插件是一个符合 [插件 API](https://v2.vuepress.vuejs.org/zh/reference/plugin-api.html) 的普通 JavaScript 对象，称之为 插件对象\
> 插件还可以是一个接收 [App 实例](https://v2.vuepress.vuejs.org/zh/reference/node-api.html#app) 作为参数，且返回值为 插件对象 的函数，称之为 插件函数\
> 插件通常需要允许用户传入配置，因此我们一般都会提供给用户一个函数来接收配置，然后将 插件对象 或者 插件函数 作为返回值。于是，你的插件应该转换成这样的形式：

```ts
const fooPlugin = (options) => {
  return {
    name: 'vuepress-plugin-foo',
    // ...
  }
}
    
const barPlugin = (options) => {
  return (app) => {
    return {
      name: 'vuepress-plugin-bar',
      // ...
    }
  }
}
```

**关于App实例，请根据你的实际业务自行决定是否传入**

像我这个搜索插件，用不到App实例，所以我们只需要创建一个`index.ts`

```ts
import { Plugin } from '@vuepress/core'

const nextSearchPlugin: () => Plugin = () => {
  return {
    name: 'vuepress-plugin-next-search',
    //...
  }
}

export { nextSearchPlugin }
```

是不是很简单？然后我们再添加亿点点细节，成品如下：

::: details 你懂我的意思吧？

==下面的app是形参，不是App实例==

```ts
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
      NEXT_SEARCH_OPTIONS: nextSearchOptions,
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
```
:::
