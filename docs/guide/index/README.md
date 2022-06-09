---
title: 安装与使用
date: 2022-06-09
star: true
icon: flower
category: 
- 指南
tag:
- 安装
- 使用
---

:::: info 非学无以广才，非志无以成学
::: right
摘自 [《诫子书》- 诸葛亮](https://hanyu.baidu.com/shici/detail?pid=ce7bcf07f57411e58fb0c8e0eb15ce01&from=kg0)
:::
::::

<!-- more -->

## 前言

当你的内容灰常灰常多的时候，我更推荐你使用\
`@vuepress/plugin-docsearch@next`\
如果文档要求保密性，或者是局域网文档的话，请联系作者优化插件以适配大型文档

**为什么现在不优化超大型文档的搜索功能？**
1. 懒
2. 没有大型文档给我测试

**`next-search`的优缺点很明显：**
- 优点
  - 在保证文档的隐私性的同时，实现了全文搜索
  - 更好的适配了手机端
  - 因为是本地缓存搜索，所以速度杠杠滴！
- 缺点
  - 当文档内容过大的时候，客户端需要承担相应的搜索压力
  - 不适合大型文档（每篇文档的文字都是动辄数万字数的那种）
  - 用爱发电，更新随缘

请自行斟酌是否使用

## 安装

::: code-tabs#install

@tab:active npm

```shell
npm i -D vuepress-plugin-next-search
```

@tab yarn

```shell
yarn add -D vuepress-plugin-next-search
```

:::

## 使用

::: code-tabs#usage

@tab:active ESM

```ts
import { nextSearchPlugin } from 'vuepress-plugin-next-search'
```

@tab CJS

```ts
const { nextSearchPlugin } = require('vuepress-plugin-next-search')
```

:::

只需要在你的`.vuepress/config{.ts,.js}`内的`plugins`中引用插件即可

完整引用如下

```ts
  plugins: [
    nextSearchPlugin({
      fullText: true,
      placeholder: '搜索',
      frontmatter: {
        tag: '标签',
        category: '分类',
      }
    }),
  ]
```

或者也可以这样

```ts
  plugins: [
    nextSearchPlugin({}),
  ]
```
