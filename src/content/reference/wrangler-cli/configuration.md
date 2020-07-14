
# Configuration

## Background

Your project will need some configuration before you can publish your worker. These values are stored in a `wrangler.toml` file. You will need to manually edit this file to add these values before you can publish.

For all configurable fields, see the [table](#keys) below.

--------------------------------

## Environments

Top level configuration: the configuration values you specify at the top of your `wrangler.toml` will be applied to all environments if not otherwise specified in the environment.

Environment configuration <PropMeta>(optional)</PropMeta>: the configuration values you specify under an `[env.name]` in your `wrangler.toml`

Environments is a feature that allows you to deploy the same project to multiple places under multiple names. These environments are utilized with the `--env` or `-e` flag on the commands that are deploying live Worker scripts:

- `build`
- `preview`
- `publish`

Some environment properties can be [*inherited*](#keys) from the top level configuration, but values in an environment will always override those at the top level. 

## Example

To illustrate how these levels are applied, here is a wrangler.toml using multiple environments:

```toml
# top level configuration
type = "webpack"
name = "my-worker-dev"
account_id = "12345678901234567890"
zone_id = "09876543210987654321"
route = "dev.example.com/*"
kv_namespaces = [
    { binding = "FOO", id = "b941aabb520e61dcaaeaa64b4d8f8358", preview_id = "03c8c8dd3b032b0528f6547d0e1a83f3" },
    { binding = "BAR", id = "90e6f6abd5b4f981c748c532844461ae", preview_id = "e5011a026c5032c09af62c55ecc3f438" }
]

[site]
bucket = "./public"
entry-point = "workers-site"

# environment configuration
[env.staging]
name = "my-worker-staging"
route = "staging.example.com/*"
kv_namespaces = [
    { binding = "FOO", id = "0f2ac74b498b48028cb68387c421e279" },
    { binding = "BAR", id = "068c101e168d03c65bddf4ba75150fb0" }
]

# environment configuration
[env.production]
workers_dev= true
kv_namespaces = [
    { binding = "FOO", id = "0d2ac74b498b48028cb68387c421e233" },
    { binding = "BAR", id = "0d8c101e168d03c65bddf4ba75150f33" }
]
```

<Aside>

__Note:__ Global user was configured with the `wrangler config` command or environment variables.

</Aside>

--------------------------------

## Keys

Keys to configure per project in your `wrangler.toml`.

**Top level only**: required to be configured at the top level of your wrangler.toml only; multiple environments on the same project must share this property

**Inherited** : Can be configured at the top level and/or environment. If the property is defined *only* at the top level, the environment will use the property value from the top level. If the property is defined in the environment, the environment value will override the top level value. 

**Not inherited**: Must be defined for every environment individually. 

| Field name                        | Level                           | Description                                                  | Required      |
| --------------------------------- | ------------------------------- | ------------------------------------------------------------ | ------------- |
| `name`                            | Inherited                       | The name of your Worker script.  If inherited, your environment name with be appended to the top level. | Required      |
| `type`                            | Top level only                  | Specifies how `wrangler build` will build your project. There are currently three options (`webpack`, `javascript`, and `rust`). | Required      |
| `zone_id`                         | Inherited                       | This is the ID of the "zone" or domain you want to run your script on. It can also be specified through the `CF_ZONE_ID` environment variable. | Optional \*   |
| `account_id`                      | Inherited                       | This is the ID of the account associated with your zone. You might have more than one account, so make sure to use the ID of the account associated with the `zone_id` you provide, if you provide one. It can also be specified through the `CF_ACCOUNT_ID` environment variable. | Required      |
| `workers_dev`                     | Inherited, overridden  by route | This is a boolean flag that specifies if your worker will be deployed to your [workers.dev](https://workers.dev) subdomain. If omitted defaults to false. | Optional      |
| `route`                           | Not Inherited                   | This is the route you'd like to use your worker on. You need to include the hostname. Examples: `*example.com/*` `http://example.com/hello` | Optional \*\* |
| `routes`                          | Not Inherited                   | A list of routes you'd like to use your worker on. These follow exactly the same rules a `route`, but you can specify a list of them.<br />`routes = ["http://example.com/hello", "http://example.com/goodbye"]` | Optional \*\* |
| `webpack_config`                  | Inherited                       | This is the path to a custom webpack configuration file for your worker. You must specify this field to use a custom webpack configuration, otherwise Wrangler will use a default configuration for you. You can read more [here](/tooling/wrangler/webpack). | Optional      |
| [`vars`](#vars)                   | Not Inherited                   | An object containing text variables that can be directly accessed in a Worker script. See [environment variables](TODO:link). | Optional      |
| [`kv_namespaces`](#kv_namespaces) | Not Inherited                   | These specify any [Workers KV](/reference/storage/) Namespaces you want to access from inside your Worker. | Optional      |
| [`site`](#site)                   | Not Inherited                   | Determines the local folder to upload and serve from a Worker | Optional      |

\* This key is optional if you are using only a [workers.dev](https://workers.dev) subdomain.

\* \*One key of `route`OR `routes` is only if you are not using a [workers.dev](https://workers.dev) subdomain.

### vars

Values to use in your Worker script as a text [environment variable](/reference/apis/environment-variables/).

Usage:

```toml
vars = { FOO = "some value", BAR = "some other string" }
```

| Key            | Value                                        |
| -------------- | -------------------------------------------- |
| `FOO`          | The variable to access in your Worker script |
| `"some value"` | The string value the variable resolves to    |

Note: Using secrets should be handled using [wrangler secret](/tooling/wrangler/secret/). The `vars` definition in your `wrangler.toml` must not contain newlines in order to be valid TOML.

### kv_namespaces

[KV namespaces](/reference/apis/kv) to bind to your Worker and reference in your script.

Usage:

```toml
kv_namespaces = [
    { binding = "FOO", id = "0f2ac74b498b48028cb68387c421e279", preview_id = "6a1ddb03f3ec250963f0a1e46820076f" },
    { binding = "BAR", id = "068c101e168d03c65bddf4ba75150fb0", preview_id = "fb69528dbc7336525313f2e8c3b17db0" }
]
```

| Key       | Value                                                        | Required |
| --------- | ------------------------------------------------------------ | -------- |
| `binding`    | After you've created a namespace, you must bind it to your Worker  so it is accessible from within the Worker script via a variable name you specify. | Yes      |
| `id`         | The ID of the namespace you wish to bind to the Worker's global scope when it is deployed    | Yes, for `wrangler publish`      |
| `preview_id` | The ID of the namespace you wish to bind to the Worker's global scope when it is previewed | Yes, for `wrangler dev` and `wrangler preview` |

Note: Creating your KV Namespaces can be handled using Wrangler's [KV Commands](/tooling/wrangler/kv_commands).

You can also define your `kv_namespaces` using [alternative TOML syntax](https://github.com/toml-lang/toml#user-content-table).

### site

A [Workers Site](/sites) generated with [`wrangler generate --site`](/tooling/wrangler/commands/#generate) or [`wrangler init --site`](/tooling/wrangler/commands/#init).

Usage:

```toml
[site]
bucket = "./public"
entry-point = "workers-site"
```

| Key           | Value                                                                                                     | Example                          | Required |
| ------------- | --------------------------------------------------------------------------------------------------------- | -------------------------------- | -------- |
| `bucket`      | The directory containing your static assets, path relative to your `wrangler.toml`                        | `bucket = "./public"`            | yes      |
| `entry-point` | The location of your Worker script, default is `workers-site`                                             | `entry-point = "./workers-site"` | no       |
| `include`     | A list of gitignore-style patterns for files or directories in `bucket` you exclusively want to upload.   | `include = ["upload_dir"]`       | no       |
| `exclude`     | A list of gitignore-style patterns for files or directories in `bucket` you want to exclude from uploads. | `exclude = ["ignore_dir"]`       | no       |

To learn more about the optional `include` and `exclude` fields, visit [Ignoring Subsets of Static Assets](/tooling/wrangler/sites/#ignoring-subsets-of-static-assets).

You can also define your `site` using [alternative TOML syntax](https://github.com/toml-lang/toml#user-content-inline-table).

#### Storage Limits

For very exceptionally large pages, Workers Sites might not work for you. There is a 10MB limit per page or file. Additionally, Wrangler will create an asset manifest for your files that will count towards your script's size limit. If you have too many files, you may not be able to use Workers Sites.

#### Ignoring Subsets of Static Assets

Workers Sites require [Wrangler](https://github.com/cloudflare/wrangler) - make sure to be on the [latest version](/quickstart/#updating-the-cli) - and the Workers [Unlimited plan](https://workers.cloudflare.com/sites#plans).

There are cases where users may not want to upload certain static assets to their Workers Sites.
In this case, Workers Sites can also be configured to ignore certain files or directories using logic
similar to [Cargo's optional include and exclude fields](https://doc.rust-lang.org/cargo/reference/manifest.html#the-exclude-and-include-fields-optional).
This means that we use gitignore semantics when declaring which directory entries to include or ignore in uploads.

#### Exclusively including files/directories

If you want to include only a certain set of files or directories in your `bucket`, you can add an `include` field to your
`[site]` section of `wrangler.toml`:

```toml
[site]
bucket = "./public"
entry-point = "workers-site"
include = ["included_dir"] # must be an array.
```

Wrangler will only upload files or directories matching the patterns in the `include` array.

#### Excluding files/directories

If you want to exclude files or directories in your `bucket`, you can add an `exclude` field to your
`[site]` section of `wrangler.toml`:

```toml
[site]
bucket = "./public"
entry-point = "workers-site"
exclude = ["excluded_dir"] # must be an array.
```

Wrangler will ignore files or directories matching the patterns in the `exclude` array when uploading assets to Workers KV.

#### Include > Exclude

If you provide both `include` and `exclude` fields, the `include` field will be used and the `exclude` field will be ignored.

#### Default ignored entries

Wrangler will always ignore:

- `node_modules`
- Hidden files and directories
- Symlinks

#### More about include/exclude patterns

You can learn more about the standard patterns used for include and exclude in the [gitignore documentation](https://git-scm.com/docs/gitignore).

#### Customizing your Build

Workers Sites projects use webpack by default. You can [bring your own webpack config](/tooling/wrangler/webpack/#using-with-workers-sites), however it is important to be cognizant of your `entry` and `context` settings.
