import {
  type MetaFunction,
  type LinksFunction,
  json,
  type LoaderFunction,
} from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { cssBundleHref } from "@remix-run/css-bundle";
import classes from "./root.module.css";

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  // ...
];

export const meta: MetaFunction = () => [
  { title: "Walls & Birds" },
  { charSet: "utf-8" },
  { name: "viewport", content: "width=device-width, initial-scale=1" },
];

export const loader: LoaderFunction = async () => {
  return json({
    publicKeys: {
      HCAPTCHA_SITE_KEY: process.env.HCAPTCHA_SITE_KEY,
    },
  });
};

export default function App() {
  const { publicKeys } = useLoaderData<typeof loader>();
  return (
    <html lang="en" className={classes.load}>
      <head>
        <Meta />
        <Links />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(publicKeys)}`,
          }}
        />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
