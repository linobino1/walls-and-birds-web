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
import Layout from "~/components/Layout";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { useEffect, useRef, useState } from "react";

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

const validateCaptcha = async (token: string): Promise<boolean> => {
  if (process.env.NODE_ENV === "development") {
    console.log("Captcha validation skipped in development mode");
    return true;
  }
  try {
    const res = await fetch("https://hcaptcha.com/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        secret: process.env.HCAPTCHA_SECRET_KEY,
        sitekey: process.env.HCAPTCHA_SITE_KEY,
        response: token,
      }),
    });
    const data = await res.json();
    return !!data.success;
  } catch (error) {
    return false;
  }
};

export const action: ActionFunction = async ({ context, request }) => {
  const data = await request.formData();

  // validate captcha
  if (!(await validateCaptcha(data.get("h-captcha-response") as string))) {
    return json({
      error: true,
      message: `Please confirm the captcha.`,
    });
  }

  const email = data.get("email");

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
  const [isActive, setIsActive] = useState(false);
  const form = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state === "success") {
      form.current?.reset();
      isActive && setIsActive(false);
    }
  }, [state, isActive]);

  useEffect(() => {
    document.body.onclick = (e) => {
      if (!form.current?.contains(e.target as Node)) {
        setIsActive(false);
      }
    };
  }, [isActive]);

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

      <div
        className={`${classes.newsletter} ${isActive ? classes.active : ""}`}
      >
        <Form
          ref={form}
          method="post"
          aria-hidden={state === "success"}
          className={state === "loading" ? classes.loading : ""}
        >
          <h2>newsletter:</h2>
          <fieldset disabled={state === "loading"}>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="email*"
              aria-label="your email address"
              required={true}
              onFocus={() => setIsActive(true)}
            />
            <button
              className={classes.inlineSubmit}
              type="submit"
              aria-label="sign up for our newsletter"
            >
              &crarr;
            </button>
          </fieldset>
          <div
            className={classes.captcha}
            style={{ display: isActive ? "block" : "none" }}
          >
            <HCaptcha
              sitekey={
                (typeof process !== "undefined" ? process : window).env
                  .HCAPTCHA_SITE_KEY
              }
            />
            <p className={classes.error} aria-hidden={state !== "error"}>
              {actionData?.message ||
                "We couldn't sign you up. Please try again."}
              <button onClick={() => setIsActive(false)}>ok</button>
            </p>
            <button
              className={classes.submit}
              type="submit"
              aria-label="sign up for our newsletter"
            >
              sign me up
            </button>
          </div>
        </Form>
        <p className={classes.success} aria-hidden={state !== "success"}>
          {actionData?.message}
        </p>
      </div>

      <hr />

      <h2>live</h2>
      <Shows shows={shows} className={classes.shows} />
      <hr />
      <a href="mailto:judy@wallsandbirds.com">contact</a>
      <Link prefetch="intent" to="/faq">
        faq
      </Link>
      <Link prefetch="intent" to="/songbook">
        songbook
      </Link>
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
