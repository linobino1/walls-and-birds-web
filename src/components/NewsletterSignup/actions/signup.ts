'use server'

const validateCaptcha = async (token: string): Promise<boolean> => {
  if (!process.env.TURNSTILE_SECRET_KEY || !process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY) {
    console.error('Turnstile keys are not set in the environment variables.')
    return true
  }
  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret: process.env.TURNSTILE_SECRET_KEY,
        sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
        response: token,
      }),
    })
    const data = await res.json()
    return !!data.success
  } catch (error) {
    console.error('Error validating captcha:', error)
    return false
  }
}

type Result = {
  success?: boolean
  message?: string
}

export const signup = async (prevState: Result, formData: FormData): Promise<Result> => {
  // validate captcha
  if (!(await validateCaptcha(formData.get('cf-turnstile-response') as string))) {
    return {
      success: false,
      message: `The humanity checks could not be validated on the server. Sorry, please try again.`,
    }
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_LISTMONK_URL}/api/public/subscription`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({
      email: formData.get('email'),
      list_uuids: [process.env.NEXT_PUBLIC_LISTMONK_LIST_ID],
    }),
  })

  if (res.ok) {
    return {
      success: true,
      message: `Thanks for signing up! Check your inbox/spam for an email with the confirmation link.`,
    }
  } else {
    return {
      success: false,
      message: `We couldn't sign you up. Please try again.`,
    }
  }
}
