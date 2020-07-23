
# Start from scratch

To start from scratch to create a Workers Site, follow these steps:

1. Ensure you have the latest version of [Wrangler](/quickstart#installing-the-cli) and Node.js installed. Workers Sites require the Workers [Unlimited plan](https://workers.cloudflare.com/sites#plans).

2. In your terminal run `wrangler generate --site <project-name>`, replacing `<project-name>` with the name of your project. For example, I'll create a project called my-site by running this command:
   ```
   wrangler generate --site my-site
   ```
   This command creates the following:
   - `public`: The static assets for your project. By default it contains an `index.html` and a `favicon.ico`.
   - `workers-site`: The JavaScript for serving your assets. You don't need to edit this- but if you want to see how it works or add more functionality to your Worker, you can edit `workers-site/index.js`.
   - `wrangler.toml`: Your configuration file. You'll configure your account and project information here.

3. Add your `account_id` your `wrangler.toml`. You can find your `account_id` on the right sidebar of the Workers or Overview Dashboard. Note: You may need to scroll down! For more details on finding your `account_id` click [here](/quickstart/#account-id-and-zone-id).

4. You can preview your site by running:
   ```
   wrangler preview --watch
   ```

5. Decide where you'd like to publish your site to: [a workers.dev subdomain](/quickstart#publish-to-workers-dev) or your [personal domain](/quickstart#publish-to-your-domain) registered with Cloudflare.
   Then, update your `wrangler.toml`:
 - **Personal Domain**: Add your `zone_id` and a `route`.

     ```
     zone_id = "42ef.."
     route = "example.com/*"
     ```
   (Note: Check out documentation on [Routes](/about/routes) to configure `route` properly) 
     
 - **workers.dev**: Set `workers_dev`  to true. This is the default. 

     You can learn more about configuring your project [here](/quickstart/#configure).

6. Run:
   ```
   wrangler publish
   ```