import { json, type LoaderFunctionArgs } from "@remix-run/node";
import {
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import classes from "./index.module.css";
import { useRef, useState } from "react";
import { transposeChord, transposeMap } from "./util";

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

  if (!song.docs.length) throw new Response("Song not found", { status: 404 });

  return json({ song: song.docs[0] }, { status: 200 });
};

export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <p>Sorry, we couldn't find that song.</p>
      </div>
    );
  }
}

export default function Song() {
  const { song } = useLoaderData<typeof loader>();
  const content = useRef<HTMLDivElement>(null);

  // Transpose logic
  const [key, setKey] = useState(song?.key || "C ");
  const transpose = (steps: number) => {
    // HACK: "A" is not valid chord, but "A " is
    // reason: we need to parse the song content to find chords, and we don't want to replace all "A" letters in the song
    setKey(transposeChord(`${key.trim()} `, steps));

    if (content.current?.innerHTML) {
      content.current.innerHTML = content.current.innerHTML.replace(
        new RegExp(Object.keys(transposeMap).join("|"), "g"),
        (matched) => transposeMap[matched] as string
      );
    }
  };

  return song ? (
    <div className={classes.container}>
      <h2>
        {song.by} - {song.title}
      </h2>
      <p>
        tom: <button onClick={() => transpose(-1)}>-</button> {key.trim()}{" "}
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
