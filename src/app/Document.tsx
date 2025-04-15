import appCss from "@/app.css?url";

/**
 * The `Document` component is the top level component for every page in a
 * Redwood app. It wraps the entire app and is the outermost HTML element.
 *
 * It imports the global CSS file (app.css) and wraps the app in a `<html>`
 * element. It also sets up the `<head>` and `<body>` elements.
 *
 * The `children` prop is the page that Redwood has routed to. It's usually a
 * component that lives in the `src/pages` directory.
 *
 * @param children The page that Redwood has routed to.
 * @returns The top level React component for the page.
 */
export const Document: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>@redwoodjs/starter-minimal</title>
      <script type="module" src="/src/client.tsx"></script>
      <link rel="stylesheet" href={appCss} />
    </head>
    <body>
      <div id="root">{children}</div>
    </body>
  </html>
);
