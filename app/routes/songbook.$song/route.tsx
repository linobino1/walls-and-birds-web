import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import classes from "./index.module.css";
import { useRef } from "react";

export const loader = async ({
  context: { payload },
  params,
}: LoaderFunctionArgs) => {
  const song = await payload.find({
    collection: "songs",
    where: {
      slug: {
        equals: params.song,
      },
    },
    limit: 1,
  });

  if (!song.docs.length) throw new Error("Song not found");

  return json({ song: song.docs[0] }, { status: 200 });
};

export default function Song() {
  const { song } = useLoaderData<typeof loader>();
  const transpose = (amount: number) => {};
  const content = useRef<HTMLDivElement>(null);

  return song ? (
    <div className={classes.container}>
      <h2>
        {song.by} - {song.title}
      </h2>
      <p>
        <span>tom: </span>
        <button onClick={() => transpose(-1)}>-</button>
        <span data-transpose>&nbsp;{song.key}&nbsp;</span>
        <button onClick={() => transpose(1)}>+</button>
      </p>

      <br />

      <div ref={content} className={classes.content}>
        {song.content}
      </div>
    </div>
  ) : (
    <div>Not found</div>
  );
}
