import { nextSearchPlugin } from '../../../src'

const plugins = [
  nextSearchPlugin({
    fullText: true,
    placeholder: '搜索',
    frontmatter: {
      tag: '标签',
      category: '分类',
    }
  }),
]

export { plugins }
