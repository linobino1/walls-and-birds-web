import { ActionFunction, json } from "@remix-run/node";

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
  fetch(`${process.env.LISTMONK_API}`, {
    method: "head",
  });
  await new Promise((resolve) => setTimeout(resolve, 1000));

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
