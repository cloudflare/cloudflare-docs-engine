import React from "react"

const DocsMobileHeader = () => (
  <div className="DocsMobileHeader">
    <a className="DocsMobileHeader--cloudflare-logo-link Link Link-without-underline" href="./"> {/* TODO - href */}
      <div className="DocsNavLogoLockup">
        <div className="DocsNavLogoLockup--logo">
          {/* TODO - make a logo component */}
          <svg id="CloudflareDocsMobileLogomark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 24" role="img" aria-labelledby="CloudflareDocsMobileLogomark--title CloudflareDocsMobileLogomark--desc" fill="currentColor">
            <defs>
              <title id="CloudflareDocsMobileLogomark--title">Cloudflare docs logomark</title>
              <desc id="CloudflareDocsMobileLogomark--desc">The logo for Cloudflare used in the Cloudflare’s developer documentation.</desc>
            </defs>
            <path d="M32.616 21.842c.282-1.007.174-1.93-.295-2.616-.429-.63-1.153-.994-2.024-1.036l-16.505-.223a.302.302 0 01-.255-.14.4.4 0 01-.04-.308.456.456 0 01.389-.308l16.652-.224c1.97-.098 4.116-1.763 4.867-3.805l.952-2.588a.578.578 0 00.027-.336C35.31 5.193 30.98 1.416 25.805 1.416c-4.773 0-8.822 3.218-10.27 7.68a4.779 4.779 0 00-3.42-.993c-2.292.238-4.129 2.155-4.357 4.547a5.567 5.567 0 00.121 1.777c-3.74.112-6.73 3.302-6.73 7.233 0 .35.026.7.067 1.05.026.167.16.293.321.293H32a.417.417 0 00.39-.308l.227-.853zM37.872 10.804c-.148 0-.309 0-.456.013-.107 0-.201.084-.241.196l-.644 2.337c-.282 1.007-.174 1.93.295 2.616.429.63 1.153.993 2.025 1.035l3.512.224c.108 0 .201.056.255.14.054.084.067.21.04.308a.456.456 0 01-.389.308l-3.66.223c-1.984.098-4.116 1.763-4.867 3.806l-.268.713c-.054.14.04.28.188.28h12.576a.332.332 0 00.322-.252 9.952 9.952 0 00.335-2.546c0-5.176-4.049-9.401-9.023-9.401"/>
          </svg>
        </div>
        <span className="DocsNavLogoLockup--text">
          <span data-text="Cloudflare">Cloudflare</span>&nbsp;
          <span data-text="Docs">Docs</span>
        </span>
      </div>
    </a>
  </div>
)

export default DocsMobileHeader
