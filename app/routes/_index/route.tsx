import type { LoaderFunctionArgs } from "@remix-run/node";
import { json, NavLink, useLoaderData } from "@remix-run/react";
import classes from "./index.module.css";
import { Shows } from "~/components/Shows";
import Layout from "~/components/Layout";
import SocialIcons from "~/components/SocialIcons";
import NewsletterSignup from "~/components/NewsletterSignup";

export const loader = async ({ context: { payload } }: LoaderFunctionArgs) => {
  // today, 00:00:00
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const shows = await payload.find({
    collection: "shows",
    sort: "date",
    where: {
      date: {
        greater_than_equal: today,
      },
    },
  });
  return json({ shows }, { status: 200 });
};

export default function Index() {
  const { shows } = useLoaderData<typeof loader>();

  return (
    <Layout className={classes.container}>
      <h1>Walls & Birds</h1>
      <h2 className={classes.tour}>tour dates</h2>
      <Shows shows={shows} className={classes.shows} />

      <hr />
      <h2>email newsletter</h2>
      <NewsletterSignup />

      <hr />
      <h2>
        <a
          href="https://wallsandbirds.bandcamp.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          shop ↗
        </a>
      </h2>
      <hr />
      <SocialIcons />
      <hr />
      <nav className={classes.nav}>
        <a href="mailto:judy@wallsandbirds.com">contact</a>
        <NavLink to="/faq" prefetch="intent">
          faq
        </NavLink>
        <NavLink prefetch="intent" to="/songbook">
          songbook
        </NavLink>
      </nav>
    </Layout>
  );
}
