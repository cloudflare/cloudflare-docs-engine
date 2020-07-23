# Commands

Complete list of all commands available for [`wrangler`](https://github.com/cloudflare/wrangler), the Workers CLI.

--------------------------------

## generate

Scaffold a Cloudflare Workers project from a public GitHub repository.

```sh
$ wrangler generate [$NAME] [$TEMPLATE] [--type=$TYPE] [--site]
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

--------------------------------

## init

Creates a skeleton `wrangler.toml` in an existing directory. This can be used as an alternative to `generate` if you prefer to clone a template repository yourself, or you already have a JavaScript project and you'd like to use Wrangler.

```sh
$ wrangler init [$NAME] [--type=$TYPE] [--site]
```

<Definitions>

- `$NAME` <Type>default="name of working directory"</Type> <PropMeta>optional</PropMeta>
  - Name of Worker

- `--type` <Type>default="webpack"</Type> <PropMeta>optional</PropMeta>
  - Type of project. Acceptable values:"webpack", "javascript", or "rust"

- `--site` <Type>default=n/a</Type> <PropMeta>optional</PropMeta>
  - Initializes the project to a Workers site.

</Definitions>

--------------------------------

## build

Build your project. This command looks at your `wrangler.toml` file and runs the build steps associated
with the`"type"` declared in your `wrangler.toml`.

```sh
$ wrangler build [--env $ENVIRONMENT_NAME]
```

<Definitions>

- `--env` <PropMeta>optional</PropMeta>
  - Perform on a specific environment specified as `$ENVIRONMENT_NAME`

</Definitions>

--------------------------------

## config

Configure your global Cloudflare user. This is an interactive command that will prompt you for your API token.

```sh
$ wrangler config [--api-key]
```

<Definitions>

- `--api-key` <PropMeta>optional</PropMeta>
  - To provide your email and global API key (this is not recommended for security reasons) instead of a token.

</Definitions>

You can also use environment variables to authenticate.

## publish

Publish your Worker to Cloudflare. Several keys in your `wrangler.toml` determine whether you are publishing to a workers.dev subdomain or your own registered domain, proxied through Cloudflare.

```sh
$ wrangler publish [--env $ENVIRONMENT_NAME]
```

<Definitions>

- `--env` <PropMeta>optional</PropMeta>
  - Perform on a specific environment specified as `$ENVIRONMENT_NAME`

</Definitions>

To use this command, the following fields are required in your `wrangler.toml`.

<Definitions>

- `name` <Type>string</Type>
  - Name of your Worker, e.g. `name = "your-worker"`.

- `type` <Type>string</Type>
  - Type of project. Acceptable values:"webpack", "javascript", or "rust", e.g. `type="webpack"`.

- `account_id` <Type>string</Type>
  - Your Cloudflare account ID. This can be found in the Cloudflare dashboard, e.g. `account_id="a655bacaf2b4cad0e2b51c5236a6b974"`.

</Definitions>

From here, you have two options, you can choose to publish to your own domain or you can choose to publish to [\<your-worker\>.\<your-subdomain\>.workers.dev](https://workers.dev).

### Publishing to workers.dev

If you want to publish to [workers.dev](https://workers.dev), you will first need to have a subdomain registered. You can register a subdomain by executing the [subdomain](#subdomain) command.

After you have registered a subdomain, add `workers_dev` to your `wrangler.toml`.

<Definitions>

  - `workers_dev` <Type>bool</Type>
    - Indicates if deploying to a workers.dev domain, e.g. `workers_dev = true`.

</Definitions>

### Publishing to your own domain

If you would like to publish to your own domain, you will need to specify these three fields in your `wrangler.toml`.

<Definitions>

- `zone_id` <Type>string</Type>
  - Your Cloudflare zone ID, e.g. `zone_id = "b6558acaf2b4cad1f2b51c5236a6b972"`.

- `route` <Type>string</Type>
  - The route you would like to publish to, e.g. `route = "example.com/my-worker/*"`.

- `routes` <Type>Array</Type>
  - The routes you would like to publish to, e.g. `routes = ["example.com/foo/*", example.com/bar/*]`.

</Definitions>

<Aside>

Make sure to use only `route` or `routes`, not both.

</Aside>

<Aside>

__Note:__ Your Cloudflare Zone ID can be found in the [Cloudflare dashboard](https://dash.cloudflare.com).

</Aside>

### Publishing the same code to multiple places

If you would like to be able to publish your code to multiple places, please see the documentation for environments.
## dev (alpha)

<Aside type="warning">

__Note:__ This feature is still in alpha! The way this tool works in the future _will_ change, _**proceed with caution**_.

</Aside>

### Usage

`wrangler dev` will start a server on `localhost` that connects to Cloudflare's servers and executes your Worker on incoming HTTP requests. After starting `wrangler dev` in a directory with a project, you can send it HTTP requests to test your Worker with clients such as cURL, Postman, or your browser.

You should run `wrangler dev` from your Worker directory, and if your Worker makes any requests to a backend, you should specify the host with `--host example.com`.

From here you can send HTTP requests to `localhost:8787` and your Worker should execute as expected. You will also see console.log messages and exceptions appearing in your terminal. If either of these things _don't_ happen, or you think the output is incorrect, please [file an issue](https://github.com/cloudflare/wrangler).

If you have feedback about `wrangler dev` or general questions, we will respond [here](https://github.com/cloudflare/wrangler/issues/1047).

### kv_namespaces

If you are using [kv_namespaces](/reference/wrangler-cli/configuration#kv_namespaces) with `wrangler dev`, you will need to specify a `preview_id` in your `wrangler.toml` before you can start the session. This is so that you do not accidentally write changes to your production namespace while you are developing. You may make `preview_id` equal to `id` if you would like to preview with your production namespace, but you should make sure that you are not writing things to KV that would break your production Worker.

--------------------------------

## tail

Starts a log tailing session for a deployed Worker.

```sh
$ wrangler tail [--port  $PORT] [--metrics-port $PORT]
```

<Definitions>

  - `--port $PORT` <Type>int</Type>
    - The port for your local log server

  - `--metrics-port $PORT` <Type>int</Type>
    - The port for serving [metrics information](https://developers.cloudflare.com/argo-tunnel/reference/arguments/#metrics) about the tunnel

</Definitions>

After starting `wrangler tail` in a directory with a project, you will receive a live feed of console and exception logs for each request your Worker receives.

Like all Wrangler commands, run `wrangler tail` from your Worker's root directory (i.e. the directory with your `wrangler.toml`).

### Dependencies

Wrangler tail uses cloudflared under the hood. If you are already using cloudflared, be sure you have installed the latest version. Otherwise, follow the [getting started guide](https://developers.cloudflare.com/argo-tunnel/quickstart/) for Argo Tunnel.
`wrangler tail` will register a tailing session for your Worker, and start a server on `localhost` with a [tunnel](https://developers.cloudflare.com/argo-tunnel/quickstart/) that listens for incoming log requests from your Worker.

--------------------------------

## preview

Preview your project using the [Cloudflare Workers preview service](https://cloudflareworkers.com/).

```sh
$ wrangler preview [--watch] [--env $ENVIRONMENT_NAME] [ --url $URL] [$METHOD] [$BODY]
```

<Definitions>

  - `--env` <Type>default="top lvl env"</Type> <PropMeta>optional</PropMeta>
    - Perform on a specific environment specified as `$ENVIRONMENT_NAME`.

  - `--watch` <PropMeta>recommended</PropMeta>
    - Enable live preview, so on changes Wrangler will continually update the preview service with the newest version of your project. By default, `wrangler preview` will only bundle your project a single time.

  - `$METHOD` <Type>default="GET"</Type> <PropMeta>optional</PropMeta>
    - Type of request to preview your worker with (get, post)

  - `$BODY` <Type>default="Null"</Type> <PropMeta>optional</PropMeta>
    - Body string to post to your preview worker request. For example `wrangler preview post hello=hello`

</Definitions>

### kv_namespaces

If you are using [kv_namespaces](/reference/wrangler-cli/configuration#kv_namespaces) with `wrangler preview`, you will need to specify a `preview_id` in your `wrangler.toml` before you can start the session. This is so that you do not accidentally write changes to your production namespace while you are developing. You may make `preview_id` equal to `id` if you would like to preview with your production namespace, but you should make sure that you are not writing things to KV that would break your production Worker.

### Previewing on Windows Subsystem for Linux (WSL 1/2)

#### Setting \$BROWSER to your browser binary

WSL is a Linux environment, so `wrangler` attempts to invoke `xdg-open` in order to open your browser. To make `wrangler preview` work with WSL, you should set your `$BROWSER` to the path of your browser binary.

eg. `$ export BROWSER='/mnt/c/tools/firefox.exe'`
Spaces in filepaths are not common in Linux, and some programs like `xdg-open` break on [paths with spaces](https://github.com/microsoft/WSL/issues/3632#issuecomment-432821522). You can work around this by linking the binary to your `/usr/local/bin` eg:

```sh
$ ln -s '/mnt/c/Program Files/Mozilla Firefox/firefox.exe' firefox
$ export BROWSER=firefox
```

#### Setting \$BROWSER to `wsl-open`

Another option is to install [wsl-open](https://github.com/4U6U57/wsl-open#standalone) and set the `$BROWSER` env variable to `wsl-open`, via `wsl-open -w`. This ensures that `xdg-open` uses `wsl-open` when it attempts to open your browser.

If you're using WSL 2, you will need to install `wsl-open` via their [standalone method](https://github.com/4U6U57/wsl-open#standalone) rather than through `npm`. This is because their npm package has not yet been updated with WSL 2 support.

--------------------------------

## `route`

List or delete a route associated with a zone:

```sh
$ wrangler route list [--env $ENVIRONMENT_NAME]
```

<Definitions>

  - `--env` <Type>default="top lvl env"</Type> <PropMeta>optional</PropMeta>
    - Perform on a specific environment specified as `$ENVIRONMENT_NAME`.

</Definitions>

Will return a json response from the [List Routes API](https://api.cloudflare.com/#worker-routes-list-routes). Each entry includes the route id, pattern, and associated Worker name for a route. Piping this through a tool such as `jq` will pretty up the output.

```sh
$ wrangler route delete $ID [--env $ENVIRONMENT_NAME]
```

<Definitions>

  - `--env` <Type>default="top lvl env"</Type> <PropMeta>optional</PropMeta>
    - Perform on a specific environment specified as `$ENVIRONMENT_NAME`.
  - `$ID` <PropMeta>required</PropMeta>
    - The hash of the route ID to delete

</Definitions>

--------------------------------

## subdomain

Create or change your [workers.dev](https://workers.dev) subdomain.

```sh
$ wrangler subdomain <name>
```

--------------------------------

## secret

Interact with your secrets.

### `put`

Interactive command to create or replace a secret

```sh
$ wrangler secret put <name> --env ENVIRONMENT_NAME
Enter the secret text you'd like assigned to the variable name on the script named my-worker-ENVIRONMENT_NAME:
```

<Definitions>

  - `name`
    - The variable name to be accessible in the script
  - `--env` <PropMeta>optional</PropMeta>
    - Binds the secret to the script of the specific environment

</Definitions>

### `delete`

Interactive command to delete a secret from a specific script

```sh
$ wrangler secret delete <name> --env ENVIRONMENT_NAME
```

<Definitions>

  - `name`
    - The variable name to be accessible in the script
  - `--env` <PropMeta>optional</PropMeta>
    - Binds the secret to the script of the specific environment

</Definitions>

### `list`

List all the secret names bound to a specific script

```sh
$ wrangler secret list --env ENVIRONMENT_NAME
```

<Definitions>

  - `--env` <PropMeta>optional</PropMeta>
    - Binds the secret to the script of the specific environment

</Definitions>

--------------------------------

## kv

Interact with your Cloudflare Workers KV store.

If you've already selected a workers.dev subdomain, running `wrangler subdomain <name>` will update all your currently running Workers to run on the new subdomain (e.g. `hello.world.workers.dev` will now run on `hello.new-world.workers.dev`).

<Definitions>

  - `$NAME`
    - Name of the workers.dev subdomain you wish to deploy to (e.g. `name.workers.dev`)

</Definitions>

### Overview

The `kv` subcommand allows you to store application data in the Cloudflare network to be accessed from Workers, using
[Workers KV](https://www.cloudflare.com/products/workers-kv/).
KV operations are scoped to your account, so in order to use any of these commands, you need to:

* have a Wrangler project set up with your `account_id` configured in the `wrangler.toml`
* call commands from within a Wrangler project directory.

### Getting Started

To use Workers KV with your Worker, the first thing you must do is create a KV namespace. This is done with
the `kv:namespace` subcommand.

The `kv:namespace` subcommand takes as a new binding name as an argument. It will create a Worker KV namespace
whose title is a concatenation of your Worker's name (from `wrangler.toml`) and the binding name you provide:

```sh
$ wrangler kv:namespace create "MY_KV"
🌀  Creating namespace with title "my-site-MY_KV"
✨  Success!
Add the following to your wrangler.toml:
kv_namespaces = [
         { binding = "MY_KV", id = "e29b263ab50e42ce9b637fa8370175e8" }
]
```

Make sure to add the `kv_namespaces` output above to your `wrangler.toml`. You can now
access it from a Worker with code like:

```js
let value = await MY_KV.get("my-key");
```

To put a value to your KV namespace via Wrangler, use the `kv:key put` subcommand.

```sh
$ wrangler kv:key put --binding=MY_KV "key" "value"
✨  Success
```

You can also specify which namespace to put your key-value pair into using `--namespace-id` instead of `--binding`:

```sh
$ wrangler kv:key put --namespace-id=e29b263ab50e42ce9b637fa8370175e8 "key" "value"
✨  Success
```

Additionally, KV namespaces can be used with environments! This is useful for when you have code that refers to
a KV binding like `MY_KV`, and you want to be able to have these bindings point to different namespaces (like
one for staging and one for production). So, if you have a `wrangler.toml` with two environments:

```toml
[env.staging]
kv_namespaces = [
         { binding = "MY_KV", id = "e29b263ab50e42ce9b637fa8370175e8" }
]

[env.production]
kv_namespaces = [
         { binding = "MY_KV", id = "a825455ce00f4f7282403da85269f8ea" }
]
```

To insert a value into a specific KV namespace, you can use

```sh
$ wrangler kv:key put --env=staging --binding=MY_MV "key" "value"
✨  Success
```

Since `--namespace-id` is always unique (unlike binding names), you don't need to pass environment variables for them (they will be unused).

There are way more helpful Wrangler subcommands for interacting with Workers KV, like ones for bulk uploads and deletes--check them out below!

### Concepts

Most `kv` commands require you to specify a namespace. A namespace can be specified in two ways:

1. With a `--binding`:

    ```sh
    $ wrangler kv:key get --binding=MY_KV "my key"
    ```

    - This can be combined with `--preview` flag to interact with a preview namespace instead of a production namespace

1. With a `--namespace_id`:

    ```sh
    $ wrangler kv:key get --namespace-id=06779da6940b431db6e566b4846d64db "my key"
    ```

Most `kv` subcommands also allow you to specify an environment with the optional `--env` flag. This allows you to publish workers running the same code but with different namespaces. For example, you could use separate staging and production namespaces for KV data in your `wrangler.toml`:

```toml
type = "webpack"
name = "my-worker"
account_id = "<account id here>"
route = "staging.example.com/*"
workers_dev = false

kv_namespaces = [
    { binding = "MY_KV", id = "06779da6940b431db6e566b4846d64db" }
]

[env.production]
route = "example.com/*"
kv_namespaces = [
    { binding = "MY_KV", id = "07bc1f3d1f2a4fd8a45a7e026e2681c6" }
]
```

With the wrangler.toml above, you can specify `--env production` when you want to perform a KV action on the namespace `MY_KV` under `env.production`. For example, with the wrangler.toml above, you can get a value out of a production KV instance with:

```sh
$ wrangler kv:key get --binding "MY_KV" --env=production "my key"
```

To learn more about environments, check out the environments documentation.

### `kv:namespace`

#### `create`

Creates a new namespace.

```sh
$ wrangler kv:namespace create $NAME [--env=$ENVIRONMENT_NAME] [--preview]
```

<Definitions>

  - `$NAME`
    - The name of the new namespace

  - `--env` <PropMeta>optional</PropMeta>
    - Perform on a specific environment specified as `$ENVIRONMENT_NAME`.

  - `--preview` <PropMeta>optional</PropMeta>
    - Interact with a preview namespace instead of production.

</Definitions>


##### Usage

```sh
$ wrangler kv:namespace create "MY_KV"
🌀  Creating namespace with title "worker-MY_KV"
✨  Add the following to your wrangler.toml:
kv_namespaces = [
    { binding = "MY_KV", id = "e29b263ab50e42ce9b637fa8370175e8" }
]
```

```sh
$ wrangler kv:namespace create "MY_KV" --preview
🌀  Creating namespace with title "my-site-MY_KV_preview"
✨  Success!
Add the following to your wrangler.toml:
kv_namespaces = [
    { binding = "MY_KV", preview_id = "15137f8edf6c09742227e99b08aaf273" }
]
```

#### `list`

Outputs a list of all KV namespaces associated with your account id.

```sh
$ wrangler kv:namespace list
```

##### Usage
The example below uses the `jq` command line tool to pretty-print output.

```sh
$ wrangler kv:namespace list | jq '.'
[
    {
        "id": "06779da6940b431db6e566b4846d64db",
        "title": "TEST_NAMESPACE"
    },
    {
        "id": "32ac1b3c2ed34ed3b397268817dea9ea",
        "title": "STATIC_CONTENT"
    }
]
```

#### `delete`

Deletes a given namespace.

```sh
$ wrangler kv:namespace delete --binding= [--namespace-id=]
```

<Definitions>

  - `--binding` <PropMeta>required</PropMeta>
    - The name of the namespace to delete.

  - `--namespace-id` <PropMeta>required(if no binding arg)</PropMeta>
    - The id of the namespace to delete.

  - `--env` <PropMeta>optional</PropMeta>
    - Perform on a specific environment specified as `$ENVIRONMENT_NAME`.

  - `--preview` <PropMeta>optional</PropMeta>
    - Interact with a preview namespace instead of production.

</Definitions>

##### Usage

```sh
$ wrangler kv:namespace delete --binding=MY_KV
Are you sure you want to delete namespace f7b02e7fc70443149ac906dd81ec1791? [y/n]
yes
🌀  Deleting namespace f7b02e7fc70443149ac906dd81ec1791
✨  Success
```

```sh
$ wrangler kv:namespace delete --binding=MY_KV --preview
Are you sure you want to delete namespace 15137f8edf6c09742227e99b08aaf273? [y/n]
yes
🌀  Deleting namespace 15137f8edf6c09742227e99b08aaf273
✨  Success
```

#### `kv:key`

#### `put`

Writes a single key/value pair to the given namespace.

```sh
$ wrangler kv:key put --binding= [--namespace-id=] $KEY $VALUE
✨  Success
```

<Definitions>

  - `$KEY` <PropMeta>required</PropMeta>
    - The key to write to.

  - `$VALUE` <PropMeta>required</PropMeta>
    - The value to write.

  - `--binding` <PropMeta>required</PropMeta>
    - The name of the namespace to write to.

  - `--namespace-id` <PropMeta>required(if no binding arg)</PropMeta>
    - The id of the namespace to write to.

  - `--env` <PropMeta>optional</PropMeta>
    - Perform on a specific environment specified as `$ENVIRONMENT_NAME`.

  - `--preview` <PropMeta>optional</PropMeta>
    - Interact with a preview namespace instead of production. Pass this to use your `wrangler.toml`'s `kv_namespaces.preview_id` instead of `kv_namespaces.id`

  - `--ttl` <PropMeta>optional</PropMeta>
    - Number of seconds for which the entries should be visible before they expire. At least 60. Takes precedence over 'expiration' option.

  - `--expiration` <PropMeta>optional</PropMeta>
    - Number of seconds since the UNIX epoch, indicating when the key-value pair should expire.

  - `--path` <PropMeta>optional</PropMeta>
    - Read value from the file at a given path. *This is good for security-sensitive operations, like uploading keys to KV; uploading from a file prevents a key value from being saved in areas like your terminal history.*

</Definitions>

##### Usage

```sh
$ wrangler kv:key put --binding=MY_KV "key" "value"
✨  Success
```

```sh
$ wrangler kv:key put --binding=MY_KV --preview "key" "value"
✨  Success
```

```sh
$ wrangler kv:key put --binding=MY_KV "key" "value" --ttl=10000
✨  Success
```

```sh
$ wrangler kv:key put --binding=MY_KV "key" value.txt --path
✨  Success
```

#### `list`

Outputs a list of all keys in a given namespace.

```sh
$ wrangler kv:key list --binding= [--namespace-id=] [--prefix] [--env]
```

<Definitions>

  - `--binding` <PropMeta>required</PropMeta>
    - The name of the namespace to delete.

  - `--namespace-id` <PropMeta>required(if no binding arg)</PropMeta>
    - The name of the namespace to delete.

  - `--env` <PropMeta>optional</PropMeta>
    - Perform on a specific environment specified as `$ENVIRONMENT_NAME`.

  - `--prefix` <PropMeta>optional</PropMeta>
    - A prefix to filter listed keys.

</Definitions>

##### Usage

The example below uses the `jq` command line tool to pretty-print output.

```sh
$ wrangler kv:key list --binding=MY_KV --prefix="public" | jq '.'
[
    {
        "name": "public_key"
    },
    {
        "name": "public_key_with_expiration",
        "expiration": "2019-09-10T23:18:58Z"
    }
]
```

#### `get`

Reads a single value by key from the given namespace.

```sh
$ wrangler kv:key get --binding= [--env=] [--preview] [--namespace-id=] "$KEY"
```

<Definitions>

  - `$KEY` <PropMeta>required</PropMeta>
    - The key value to get.

  - `--binding` <PropMeta>required</PropMeta>
    - The name of the namespace to get from.

  - `--namespace-id` <PropMeta>required(if no binding arg)</PropMeta>
    - The id of the namespace to get from.

  - `--env` <PropMeta>optional</PropMeta>
    - Perform on a specific environment specified as `$ENVIRONMENT_NAME`.

  - `--preview` <PropMeta>optional</PropMeta>
    - Interact with a preview namespace instead of production. Pass this to use your `wrangler.toml`'s `kv_namespaces.preview_id` instead of `kv_namespaces.id`

</Definitions>

##### Usage

```sh
$ wrangler kv:key get --binding=MY_KV "key"
value
```

#### `delete`

Removes a single key value pair from the given namespace.

```sh
$ wrangler kv:key delete --binding= [--env=] [--preview] [--namespace-id=] "$KEY"
```

<Definitions>

  - `$KEY` <PropMeta>required</PropMeta>
    - The key value to delete.

  - `--binding` <PropMeta>required</PropMeta>
    - The name of the namespace to delete from.

  - `--namespace-id` <PropMeta>required(if no binding arg)</PropMeta>
    - The id of the namespace to delete from.

  - `--env` <PropMeta>optional</PropMeta>
    - Perform on a specific environment specified as `$ENVIRONMENT_NAME`.

  - `--preview` <PropMeta>optional</PropMeta>
    - Interact with a preview namespace instead of production. Pass this to use your `wrangler.toml`'s `kv_namespaces.preview_id` instead of `kv_namespaces.id`

</Definitions>

#### Usage

```sh
$ wrangler kv:key delete --binding=MY_KV "key"
Are you sure you want to delete key "key"? [y/n]
yes
🌀  Deleting key "key"
✨  Success
```

#### `kv:bulk`

#### `put`

Writes a file full of key/value pairs to the given namespace.

```sh
$ wrangler kv:key put --binding= [--env=] [--preview] [--namespace-id=] $FILENAME
```

<Definitions>

  - `$FILENAME` <PropMeta>required</PropMeta>
    - The file to write to the namespace

  - `--binding` <PropMeta>required</PropMeta>
    - The name of the namespace to put to.

  - `--namespace-id` <PropMeta>required(if no binding arg)</PropMeta>
    - The id of the namespace to put to.

  - `--env` <PropMeta>optional</PropMeta>
    - Perform on a specific environment specified as `$ENVIRONMENT_NAME`.

  - `--preview` <PropMeta>optional</PropMeta>
    - Interact with a preview namespace instead of production. Pass this to use your `wrangler.toml`'s `kv_namespaces.preview_id` instead of `kv_namespaces.id`

</Definitions>

 Takes as an argument a JSON file with a list of key-value pairs to upload (see JSON spec above). An example of JSON input:

```json
[
    {
        "key": "test_key",
        "value": "test_value",
        "expiration_ttl": 3600
    }
]
```

The schema below is the full schema for key-value entries uploaded via the bulk API:

<Definitions>

  - `key` <Type>string</Type> <PropMeta>required</PropMeta>
    - A key's name. The name may be at most 512 bytes. All printable, non-whitespace characters are valid.

  - `value` <Type>string</Type> <PropMeta>required</PropMeta>
    - A UTF-8 encoded string to be stored, up to 10 MB in length.

  - `expiration` <Type>int</Type> <PropMeta>optional</PropMeta>
    - The time, measured in number of seconds since the UNIX epoch, at which the key should expire.

  - `expiration_ttl` <Type>int</Type> <PropMeta>optional</PropMeta>
    - The number of seconds for which the key should be visible before it expires. At least 60.

  - `base64` <Type>bool</Type> <PropMeta>optional</PropMeta>
    - Whether or not the server should base64 decode the value before storing it. Useful for writing values that wouldn't otherwise be valid JSON strings, such as images. Defaults to `false`.

</Definitions>

If both `expiration` and `expiration_ttl` are specified for a given key, the API will prefer `expiration_ttl`.

##### Usage

```sh
$ wrangler kv:bulk put --binding=MY_KV allthethingsupload.json
🌀  uploading 1 key value pairs
✨  Success
```

#### `delete`

Deletes all specified keys within a given namespace.

```sh
$ wrangler kv:key delete --binding= [--env=] [--preview] [--namespace-id=] $FILENAME
```

<Definitions>

  - `$FILENAME` <PropMeta>required</PropMeta>
    - The file to write to the namespace

  - `--binding` <PropMeta>required</PropMeta>
    - The name of the namespace to put to.

  - `--namespace-id` <PropMeta>required(if no binding arg)</PropMeta>
    - The id of the namespace to put to.

  - `--env` <PropMeta>optional</PropMeta>
    - Perform on a specific environment specified as `$ENVIRONMENT_NAME`.

  - `--preview` <PropMeta>optional</PropMeta>
    - Interact with a preview namespace instead of production. Pass this to use your `wrangler.toml`'s `kv_namespaces.preview_id` instead of `kv_namespaces.id`

</Definitions>


Takes as an argument a JSON file with a list of key-value pairs to delete (see JSON spec above). An example of JSON input:

```json
[
  {
    "key": "test_key",
    "value": ""
  }
]
```

<Definitions>

  - `key` <Type>string</Type> <PropMeta>required</PropMeta>
    - A key's name. The name may be at most 512 bytes. All printable, non-whitespace characters are valid.

  - `value` <Type>string</Type> <PropMeta>required</PropMeta>
    - A UTF-8 encoded string to be stored, up to 10 MB in length.

</Definitions>

##### Usage

```sh
$ wrangler kv:bulk delete --binding=MY_KV allthethingsdelete.json
Are you sure you want to delete all keys in allthethingsdelete.json? [y/n]
y
🌀  deleting 1 key value pairs
✨  Success
```
