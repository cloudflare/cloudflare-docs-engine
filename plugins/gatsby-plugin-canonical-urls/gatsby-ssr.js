const React = require("react");
const url = require("url");

const SITE_URL = 'https://developers.cloudflare.com';

exports.onRenderBody = (
  { setHeadComponents, pathname = `/` },
) => {
  const siteUrl = SITE_URL.replace(/\/$/, ``)
  const parsed = url.parse(`${siteUrl}${pathname}`)
  
  parsed.pathname += !parsed.pathname.endsWith('/') ? '/' : '';

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
