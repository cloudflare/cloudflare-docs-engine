
# Commands

### generate

Scaffold a Cloudflare Workers project from a public GitHub repository.

```bash
wrangler generate [$NAME] [$TEMPLATE] [--type=$TYPE] [--site]
```

<Definitions>

- `$NAME` <Type>default="worker"</Type> <PropMeta>optional</PropMeta>
  - Name of Worker 

- `$TEMPLATE` <Type>default=worker-template</Type> <PropMeta>optional</PropMeta>
  - GitHub URL of the template to base new project off of 

- `--type` <Type>default="webpack"</Type> <PropMeta>optional</PropMeta>
  - Type of project. Acceptable values:"webpack", "javascript", or "rust"
  
- `--site` <Type>default=n/a</Type> <PropMeta>optional</PropMeta>
  - Same of template but based off of default site

</Definitions>

|             |                                                              | Optional | Default value                                                |
| ----------- | ------------------------------------------------------------ | -------- | ------------------------------------------------------------ |
| `$NAME`     | Name of Worker                                               | Optional | "worker"                                                     |
| `$TEMPLATE` | GitHub URL of the template to base new project off of        | Optional | [`worker-template`](https://github.com/cloudflare/worker-template) |
| `--type`    | Type of project. Acceptable values:"webpack", "javascript", or "rust"  | Optional | "webpack"                                                    |
| `--site`    | Same of `template` but based off of default [site template](https://github.com/cloudflare/worker-sites-template) | Optional | N/A                                                          |

### init

Creates a skeleton `wrangler.toml` in an existing directory. This can be used as an alternative to `generate` if you prefer to clone a template repository yourself, or you already have a JavaScript project and you'd like to use Wrangler.

```bash
wrangler init [$NAME] [--type=$TYPE] [--site]
```

|          |                                          | Optional | Default value                 |
| -------- | ---------------------------------------- | -------- | ----------------------------- |
| `$NAME`  | Name of Worker                           | Optional | The name of working directory |
| `--type` | Type of project. Acceptable values:"webpack", "javascript", or "rust"  | Optional | "webpack"                     |
| `--site` | Initiates the project to a Workers site. | Optional | N/A                           |

### build

Build your project. This command looks at your `wrangler.toml` file and runs the build steps associated
with the`"type"` declared in your `wrangler.toml`.

```bash
wrangler build [--env $ENVIRONMENT_NAME]
```

|         |                                                                                                                    | Required |
| ------- | ------------------------------------------------------------------------------------------------------------------ | -------- |
| `--env` | Perform on a specific [environment](/tooling/wrangler/environments) specified as `$ENVIRONMENT_NAME` | Optional |

### config

Configure your global Cloudflare user. This is an interactive command that will prompt you for your API token.

```bash
wrangler config [--api-key]
```

|             |                                                                                                             | Optional |
| ----------- | ----------------------------------------------------------------------------------------------------------- | -------- |
| `--api-key` | To provide your email and global API key (this is not recommended for security reasons) instead of a token. | Optional |

You can also [use environment variables](/tooling/wrangler/configuration/) to authenticate.

### publish

Publish your Worker to Cloudflare. Several keys in your `wrangler.toml` determine whether you are publishing to a workers.dev subdomain or your own registered domain, proxied through Cloudflare.

```bash
wrangler publish [--env $ENVIRONMENT_NAME]
```

|         |                                                              | Required |
| ------- | ------------------------------------------------------------ | -------- |
| `--env` | Perform on a specific [environment](/tooling/wrangler/environments) specified as `$ENVIRONMENT_NAME` | Optional |

To use this command, the following fields are required in your `wrangler.toml`.

| Key          | Value                                                        | Example                                          |
| ------------ | ------------------------------------------------------------ | ------------------------------------------------ |
| `name`       | the name of your worker                                      | `name = "your-worker"`                           |
| `type`       | build type (webpack, rust, or javascript)                    | `type = "webpack"`                               |
| `account_id` | your Cloudflare account ID, this can be found in the Cloudflare dashboard | `account_id = "a655bacaf2b4cad0e2b51c5236a6b974" |

From here, you have two options, you can choose to publish to your own domain or you can choose to publish to [\<your-worker\>.\<your-subdomain\>.workers.dev](https://workers.dev).

#### Publishing to workers.dev

If you want to publish to [workers.dev](https://workers.dev), you will first need to have a subdomain registered. You can register a subdomain by executing the [subdomain](#subdomain) command.

After you have registered a subdomain, add `workers_dev` to your `wrangler.toml`.

| Key           | Value | Example              |
| ------------- | ----- | -------------------- |
| `workers_dev` | true  | `workers_dev = true` |

#### Publishing to your own domain

If you would like to publish to your own domain, you will need to specify these three fields in your `wrangler.toml`.

| Key                 | Value                                     | Example                                                                                           |
| ------------------- | ----------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `zone_id`           | Your Cloudflare zone ID\*                 | `zone_id = "b6558acaf2b4cad1f2b51c5236a6b972"`                                                    |
| `route` OR `routes` | The route(s) you would like to publish to | `route = "example.com/my-worker/*"` or <br /> `routes = ["example.com/foo/*", example.com/bar/*]` |

\*Note: Your Cloudflare Zone ID can be found in the [Cloudflare dashboard](https://dash.cloudflare.com).

#### Publishing the same code to multiple places

If you would like to be able to publish your code to multiple places, please see the documentation for [environments](/tooling/wrangler/environments).

### dev (alpha)

#### Disclaimer

This feature is still in alpha! The way this tool works in the future _will_ change, _**proceed with caution**_.

#### Usage

`wrangler dev` will start a server on `localhost` that connects to Cloudflare's servers and executes your Worker on incoming HTTP requests. After starting `wrangler dev` in a directory with a project, you can send it HTTP requests to test your Worker with clients such as cURL, Postman, or your browser.

You should run `wrangler dev` from your Worker directory, and if your Worker makes any requests to a backend, you should specify the host with `--host example.com`.

From here you can send HTTP requests to `localhost:8787` and your Worker should execute as expected. You will also see console.log messages and exceptions appearing in your terminal. If either of these things _don't_ happen, or you think the output is incorrect, please [file an issue](https://github.com/cloudflare/wrangler).

If you have feedback about `wrangler dev` or general questions, we will respond [here](https://github.com/cloudflare/wrangler/issues/1047).

#### kv_namespaces

If you are using [kv_namespaces](/tooling/wrangler/configuration/#kv_namespaces) with `wrangler dev`, you will need to specify a `preview_id` in your `wrangler.toml` before you can start the session. This is so that you do not accidentally write changes to your production namespace while you are developing. You may make `preview_id` equal to `id` if you would like to preview with your production namespace, but you should make sure that you are not writing things to KV that would break your production Worker.

### tail

Starts a log tailing session for a deployed Worker.

```bash
wrangler tail [--port  $PORT] [--metrics-port $PORT]
```

| Key                    | Value                                                                                                                                   |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `--port $PORT`         | the port for your local log server                                                                                                      |
| `--metrics-port $PORT` | the port for serving [metrics information](https://developers.cloudflare.com/argo-tunnel/reference/arguments/#metrics) about the tunnel |

After starting `wrangler tail` in a directory with a project, you will receive a live feed of console and exception logs for each request your Worker receives.

Like all Wrangler commands, run `wrangler tail` from your Worker's root directory (i.e. the directory with your `wrangler.toml`).

#### Dependencies

Wrangler tail uses cloudflared under the hood. If you are already using cloudflared, be sure you have installed the latest version. Otherwise, follow the [getting started guide](https://developers.cloudflare.com/argo-tunnel/quickstart/) for Argo Tunnel.
`wrangler tail` will register a tailing session for your Worker, and start a server on `localhost` with a [tunnel](https://developers.cloudflare.com/argo-tunnel/quickstart/) that listens for incoming log requests from your Worker.

### preview

Preview your project using the [Cloudflare Workers preview service](https://cloudflareworkers.com/).

```bash
wrangler preview [--watch] [--env $ENVIRONMENT_NAME] [ --url $URL] [$METHOD] [$BODY]
```

|           |                                                              | Optional    | Default value                                                |
| --------- | ------------------------------------------------------------ | ----------- | ------------------------------------------------------------ |
| `--env`   | Perform on a specific [environment](/tooling/wrangler/environments) specified as `$ENVIRONMENT_NAME` | Optional    | The top level environment                                    |
| `--watch` | Enable live preview, so on changes Wrangler will continually update the preview service with the newest version of your project | Recommended | By default, `wrangler preview` will only bundle your project a single time. |
| `$METHOD` | Type of request to preview your worker with (get, post)      | Optional    | GET                                                          |
| `$BODY`   | Body string to post to your preview worker request. For example `wrangler preview post hello=hello` | Optional    | Null    
                                                     |

#### kv_namespaces

If you are using [kv_namespaces](/tooling/wrangler/configuration/#kv_namespaces) with `wrangler preview`, you will need to specify a `preview_id` in your `wrangler.toml` before you can start the session. This is so that you do not accidentally write changes to your production namespace while you are developing. You may make `preview_id` equal to `id` if you would like to preview with your production namespace, but you should make sure that you are not writing things to KV that would break your production Worker.

#### Previewing on Windows Subsystem for Linux (WSL 1/2)

##### Setting \$BROWSER to your browser binary

WSL is a Linux environment, so `wrangler` attempts to invoke `xdg-open` in order to open your browser. To make `wrangler preview` work with WSL, you should set your `$BROWSER` to the path of your browser binary.

eg. `$ export BROWSER='/mnt/c/tools/firefox.exe'`
Spaces in filepaths are not common in Linux, and some programs like `xdg-open` break on [paths with spaces](https://github.com/microsoft/WSL/issues/3632#issuecomment-432821522). You can work around this by linking the binary to your `/usr/local/bin`.

eg. $ ln -s '/mnt/c/Program Files/Mozilla Firefox/firefox.exe' firefox
      $ export BROWSER=firefox

##### Setting \$BROWSER to `wsl-open`

Another option is to install [wsl-open](https://github.com/4U6U57/wsl-open#standalone) and set the `$BROWSER` env variable to `wsl-open`, via `wsl-open -w`. This ensures that `xdg-open` uses `wsl-open` when it attempts to open your browser.

If you're using WSL 2, you will need to install `wsl-open` via their [standalone method](https://github.com/4U6U57/wsl-open#standalone) rather than through `npm`. This is because their npm package has not yet been updated with WSL 2 support.

### ➡️ `route`

List or delete a route associated with a zone:

```bash
wrangler route list [--env $ENVIRONMENT_NAME]
```

|         |                                                              | Optional |
| ------- | ------------------------------------------------------------ | -------- |
| `--env` | Perform on a specific [environment](/tooling/wrangler/environments) specified as `$ENVIRONMENT_NAME` | Optional |

Will return a json response from the [List Routes API](/tooling/api/routes/#list-routes). Each entry includes the route id, pattern, and associated Worker name for a route. Piping this through a tool such as `jq` will pretty up the output.

```bash
wrangler route delete $ID [--env $ENVIRONMENT_NAME]
```

|         |                                                              | Optional |
| ------- | ------------------------------------------------------------ | -------- |
| `--env` | Perform on a specific [environment](/tooling/wrangler/environments) specified as `$ENVIRONMENT_NAME` | Optional |
| \$ID    | The hash of the route ID to delete                           | Required |

### kv

Interact with your Cloudflare Workers KV store. [Check out the docs.](/tooling/wrangler/kv_commands)

### secret

Interact with your secrets. [Check out the docs.](/tooling/wrangler/secrets)

### subdomain

Create or change your [workers.dev](https://workers.dev) subdomain.

```bash
wrangler subdomain <name>
```

|         | Definition                                                   |
| ------- | ------------------------------------------------------------ |
| `$NAME` | Name of the workers.dev subdomain you wish to deploy to (e.g. `name.workers.dev`) |

If you've already selected a workers.dev subdomain, running `wrangler subdomain <name>` will update all your currently running Workers to run on the new subdomain (e.g. `hello.world.workers.dev` will now run on `hello.new-world.workers.dev`).
