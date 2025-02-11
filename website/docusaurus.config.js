// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const math = require('remark-math');
const katex = require('rehype-katex');


async function createConfig() {

  const repo = process.env.Z3GUIDE_GITHUB_REPOSITORY;
  const sha = process.env.Z3GUIDE_GITHUB_SHA;

  let linkToCommit = '';
  if (repo && sha) {
    linkToCommit = `<a href=https://github.com/${repo}/commit/${sha} target="_blank" rel="noopener noreferrer">${sha.slice(0, 8)}</a> | `
  }

  /** @type {import('@docusaurus/types').Config} */
  // where information such as course title, description etc. are configured
  const config = {
    title: 'Z3',
    tagline: 'Learn Z3 online!',
    url: 'https://microsoft.github.io/',
    baseUrl: '/z3guide/',
    onBrokenLinks: 'ignore',
    onBrokenMarkdownLinks: 'warn',

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: 'microsoft', // Usually your GitHub org/user name.
    projectName: 'z3guide', // Usually your repo name.
    deploymentBranch: 'gh-pages', // name of the deployment branch

    // Even if you don't use internalization, you can use this field to set useful
    // metadata like html lang. For example, if your site is Chinese, you may want
    // to replace "en" with "zh-Hans".
    i18n: {
      defaultLocale: 'en',
      locales: ['en'],
    },

    plugins: [
      './plugins/add-z3-files',
      './plugins/more-webpack-config',
    ],

    presets: [
      [
        '@docusaurus/preset-classic',
        // /** @type {import('@docusaurus/preset-classic').Options} */
        ({
          docs: {
            remarkPlugins: [math],
            rehypePlugins: [katex],
            sidebarPath: require.resolve('./sidebars.js'),
            // Please change this to your repo.
            // Remove this to remove the "edit this page" links.
            editUrl:
              'https://github.com/microsoft/z3guide/tree/main/website',
          },
          theme: {
            customCss: require.resolve('./src/css/custom.css'),
          },
        }),
      ],
    ],

    scripts: [],

    stylesheets: [
      {
        href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
        type: 'text/css',
        integrity:
          'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
        crossorigin: 'anonymous',
      },
    ],

    themes: [
      '@docusaurus/theme-live-codeblock',
    ],

    themeConfig:
      /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
      ({
        navbar: {
          title: 'Z3 Documentation',
          items: [
            {
              type: 'doc',
              docId: 'logic/intro',
              position: 'left',
              label: 'Logic',
            },
            {
              type: 'doc',
              docId: 'theories/Arithmetic',
              position: 'left',
              label: 'Theories',
            },
            {
              type: 'doc',
              docId: 'strategies/intro',
              position: 'left',
              label: 'Strategies',
            },
            {
              type: 'doc',
              docId: 'optimization/intro',
              position: 'left',
              label: 'Optimization',
            },
            {
              type: 'doc',
              docId: 'fixedpoints/intro',
              position: 'left',
              label: 'Fixedpoints',
            },
            {
              type: 'doc',
              docId: 'playground/playground',
              position: 'left',
              label: 'Playground',
            },
            // link to the github repo of this site
            {
              href: 'https://github.com/microsoft/z3guide',
              label: 'GitHub',
              position: 'right',
            },
          ],
        },
        footer: {
          style: 'dark',
          links: [
            {
              title: 'More Z3',
              items: [
                {
                  label: 'Programming Z3 in Python',
                  href: 'https://z3prover.github.io/papers/programmingz3.html',
                },
                {
                  label: 'Z3 on GitHub',
                  href: 'https://github.com/Z3Prover/z3'
                }
              ],
            },
            {
              title: 'Z3 Material',
              items: [
                {
                  label: 'API',
                  to: 'https://z3prover.github.io/api/html/index.html',
                },
                {
                  label: 'Slides',
                  href: 'https://z3prover.github.io/slides'
                },
                {
                  label: 'Wiki',
                  href: 'https://github.com/z3prover/z3/wiki',
                }
              ],
            },
            {
              title: 'Stay Connected',
              items: [
                {
                  label: 'GitHub',
                  href: 'https://github.com/microsoft/z3guide',
                },
                {
                  label: 'Twitter',
                  href: 'https://twitter.com/RiSE_MSR',
                },
                {
                  label: 'RiSE @ MSR',
                  href: 'https://www.microsoft.com/en-us/research/group/research-software-engineering-rise/',
                }
              ],
            },
            {
              title: 'Legal',
              items: [
                {
                  label: 'Privacy & Cookies',
                  href: 'https://go.microsoft.com/fwlink/?LinkId=521839',
                },
                {
                  label: 'Terms of Use',
                  href: 'https://www.microsoft.com/en-us/legal/intellectualproperty/copyright',
                },
                {
                  label: 'Trademarks',
                  href: 'https://www.microsoft.com/en-us/legal/intellectualproperty/trademarks/usage/general'
                }
              ]
            }
          ],
          copyright: `${linkToCommit}Copyright © ${new Date().getFullYear()} Microsoft Corporation.`,
        },
        prism: {
          theme: lightCodeTheme,
          darkTheme: darkCodeTheme,
          additionalLanguages: ['lisp'],
        },
      }),
  };

  const renderCodeBlocks = (await import('./src/remark/render-code-blocks.mjs')).default;
  config.presets[0][1].docs.remarkPlugins.push(renderCodeBlocks);
  config.scripts.push({
    src: `${config.baseUrl}coi-serviceworker.js`,
    type: 'text/javascript',
    defer: true,
  });

  config.scripts.push({
    src: `${config.baseUrl}z3-built.js`,
    type: 'text/javascript',
    defer: true,
  });


  return config;
}

module.exports = createConfig;
