import type { ActionFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json, NavLink, useLoaderData, useFetcher } from "@remix-run/react";
import classes from "./index.module.css";
import { Shows } from "~/components/Shows";
import Layout from "~/components/Layout";
import Turnstile from "react-turnstile";
import { useEffect, useRef, useState } from "react";
import environment from "~/util/environment";
import SocialIcons from "~/components/SocialIcons";

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

const validateCaptcha = async (token: string): Promise<boolean> => {
  try {
    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          secret: process.env.TURNSTILE_SECRET_KEY,
          sitekey: process.env.TURNSTILE_SITE_KEY,
          response: token,
        }),
      }
    );
    const data = await res.json();
    return !!data.success;
  } catch (error) {
    return false;
  }
};

export const action: ActionFunction = async ({ request }) => {
  const data = await request.formData();

  // validate captcha
  if (!(await validateCaptcha(data.get("cf-turnstile-response") as string))) {
    return json({
      success: false,
      message: `The humanity checks could not be validated on the server. Sorry, please try again.`,
    });
  }

  // wake listmonk up, otherwise the first request will fail
  await fetch(`${process.env.LISTMONK_API}`, {
    method: "head",
  });
  await new Promise((resolve) => setTimeout(resolve, 500));

  let res = await fetch(`${process.env.LISTMONK_API}/public/subscription`, {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({
      email: data.get("email"),
      list_uuids: [process.env.LISTMONK_LIST_ID],
    }),
  });

  if (res.ok) {
    return json({
      success: true,
      message: `Thanks for signing up! Check your inbox/spam for an email with the confirmation link.`,
      original_response: res.json(),
    });
  } else {
    return json({
      success: false,
      message: `We couldn't sign you up. Please try again.`,
      original_response: res.json(),
    });
  }
};

export default function Index() {
  const { shows } = useLoaderData<typeof loader>();
  const fetcher = useFetcher<typeof action>();
  const [isActive, setIsActive] = useState(false);
  // const [captchaCleared, setCaptchaCleared] = useState(false);
  const [captchaState, setCaptchaState] = useState<
    "checking" | "verified" | "error"
  >("checking");
  const form = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (fetcher.data?.success) {
      form.current?.reset();
      isActive && setIsActive(false);
    }
  }, [fetcher.data, isActive]);

  return (
    <Layout className={classes.container}>
      <h1>Walls & Birds</h1>
      <h2 className={classes.tour}>tour dates</h2>
      <Shows shows={shows} className={classes.shows} />

      <hr />
      <h2>email newsletter</h2>
      <div
        className={`${classes.newsletter} ${isActive ? classes.active : ""}`}
      >
        {isActive && (
          <div
            className={classes.newsletterBackdrop}
            onClick={() => setIsActive(false)}
          />
        )}
        <fetcher.Form
          ref={form}
          method="post"
          aria-hidden={fetcher.data?.success}
          className={fetcher.state !== "idle" ? classes.loading : ""}
        >
          <fieldset disabled={fetcher.state !== "idle"}>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="sign@me.up"
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
            className={classes.controls}
            style={{ display: isActive ? "block" : "none" }}
          >
            {isActive && (
              <Turnstile
                sitekey={environment().TURNSTILE_SITE_KEY}
                execution="render"
                onVerify={() => setCaptchaState("verified")}
                onError={() => setCaptchaState("error")}
              />
            )}
            <p
              className={classes.error}
              aria-hidden={fetcher.data?.success !== false}
            >
              {fetcher.data?.message ||
                "We couldn't sign you up. Please try again."}
            </p>
            <p className={classes.captchaState}>
              {captchaState === "checking" &&
                "we're checking if you are human..."}
              {captchaState === "verified" && "all checks passed"}
              {captchaState === "error" &&
                "It seems like you are a bot, please try again."}
            </p>
            <button
              className={classes.submit}
              type="submit"
              aria-label="sign up for our newsletter"
              disabled={captchaState !== "verified"}
            >
              sign me up
            </button>
          </div>
        </fetcher.Form>
        <p className={classes.success} aria-hidden={!fetcher.data?.success}>
          {fetcher.data?.message}
        </p>
      </div>

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
