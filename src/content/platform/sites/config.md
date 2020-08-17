
# Config

Workers Sites require the latest version of [Wrangler](https://github.com/cloudflare/wrangler) and the Workers [Bundled plan](https://workers.cloudflare.com/sites#plans).

## Commands

<Definitions>

- `wrangler generate proj --site`
  - Creates a project with a Worker serving a generic HTML file and favicon with the directory structure:

    ```
    ├── public # files to serve
    |  ├── favicon.ico
    |  └── index.html
    ├── workers-site
    |  ├── index.js # Workers script that serves the assets
    |  ├── package-lock.json
    |  └── package.json # defines dependencies used by Workers script
    └── wrangler.toml
    ```

  - Auto-fills `wrangler.toml` with `entry-point` (defaults to `workers-site`) and `bucket` (defaults to `public`).

- `wrangler init proj --site`
  - Creates a `wrangler.toml` and `workers-site` folder. You'll need to add a value for `bucket` based on the local path of folder you'd like to be serve.

</Definitions>

## wrangler.toml

There are a few specific configuration settings for Workers Sites in your `wrangler.toml`:

<TableWrap>

| Key           | Value                                                                              | Example                          | Required |
| ------------- | ---------------------------------------------------------------------------------- | -------------------------------- | -------- |
| `bucket`      | The directory containing your static assets, path relative to your `wrangler.toml` | `bucket = "./public"`            | yes      |
| `entry-point` | The location of your Worker script, default is `workers-site`                      | `entry-point = "./workers-site"` | no       |
| `include`     | A list of gitignore-style patterns for files or directories in `bucket` you exclusively want to upload. | `include = ["upload_dir"]` | no |
| `exclude`     | A list of gitignore-style patterns for files or directories in `bucket` you want to exclude from uploads. | `exclude = ["ignore_dir"]` | no |

</TableWrap>
To learn more about the optional `include` and `exclude` fields, visit [Ignoring Subsets of Static Assets](/tooling/wrangler/sites/#ignoring-subsets-of-static-assets).

_Note: if your project uses [environments](/platform/environments), make sure to place `site` at the top level config._

Example of a `wrangler.toml`:

```toml
account_id = "95e..."
name = "docs-site-blah"
type = "webpack"
workers_dev = false

[site]
bucket = "./public"
entry-point = "workers-site"

[env.production]
name = "docs-site"
route = "https://example.com/docs*"
zone_id = "351c.."
account_id = "b54f07a.."

[env.staging]
zone_id = "ef47a..."
account_id = "95e5d..."
name = "docs-site-staging"
route = "https://staging.example.com/docs*"
```

## Storage Limits

For very exceptionally large pages, Workers Sites might not work for you. There is a 10MB limit per page or file.

## Ignoring Subsets of Static Assets

Workers Sites require [Wrangler](https://github.com/cloudflare/wrangler) - make sure to be on the [latest version](/cli-wrangler/install-update#update) - and the Workers [Bundled plan](https://workers.cloudflare.com/sites#plans).

There are cases where users may not want to upload certain static assets to their Workers Sites.
In this case, Workers Sites can also be configured to ignore certain files or directories using logic
similar to [Cargo's optional include and exclude fields](https://doc.rust-lang.org/cargo/reference/manifest.html#the-exclude-and-include-fields-optional).
This means that we use gitignore semantics when declaring which directory entries to include or ignore in uploads.

### Exclusively including files/directories

If you want to include only a certain set of files or directories in your `bucket`, you can add an `include` field to your
`[site]` section of `wrangler.toml`:

```toml
[site]
bucket = "./public"
entry-point = "workers-site"
include = ["included_dir"] # must be an array.
```

Wrangler will only upload files or directories matching the patterns in the `include` array.

### Excluding files/directories

If you want to exclude files or directories in your `bucket`, you can add an `exclude` field to your
`[site]` section of `wrangler.toml`:

```toml
[site]
bucket = "./public"
entry-point = "workers-site"
exclude = ["excluded_dir"] # must be an array.
```

Wrangler will ignore files or directories matching the patterns in the `exclude` array when uploading assets to Workers KV.

### Include > Exclude

If you provide both `include` and `exclude` fields, the `include` field will be used and the `exclude` field will be ignored.

### Default ignored entries

Wrangler will always ignore:

- `node_modules`
- Hidden files and directories
- Symlinks

#### More about include/exclude patterns

You can learn more about the standard patterns used for include and exclude in the [gitignore documentation](https://git-scm.com/docs/gitignore).

## Customizing your Build

Workers Sites projects use webpack by default. You can [bring your own webpack config](/cli-wrangler/webpack#using-with-workers-sites), however it is important to be cognizant of your `entry` and `context` settings.
