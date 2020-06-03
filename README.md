# Workers Docs

## Note about the project naming

While this project is currently called Workers Docs, it will soon be broken out into two projects:

- Workers Docs engine – [@cloudflare/workers-docs-engine](https://github.com/cloudflare/workers-docs-engine)

- Workers Docs (content) – Either [@cloudflare/workers-docs](https://github.com/cloudflare/workers-docs) or (-content)

Soon after that, Workers Docs engine will be renamed [@cloudflare/cloudflare-docs-engine](https://github.com/cloudflare/cloudflare-docs-engine), and other Cloudflare products in addition to Workers will begin using it.

## Developing locally

For now, please see the instructions for [Gatsby’s default starter](https://github.com/gatsbyjs/gatsby-starter-default).

## Documentation (for the documentation)

See https://workers-docs.ruthless.design/docs-engine.

## Known issues

- [@gatsbyjs/gatsby#17506](https://github.com/gatsbyjs/gatsby/issues/17506) Console warning about `lazy=load` images missing dimensions. This is a known issue in Gatsby and the [recommendation as of Sept, 2019](https://github.com/gatsbyjs/gatsby/issues/17506#issuecomment-529904482) is to ignore it.
