# Workers Sites

<DirectoryListing path="/reference/platform/sites"/>

Workers Sites enables developers to deploy static applications directly to Workers. Workers Sites is perfect for deploying applications built with frontend frameworks like [React](https://reactjs.org) and [Vue](https://vuejs.org/), as well as static site generators like [Hugo](https://gohugo.io/) and [Gatsby](https://www.gatsbyjs.org/).

To use Workers Sites, you'll take one of three routes:

- [Deploy a pre-existing static site project](/reference/platform/sites/start-from-existing)

If you have an existing project or static assets that you want to deploy with Workers, this quick start guide will help you add Wrangler and configure Workers Sites for your project.

- [Create a new project from scratch](/reference/platform/sites/start-from-scratch)

If you're ready to start a brand new project, starting from scratch with Workers Sites will set up the infrastructure to deploy a simple HTML website to Workers.

- [Add static assets to a pre-existing worker project](/reference/platform/sites/start-from-worker)

If you already have an application deployed to Workers, this guide will show you how to use Workers Sites in your existing codebase, allowing you to deploy your entire application as a single Workers project.

<Aside>

__Note__: Workers Sites require the latest version of [Wrangler](https://github.com/cloudflare/wrangler) and the Workers [Unlimited plan](https://workers.cloudflare.com/sites#plans). As Workers Sites use Workers and Workers KV, their usage goes into account towards your monthly bill.

</Aside>