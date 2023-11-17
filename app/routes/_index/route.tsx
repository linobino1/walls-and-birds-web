import type { ActionFunction, LoaderFunctionArgs } from "@remix-run/node";
import {
  Form,
  Link,
  useActionData,
  useLoaderData,
  useNavigation,
} from "@remix-run/react";
import { json } from "@remix-run/server-runtime";
import classes from "./index.module.css";
import { Shows } from "~/components/Shows";
import { AutoWidthInput } from "~/components/AutoWidthInput";
import Layout from "~/components/Layout";

export const loader = async ({ context: { payload } }: LoaderFunctionArgs) => {
  const shows = await payload.find({
    collection: "shows",
    sort: "-date",
    where: {
      date: {
        greater_than_equal: new Date(),
      },
    },
  });
  return json({ shows }, { status: 200 });
};

export const action: ActionFunction = async ({ context, request }) => {
  const email = (await request.formData()).get("email");

  let res = await fetch(`${process.env.LISTMONK_API}/public/subscription`, {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({
      email,
      list_uuids: [process.env.LISTMONK_LIST_ID],
    }),
  });

  if (res.ok) {
    return json({
      message: `Thanks for signing up! Check your email for a confirmation link.`,
      original_response: res.json(),
    });
  } else {
    return json({
      error: true,
      message: `We couldn't sign you up. Please try again.`,
      original_response: res.json(),
    });
  }
};

export default function Index() {
  const { shows } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const state: "idle" | "loading" | "error" | "success" =
    navigation.state === "submitting"
      ? "loading"
      : actionData?.error
      ? "error"
      : actionData?.message
      ? "success"
      : "idle";

  return (
    <Layout className={classes.container}>
      <h1>Walls & Birds</h1>
      <a
        href="https://wallsandbirds.bandcamp.com"
        rel="noopener noreferrer"
        target="_blank"
      >
        albums
      </a>
      <a
        href="https://www.youtube.com/@wallsandbirds"
        rel="noopener noreferrer"
        target="_blank"
      >
        music videos
      </a>
      <a
        href="https://soundcloud.com/wallsandbirds"
        rel="noopener noreferrer"
        target="_blank"
      >
        outtakes
      </a>

      <div className={classes.newsletter}>
        <Form
          method="post"
          aria-hidden={state === "success"}
          className={state === "loading" ? classes.loading : ""}
        >
          <h2>newsletter:</h2>
          <fieldset disabled={state === "loading"}>
            <AutoWidthInput
              id="email"
              name="email"
              type="email"
              placeholder="email*"
              aria-label="your email address"
            />
            <button type="submit" aria-label="sign up for our newsletter">
              &crarr;
            </button>
          </fieldset>
        </Form>
        <p className={classes.error} aria-hidden={state !== "error"}>
          {actionData?.message || "We couldn't sign you up. Please try again."}
        </p>
        <p className={classes.success} aria-hidden={state !== "success"}>
          {actionData?.message}
        </p>
      </div>

      <hr />

      <h2>live</h2>
      <Shows shows={shows} className={classes.shows} />
      <hr />
      <a href="mailto:judy@wallsandbirds.com">contact</a>
      <Link to="/faq">faq</Link>
      <Link to="/songbook">songbook</Link>
      <iframe
        title="firetruck"
        className={classes.old}
        src="https://firetruck.wallsandbirds.com"
        width="300px"
        height="400px"
      />
    </Layout>
  );
}
