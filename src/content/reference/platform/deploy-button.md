---
title: Deploy Button
---

# Deploy Button

## Background

The Deploy to Workers Button is an easy way to let developers deploy a project and get started with Workers. This can be a great tool for new developers just getting started and for you to share you project with others.

Try it out here for our GraphQl template project:

[![Deploy to Cloudflare Workers](https://deploy-to-cf-workers.signalnerve.workers.dev/button)](https://deploy-to-cf-workers.signalnerve.workers.dev/button)


## Create a Deploy Button for your project

1. **Add a GitHub Actions workflow to your project.**

Add a new file to `.github/workflows`, such as `.github/workflows/deploy.yml`, and create a GitHub workflow for deploying your project. It should include a set of `on` events, including _at least_ `repository_dispatch`, but probably `push` and maybe `schedule` as well. Add a step for publishing your project using [wrangler-action](https://github.com/cloudflare/wrangler-action):

```yaml
name: Build
on:
  push:
  pull_request:
  repository_dispatch:
deploy:
  runs-on: ubuntu-latest
  timeout-minutes: 60
  needs: test
  steps:
    - uses: actions/checkout@v2
    - name: Publish
      uses: cloudflare/wrangler-action@1.2.0
```

2. **Add support for `CF_API_TOKEN` and `CF_ACCOUNT_ID` in your workflow**:

```yaml
# Update "Publish" step from last code snippet
- name: Publish
  uses: cloudflare/wrangler-action@1.2.0
  with:
    apiToken: ${{ secrets.CF_API_TOKEN }}
  env:
    CF_ACCOUNT_ID: ${{ secrets.CF_ACCOUNT_ID }}
```

3. **Add the Markdown code for your button to your project's README, replacing the example `url` parameter with your repository URL.**

```md
[![Deploy to Cloudflare Workers](https://deploy-to-cf-workers.signalnerve.workers.dev/button)](https://deploy-to-cf-workers.signalnerve.workers.dev/?url=https://github.com/YOURUSERNAME/YOURREPO)
```

[![Deploy to Cloudflare Workers](https://deploy-to-cf-workers.signalnerve.workers.dev/button)](https://deploy-to-cf-workers.signalnerve.workers.dev/button)

**Does your project use Workers KV or other features only available in the Workers unlimited plan?** Providing the `paid=true` query parameter to the `/button` and the deploy application paths will render a "Deploy to Workers Unlimited" button, as seen below -- it will also render a notice in the UI that the project requires Workers Unlimited:

```md
[![Deploy to Cloudflare Workers](https://deploy-to-cf-workers.signalnerve.workers.dev/button?paid=true)](https://deploy-to-cf-workers.signalnerve.workers.dev/?url=https://github.com/YOURUSERNAME/YOURREPO&paid=true)
```

[![Deploy to Cloudflare Workers](https://deploy-to-cf-workers.signalnerve.workers.dev/button?paid=true)](https://deploy-to-cf-workers.signalnerve.workers.dev/?url=https://github.com/YOURUSERNAME/YOURREPO&paid=true)