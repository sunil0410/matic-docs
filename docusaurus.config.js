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
          },
          {
            to: '/docs/contribute/orientation',
            from: '/docs/pos/orientation',
          },
          {
            to: '/docs/contribute/community-maintainers',
            from: '/docs/pos/community-maintainers',
          },
          {
            to: '/docs/contribute/bug-bountry-program',
            from: '/docs/pos/bug-bountry-programs',
          },
          {
            to: '/docs/develop/meta-transactions/meta-transactions',
            from: '/docs/develop/metatransactions/metatransactions-biconomy',
          },
          {
            to: '/docs/develop/meta-transactions/meta-transactions',
            from: '/docs/develop/metatransactions/metatransactions-gsn',
          },
          {
            to: '/docs/develop/meta-transactions/network-agnostics',
            from: '/docs/develop/metatransactions/network-agnostics',
          },
          {
            to: '/docs/develop/wallets/getting-started',
            from: '/docs/develop/cexs-wallets',
          },
          {
            to: '/docs/develop/wallets/getting-started',
            from: '/docs/develop/fiat-on-ramp',
          },
          {
            to: '/docs/develop/wallets/getting-started',
            from: '/docs/develop/fiat-ramps'
          },
          {
            to: '/docs/develop/wallets/getting-started',
            from: '/docs/develop/cexs-wallets/cexs',
          },
          {
            to: '/docs/develop/wallets/polygon-web-wallet/web-wallet-v3-guide',
            from: '/docs/develop/wallets/polygon-web-wallet/web-wallet-v2-guide',
          },
          {
            to: '/docs/maintain/validate/kb/known-issues',
            from: '/docs/maintain/validate/faq/known-issues'
          },
          {
            to: '/docs/maintain/validate/kb/how-to',
            from: '/docs/maintain/validate/faq/how-to'
          },
          {
            to: '/docs/faq/validator-faq',
            from: '/docs/maintain/validate/faq/validator-faq'
          },
          {
            to: '/docs/maintain/validator/responsibilities',
            from: '/docs/maintain/validate/validator-responsibilities'
          },
          {
            to: '/docs/operate/technical-requirements',
            from: '/docs/develop/network-details/technical-requirements'
          },
          {
            to: '/docs/operate/snapshot-instructions-heimdall-bor',
            from: '/docs/develop/network-details/snapshot-instructions-heimdall-bor'
          },
          {
            to: '/docs/operate/access-node-alchemy',
            from: '/docs/develop/network-details/access-node-alchemy'
          },
          {
            to: '/docs/operate/full-node-deployment',
            from: '/docs/develop/network-details/full-node-deployment'
          },
          {
            to: '/docs/operate/full-node-binaries',
            from: '/docs/develop/network-details/full-node-binaries'
          },
          {
            to: '/docs/operate/full-node-docker',
            from: '/docs/develop/network-details/full-node-docker'
          },
          {
            to: '/docs/operate/full-node',
            from: '/docs/develop/network-details/full-node'
          },

        ],
        createRedirects: function (existingPath) {
          if (existingPath.startsWith('/docs/validate/')) {
            return [existingPath.replace('/docs/maintain/')
            ];
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
              href: '/docs/pos/polygon-architecture',
              label: 'PoS',
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
              href: 'https://zkevm.polygon.technology',
              label: 'zkEVM',
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
          ],
        },
        {
          to: '/docs/maintain/govern/governance-pos',
          label: 'Governance',
          target: '_blank',
          rel: null,
        },
        {
          to: 'https://events.polygon.technology/blueprint-web3-games-guide',
          label: 'Gaming Guide',
          target: '_blank',
          rel: null,
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
          target: '_blank',
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
