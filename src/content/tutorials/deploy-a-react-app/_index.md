---
updated: 2020-06-29
difficulty: Beginner
length: 20%
---

# Deploy a React App

In this tutorial, we'll use [Wrangler](https://github.com/cloudflare/wrangler) and [Cloudflare Workers](https://workers.cloudflare.com) to deploy and serve a static site. With the rise of architectures like [JAMStack](https://jamstack.org/), static sites have become a simple, streamlined way to combine highly-available static assets with performant backend code, especially when deployed with serverless. Workers in particular is a great platform to deploy static sites: your application will be distributed to over 190+ locations around the world, and served directly from Cloudflare’s powerful CDN at a server incredibly close to your users.

<iframe width="560" height="315" src="https://www.youtube.com/embed/6YC3MgVwCGA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

This tutorial makes use of [Wrangler](https://github.com/cloudflare/wrangler), our command-line tool for generating, building, and publishing projects on the Cloudflare Workers platform. If you haven’t used Wrangler, we recommend checking out the [“Installing the CLI”](/quickstart/#installing-the-cli) part of our [Quick Start guide](/quickstart), which will get you set up with Wrangler, and familiarize you with the basic commands.

One more thing before you start the tutorial: if you just want to jump straight to the code, we’ve made the final version of the codebase [available on GitHub](https://github.com/signalnerve/react-workers-template). You can take that code, customize it, and deploy it for use in your own projects. Happy coding!

## Prerequisites

To publish your project to Cloudflare Workers, you’ll need a few things:

- A Cloudflare account, and access to the API keys for that account
- A subscription to the Workers Unlimited plan
- Wrangler 1.4.0 or above, running locally on your machine (see the [Quick Start](https://developers.cloudflare.com/workers/quickstart/#installing-the-cli) for instructions on installing and updating Wrangler)
- Access to the command-line

If you don’t have those things quite yet, don’t worry. We’ll walk through each of them and make sure we’re ready to go before you start creating your application.

In addition, we’ll be using [create-react-app](https://github.com/facebook/create-react-app) to create the example project for this tutorial. No experience with React is needed, and you can easily take what you learn in this tutorial and apply it to other frameworks, such as [Vue](https://vuejs.org/) or [Angular](https://angular.io), and even static site frameworks like [Gatsby](https://gatsbyjs.org), [Hugo](https://gohugo.io), and more.

## Create a static site

In this tutorial, we’ll use [`create-react-app`](https://github.com/facebook/react) to create a simple static application. As previously mentioned, no experience with React is necessary, and we can create a new project directly by using `npx`:

```sh
$ npx create-react-app my-static-site
```

`create-react-app` will create a new project, and include all the relevant dependencies needed to build the project.

## Generate a project

In the command line, navigate to your newly-created React project, and use `wrangler init --site` to generate a Workers Sites configuration for your project:

```sh
$ cd my-static-site
$ wrangler init --site
```

The `init --site` command will provide the scaffolding necessary to deploy your React application. For the majority of static sites, you shouldn’t need to change the Workers script: by default, the script will look at an incoming request, and will serve a corresponding asset from [Workers KV](https://www.cloudflare.com/products/workers-kv/) based on that route. For instance, if my static site is deployed at `mystaticsite.com`, requesting `mystaticsite.com/about.html` will look for a file in KV called `about.html`, and serve it back to the client. In addition, if the asset being returned from KV is cacheable, it will automatically be cached with Cloudflare’s CDN, making subsequent requests even faster.

## Configure and Publish

To prepare your application for deployment, open up the newly-created `wrangler.toml` file, which represents the configuration for your Workers application. Using the [“Configure” section of the Quick Start](https://developers.cloudflare.com/workers/quickstart/#configure) as a guide, populate `wrangler.toml` with your account ID, which will allow you to deploy your React application to your Cloudflare account.

The `bucket` key in your `wrangler.toml` indicates the “build” folder that Sites will deploy to Workers. While many front-end application and static site generators use the folder `public`, `create-react-app` uses the folder `build`. Let’s change the `bucket` key in `wrangler.toml` to `build`:

```toml
---
filename: wrangler.toml
highlight: [3, 4, 5]
---
# ... previous wrangler config

[site]
bucket = './build'
entry-point = 'workers-site'
```

With a configured `wrangler.toml` file, it’s time to build your project, and publish it to Workers. Run `npm run build` to tell `create-react-app` to build your site, and `wrangler publish` to deploy it to Workers:

```sh
$ npm run build
$ wrangler publish
```

After deploying your project, open up your browser to see your static site in action!

![Result](./media/demo.png)

## How it works

The Workers Site feature is designed to work with as little as configuration as possible: since the process for deploying static sites is fairly consistent, regardless of framework or language, you shouldn’t need to spend a lot of time configuring your project or writing any additional code to serve your site on Workers.

That being said, if you’re interested in how Workers serves static sites, this section will lightly document how the underlying script works, and what it does each time a user makes a request to your site.

Like all Workers scripts, the static site feature begins by listening for incoming `fetch` events to your application — these are incoming requests from a client, such as a browser or a phone:

```js
---
filename: index.js
---
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
```

When the script receives an incoming [`Request`](https://developer.mozilla.org/en-US/docs/Web/API/Request), it looks at the `pathname`, such as `/workers`, and looks up an associated file uploaded to Workers KV. If that file is found, a new [`Response`](https://developer.mozilla.org/en-US/docs/Web/API/Response) is generated, with a matching [MIME type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types) in the `Content-Type` header of the response — for instance, if the path `/workers.jpg` is requested, a new response is returned with the header `Content-type: image/jpg`.

After fetching assets from [Workers KV](https://developers.cloudflare.com/workers/reference/storage), the static site template will cache them in Cloudflare’s powerful CDN. When subsequent users request `/index.html`, Cloudflare’s CDN will transparently serve a cached version.

## Resources

In this tutorial, you built and published a static site to Workers. If you’d like to see the full source code for this application, visit the [repo on GitHub](https://github.com/signalnerve/react-workers-template).

If you want to get started building your own projects, check out the quick-start templates we’ve provided in our [Template Gallery](/templates).
