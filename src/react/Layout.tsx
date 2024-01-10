import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="/app.module.css" media="screen" rel="stylesheet" />
        <title>HTMX</title>
      </head>

      <body>
        {children}

        <script src="https://unpkg.com/htmx.org@1.9.5"></script>
        <script src="https://unpkg.com/hyperscript.org@0.9.11"></script>
      </body>
    </html>
  );
}
