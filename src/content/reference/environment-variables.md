---
title: "Environment Variables"
weight: 5
---

Environment variables can be managed via wrangler or in the UI, it is recommended to adhere to one method.

# Text

Once a text variable is uploaded via [wrangler](/tooling/wrangler/configuration) or in the UI, the string is exposed on the global namespace as type [`String`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String).

```
if (ENVIRONMENT === "staging") {
  // staging-specific code
} else if (ENVIRONMENT === "production") {
  // production-specific code
}
```

# Secrets

Once a secret is uploaded via [wrangler](/tooling/wrangler/secret) or in the UI, the string is exposed on the global namespace as type [`String`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String).

In the below example, we set the secret `SECRET` using `wrangler secret`, and then use it in our script as part of the `Authorization` header.

Creating the secret using [`wrangler secret`](/tooling/wrangler/secrets):

```bash
wrangler secret put SECRET
Enter the secret text you'd like assigned to the variable name on the script named my-worker-ENVIRONMENT_NAME: mysekret
```

Using the secret inside of your Workers script:

```javascript
let headers = new Headers({ Authorization: SECRET })
```

Limits for environment variables can be seen in the [about section](/about/limits#environment-variables).
