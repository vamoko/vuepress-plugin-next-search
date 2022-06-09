const navbar = [
    { text: '首页', link: '/', icon: 'home' },
    { text: '指南', link: '/guide/index/', icon: 'repo' },
    { text: '开发文档', link: '/dev-doc/index/' , icon: 'code' },
    { text: '快速阅览',
        icon: 'info',
        children: [
            { text: '文章',
                link: '/article/' ,
                icon: 'blog',
            },
            { text: '分类',
                link: '/category/' ,
                icon: 'type',
            },
            { text: '标签',
                link: '/tag/' ,
                icon: 'tag',
            },
            { text: '时间轴',
                link: '/timeline/' ,
                icon: 'time',
            }
        ],
    },
    { text: '浏览器下载',
        icon: 'chrome',
        children: [
            { text: '推荐使用',
                children: [
                    { text: 'Chrome', link: 'https://www.google.cn/chrome/'},
                    { text: 'Edge', link: 'https://www.microsoft.com/zh-cn/edge' },
                ],
            },
            { text: '求你别用',
                children: [
                    { text: '360极速全家桶', link: 'http://browser.360.cn/ee/' },
                    { text: '搜狗高速广告大师', link: 'https://ie.sogou.com/' },
                ]
            }
        ],
    },
]

export { navbar }
