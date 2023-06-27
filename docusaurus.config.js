const math = require('remark-math');
const katex = require('rehype-katex');

module.exports = {
  title: "Polygon Wiki",
  tagline: "The official documentation for all Polygon products.",
  url: "https://wiki.polygon.technology",
  baseUrl: "/",
  favicon: "img/logo-round-purple.png",
  organizationName: "Polygon Labs",
  projectName: "matic-docs",
  customFields: {
    description: "Build your next blockchain app on Polygon.",
  },
  plugins: [
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          {
            to: '/',
            from: ['/en/latest', '/en/'],
          }
        ],
        createRedirects: function (existingPath) {
          if (existingPath.startsWith('/docs/pos/heimdall/')) {
            return [existingPath.replace('/docs/pos/heimdall/', '/docs/pos/design/heimdall/')];
          } else if (existingPath.startsWith('/docs/pos/bor')) {
            return [existingPath.replace('/docs/pos/bor', '/docs/pos/design/bor')];
          } else if (existingPath.startsWith('/docs/maintain/govern/')) {
            return [existingPath.replace('/docs/maintain/govern/', '/docs/governance/')];
          } else if (existingPath.startsWith('/docs/pos/state-sync')) {
            return [existingPath.replace('/docs/pos/state-sync', '/docs/pos/design/bridge/state-sync')];
          } else if (existingPath.startsWith('/docs/operate')) {
            return [existingPath.replace('/docs/operate', '/docs/pos/operate')];
          }
        },
      },
    ],
  ],
  onBrokenLinks: 'log',
  themeConfig: {
    metadata: [{ name: 'description', content: 'Welcome to Polygon Wiki, the official documentation for Polygon. Learn about Polygon and its suite of Ethereum-scaling solutions.' }],
    announcementBar: {
      id: 'banner',
      content: `
        <div class="announcement-bar">
          The Polygon 2.0 Vision is out! Learn more
            <a href="https://polygon.technology/roadmap" class="announcement-link" style="color: #ffffff;">here</a>
        </div>
      `,
      textColor: '#ffffff',
      isCloseable: true,
    },

    colorMode: {
      defaultMode: 'dark',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    category: {
      emoji: ''
    },
    footer: {
      style: 'light',
      links: [
        {
          title: "Resources",
          items: [
            {
              href: 'https://support.polygon.technology/support/home',
              label: 'Polygon Support',
            },
            {
              label: "Advocate Program",
              href: "https://polygon.technology/advocate-program/"
            },
            {
              label: "Polygon Funds",
              href: "https://polygon.technology/funds/"
            },
            {
              label: "Bug Bounty",
              href: "https://immunefi.com/bounty/polygon/"
            },
            {
              href: 'https://www.dappstorekit.io/',
              label: 'Build your own dApp',
              target: '_blank',
              rel: null,
              position: 'right',
            },
          ]
        },
        {
          title: "Reference",
          items: [
            {
              label: "Whitepaper",
              href: "https://github.com/maticnetwork/whitepaper/"
            },
            {
              label: "Lightpaper",
              href: "https://polygon.technology/lightpaper-polygon.pdf"
            },
            {
              label: "zkEVM",
              href: "https://zkevm.polygon.technology"
            },
            {
              label: "Miden",
              href: "docs/miden/design/main"
            },
          ]
        },
        {
          title: "Native dApps",
          items: [
            {
              href: 'https://wallet.polygon.technology',
              label: 'PoS Wallet',
              target: '_blank',
              rel: null,
            },
            {
              href: 'https://staking.polygon.technology/',
              label: 'PoS Staking',
              target: '_blank',
              rel: null,
            },
            {
              href: 'https://polygonscan.com/',
              label: 'PoS Explorer',
              target: '_blank',
              rel: null,
            },
            {
              href: 'https://explorer.hermez.io/',
              label: 'Hermez',
              target: '_blank',
              rel: null,
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              href: 'https://twitter.com/0xPolygon',
              label: 'Twitter',
            },
            {
              href: 'https://discord.com/invite/0xPolygon',
              label: 'Discord',
            },
            {
              href: 'https://forum.polygon.technology/',
              label: 'Forum',
            },
            {
              href: 'https://www.reddit.com/r/0xPolygon/',
              label: 'Reddit',
            },
            {
              href: 'https://t.me/polygonofficial',
              label: 'Telegram',
            },
          ]
        },
        {
          title: "Polygon Labs",
          items: [
            {
              label: "About Us",
              href: "https://polygon.technology/about/"
            },
            {
              label: "Contact",
              href: "https://polygon.technology/contact-us/"
            },
            {
              label: "Blogs",
              href: "https://blog.polygon.technology/"
            },
            {
              label: "Brand Kit",
              href: "https://www.notion.so/polygontechnology/Brand-Resources-2cd18ae436584e98a6c5aae56db73058/"
            },
          ]
        },
      ],
      logo: {
        alt: 'Polygon Logo',
        src: 'img/polygon-labs.png',
        href: 'https://polygon.technology/',
      },
      copyright: `Copyright © ${new Date().getFullYear()}`,
    },
    image: 'polygon-logo.png',
    prism: {
      theme: require("prism-react-renderer/themes/github"),
      darkTheme: require("prism-react-renderer/themes/dracula"),
      defaultLanguage: "javascript",
      additionalLanguages: ['solidity']
    },
    algolia: {
      indexName: "matic_developer",
      appId: '16JCDEHCCN',
      apiKey: "d172fe1ed43468315f82bd9679515131",
      contextualSearch: true,
      algoliaOptions: {
        attributesToSnippet: ['content:20'],
      },
    },
    navbar: {
      hideOnScroll: true,
      logo: {
        alt: "Polygon logo",
        src: "/img/polygon-logo.png",
        srcDark: "/img/polygon-logo.png",
        target: "_self",
      },
      items: [
        {
          to: 'https://university.polygon.technology/',
          label: 'New to Polygon?',
          target: '_blank',
          rel: null,
        },
        {
          label: "Polygon Stack",
          position: "left",
          items: [
            {
              href: '/docs/pos/getting-started',
              label: 'PoS Mainnet',
              target: '_self',
              rel: null,
            },
            {
              href: 'https://zkevm.polygon.technology',
              label: 'zkEVM',
              target: '_self',
              rel: null,
            },
            {
              href: '/docs/supernets',
              label: 'Supernets',
              target: '_self',
              rel: null,
            },
            {
              href: '/docs/miden',
              label: 'Miden',
              target: '_self',
              rel: null,
            },
            {
              href: 'https://0xpolygonid.github.io/tutorials/',
              label: 'ID',
              target: '_self',
              rel: null,
            },
            {
              to: 'https://events.polygon.technology/blueprint-web3-games-guide',
              label: 'Gaming',
              target: '_blank',
              rel: null,
            },
          ],
        },
        {
          to: '/docs/tools',
          label: 'Apps & Tools',
          target: '_self',
          rel: null,
        },
        {
          label: "Participate",
          position: "left",
          items: [
            {
              href: '/docs/delegate/delegate',
              label: 'Delegate MATIC',
              target: '_self',
              rel: null,
            },
            {
              href: '/docs/category/run-a-validator-node',
              label: 'Run a PoS Validator',
              target: '_self',
              rel: null,
            },
            {
              href: '/docs/governance',
              label: 'Governance',
              target: '_self',
              rel: null,
            },
          ],
        },
        {
          label: "Pre-Specs",
          position: "left",
          items: [
            {
              href: 'https://zkevm.polygon.technology/docs/introduction',
              label: 'zkEVM',
              target: '_blank',
              rel: null,
            },
            {
              to: '/docs/category/miden-vm',
              label: 'Miden',
              target: '_self',
              rel: null,
            },
          ],
        },
        {
          to: 'https://support.polygon.technology/support/solutions',
          label: 'Support',
          position: "right",
          target: '_blank',
          rel: null,
        },
        {
          to: '/docs/contribute/orientation/',
          label: 'Contribute',
          position: "right",
          target: '_self',
          rel: null,
        },
        {
          href: "https://github.com/maticnetwork",
          position: "right",
          className: "header-github-link",
          "aria-label": "GitHub repository",
        },
      ],
    },
  },
  stylesheets: [
    {
      href: "https://cdn.jsdelivr.net/npm/katex@0.13.11/dist/katex.min.css",
      type: "text/css",
      integrity:
        "sha384-Um5gpz1odJg5Z4HAmzPtgZKdTBHZdw8S29IecapCSB31ligYPhHQZMIlWLYQGVoc",
      crossorigin: "anonymous",
    },
  ],
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: "https://github.com/maticnetwork/matic-docs/tree/master/",
          path: "docs",
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          remarkPlugins: [math],
          rehypePlugins: [[katex, { strict: false, throwOnError: true, globalGroup: true }]],
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        gtag: {
          trackingID: 'G-LLNECLTBDN',
          anonymizeIP: true,
        },
      },
    ],
  ],
};
