import React from "react";
import url from "url";

/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// You can delete this file if you're not using it

const SITE_URL = 'https://developers.cloudflare.com';

exports.onRenderBody = (
  { setHeadComponents, pathname = `/` },
) => {
  const siteUrl = SITE_URL.replace(/\/$/, ``)
  const parsed = url.parse(`${siteUrl}${pathname}`)

  parsed.pathname = !parsed.pathname.endsWith('/') ? '/' : parsed.pathname;

  const pageUrl = `${parsed.protocol}//${parsed.host}${parsed.pathname}`;

  setHeadComponents([
    <link
      rel="canonical"
      key={pageUrl}
      href={pageUrl}
      data-baseprotocol={parsed.protocol}
      data-basehost={parsed.host}
    />,
  ])
}
