// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer').themes.github;
const darkCodeTheme = require('prism-react-renderer').themes.dracula;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'VRChat 创作',
  tagline: '使用我们的工具和文档来学习、创作和分享',
  url: 'https://creators.vrchat.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',
  favicon: 'img/favicon.ico',
  organizationName: 'vrchat', // Usually your GitHub org/user name.
  projectName: 'CreatorDocs', // Usually your repo name.

  scripts: [
    {
      defer: true,
      src: 'https://plausible.io/js/script.js',
      'data-domain': 'creators.vrchat.com'
    },
  ],
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: ({versionDocsDirPath, docPath}) =>
              `https://github.com/vrchat-community/creator-docs/edit/main/Docs/docs/${docPath}`,
          showLastUpdateTime: true,
        },
        blog: {
          path: 'releases',
          routeBasePath: 'releases',
          blogTitle: 'VRChat SDK 版本发布',
          blogDescription: '最新的VRChat SDK版本发布和补丁说明',
          showReadingTime: false,
          blogSidebarTitle: 'History',
          blogSidebarCount: 'ALL',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 5,
      },
      colorMode: {
        defaultMode: 'dark',
        respectPrefersColorScheme: true,
      },
      docs: {
        sidebar: {
          autoCollapseCategories: true,
        },
      },
      navbar: {
        title: 'VRChat 创作',
        logo: {
          alt: 'VRChat Logo',
          src: 'img/logo.png',
        },
        items: [
          {to: 'worlds', label: '世界', position: 'left'},
          {to: 'avatars', label: '虚拟形象', position: 'left'},
          {to: 'economy', label: 'Creator Economy（创作者经济）', position: 'left'},
          {to: 'releases', label: '版本发布', position: 'left'},
          {to: 'https://udonsharp.docs.vrchat.com', label: 'UdonSharp', position: 'right'},
          {to: 'https://vcc.docs.vrchat.com', label: 'Creator Companion（创作者助手）', position: 'right'},
          {to: 'worlds/clientsim', label: 'ClientSim（客户端模拟器）', position: 'right'},
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: '文档',
            items: [
              {to: 'worlds', label: '世界'},
              {to: 'avatars', label: '虚拟形象'},
              {to: 'economy', label: '创作者经济'},
            ],
          },
          {
            title: '工具',
            items: [
              {to: 'https://udonsharp.docs.vrchat.com', label: 'UdonSharp'},
              {to: 'https://vcc.docs.vrchat.com', label: 'Creator Companion'},
              {to: 'worlds/clientsim', label: 'ClientSim'},
            ],
          },
          {
            title: '社区',
            items: [
              {
                label: '提问社区',
                href: 'https://ask.vrchat.com/',
              },
              {
                label: 'Bluesky',
                href: 'https://bsky.app/profile/vrchat.com',
              },
              {
                label: 'Discord',
                href: 'https://discord.com/invite/vrchat',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/vrchat',
              },
            ],
          },
          {
            title: '更多',
            items: [
              {
                label: '版本发布',
                to: '/releases',
              },
              {
                label: '路线图',
                to: '/roadmap',
              },
            ],
          },
        ],
        copyright: `版权所有 © ${new Date().getFullYear()} VRChat Inc. 使用 Docusaurus 构建`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['csharp']
      },
      algolia: {
        appId: 'NQHMNOH2YO',
        apiKey: '292dfc501d73d6fa1352744ce4620735',
        indexName: 'VRChat_Docs',
        contextualSearch: true,
        externalUrlRegex: 'https:\/\/(?!creators)' // Results that don't come from this site should redirect using their absolute URL, rather than redirecting relative to the current site
      },
    }),
};

module.exports = config;
