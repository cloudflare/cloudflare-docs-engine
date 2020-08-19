# Workers Docs Engine

## Note about the project naming

While this project is currently called Workers Docs Engine, it currently contains both the docs engine and content.

The plan is to move the content into either [@cloudflare/workers-docs](https://github.com/cloudflare/workers-docs) or (-content).

Soon after that, the engine itself will be renamed [@cloudflare/cloudflare-docs-engine](https://github.com/cloudflare/cloudflare-docs-engine), and other Cloudflare products in addition to Workers will begin using it.

## Developing locally

For now, please see the instructions for [Gatsby’s default starter](https://github.com/gatsbyjs/gatsby-starter-default).

## Documentation (for the documentation)

See https://workers.cloudflaredocs.workers.dev/workers/docs-engine. (This URL is temporary. Once the docs are live on https://developers.cloudflare.com/workers, the “Docs Engine” content in `src/content/docs-engine` will be broken out to a separate project and deployed to another location.

## Known issues

- [@gatsbyjs/gatsby#17506](https://github.com/gatsbyjs/gatsby/issues/17506) Console warning about `lazy=load` images missing dimensions. This is a known issue in Gatsby and the [recommendation as of Sept, 2019](https://github.com/gatsbyjs/gatsby/issues/17506#issuecomment-529904482) is to ignore it.
- Hard page loads with hashes don’t start scrolled when developing locally (e.g. `http://localhost:8000/#docs-content`)
