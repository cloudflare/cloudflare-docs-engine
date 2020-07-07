# Authentication

## Background
In Cloudflare's system, you have a User that can have multiple Accounts and Zones. As a result, your User is configured globally on your machine via a single Cloudflare Token. Your Account(s) and Zone(s) will be configured per project, but will use your Cloudflare Token to authenticate all API calls. A config file is created in a `.wrangler`
directory in your computer's home directory.

--------------------------------

### Using commands

To set up `wrangler` to work with your Cloudflare user, use the following commands:

- 🔧 `config`: a command that prompts you to enter your `email` and `api` key.
- 🕵️‍♀️ `whoami`: run this command to confirm that your configuration is appropriately set up.
  When successful, this command will print out your user information, including the type of plan you
  are currently on.

### Using environment variables

You can also configure your global user with environment variables. This is the preferred method for using Wrangler in CI.

You can deploy with authentication tokens (recommended):

```bash
# e.g.
CF_ACCOUNT_ID=youraccountid
CF_API_TOKEN=superlongapitoken wrangler publish
# where
# $CF_API_TOKEN -> a Cloudflare API token
```

Or you can deploy with your email and your global API key:

```bash
# e.g.
CF_EMAIL=testuser@example.com CF_API_KEY=superlongapikey wrangler publish
# where
# $CF_EMAIL -> your Cloudflare account email
# $CF_API_KEY -> your Cloudflare API key
```

Note environment variables will override whatever credentials you configured in `wrangler config` or in your `wrangler.toml`.

You can also specify or override the Zone ID used by `wrangler publish` with the `CF_ZONE_ID` environment variable.

--------------------------------

## Generate Tokens

### API Token

1. Click **Get your API token** below the _CLI and API_ section to jump to your _Profile_ page.
2. Click **Create Token**. 
3. Under the _API token templates_ section, find the **Edit Cloudflare Workers** template and click **Use template**.
4. Fill out the rest of the fields and then click **Continue to Summary**, where you can click **Create Token** and issue your token for use.

### Global API Key

1. Click **Get your API token** below the _CLI and API_ section to jump to your _Profile_ page.
2. Scroll to _API Keys_, and click **View** to copy your Global API Key **\***.

<Aside>

__IMPORTANT:Treat your Global API Key like a password!__ 
It should not be stored in version control or in your code, use environment variables if possible.

</Aside>