import environment from "~/util/environment";
import { useEffect, useRef, useState } from "react";
import { action } from "~/routes/newsletter-signup";
import Turnstile from "react-turnstile";
import { useFetcher } from "@remix-run/react";
import classes from "./index.module.css";

const NewsletterSignup = () => {
  const fetcher = useFetcher<typeof action>();
  const [isActive, setIsActive] = useState(false);
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
    <div className={`${classes.container} ${isActive ? classes.active : ""}`}>
      {isActive && (
        <div className={classes.backdrop} onClick={() => setIsActive(false)} />
      )}
      <fetcher.Form
        ref={form}
        action="/newsletter-signup"
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
            {fetcher.state === "idle" ? "sign me up" : "signing you up..."}
          </button>
        </div>
      </fetcher.Form>
      <p className={classes.success} aria-hidden={!fetcher.data?.success}>
        {fetcher.data?.message}
      </p>
    </div>
  );
};
export default NewsletterSignup;
