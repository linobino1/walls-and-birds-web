import { json, type LoaderFunctionArgs } from "@remix-run/node";
import Layout from "~/components/Layout";
import classes from "./index.module.css";
import { useLoaderData } from "@remix-run/react";
import { Shows } from "~/components/Shows";

export const loader = async ({ context: { payload } }: LoaderFunctionArgs) => {
  // today, 00:00:00
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const shows = await payload.find({
    collection: "shows",
    sort: "-date",
    pagination: false,
    where: {
      date: {
        less_than: today,
      },
    },
  });

  return json({ shows }, { status: 200 });
};

export default function Info() {
  const { shows } = useLoaderData<typeof loader>();
  return (
    <Layout type="white" className={classes.container}>
      <h1>
        <div>Walls & Birds</div>
        <div>Past Shows</div>
      </h1>

      <Shows shows={shows} />
    </Layout>
  );
}
