import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import classes from "./index.module.css";

export const loader = async ({ context: { payload } }: LoaderFunctionArgs) => {
  const songs = await payload.find({
    collection: "songs",
    sort: "title",
    limit: 500,
  });
  return json({ songs }, { status: 200 });
};

export default function Songbook() {
  const { songs } = useLoaderData<typeof loader>();
  return (
    <ul className={classes.container}>
      {songs.docs.map((song, i) => (
        <li key={i}>
          <a href={`/songbook/${song.slug}`}>{song.title}</a>
        </li>
      ))}
    </ul>
  );
}
