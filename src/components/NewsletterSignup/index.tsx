'use client'

import { useActionState, useEffect, useState } from 'react'
import Turnstile from 'react-turnstile'
import { signup } from './actions/signup'
import { cn } from '@/util/cn'
import { listmonkWakeUp } from './actions/listmonkWakeUp'

export const NewsletterSignup = () => {
  if (!process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY) {
    throw new Error('Missing NEXT_PUBLIC_TURNSTILE_SITE_KEY')
  }

  const [isActive, setIsActive] = useState(false)
  const [captchaState, setCaptchaState] = useState<'checking' | 'verified' | 'error'>('checking')
  const [triggeredWakeUp, setTriggeredWakeUp] = useState(false)

  // wake up listmonk when the user interacts with the form
  useEffect(() => {
    if (!triggeredWakeUp && isActive) {
      listmonkWakeUp().then(() => {
        setTriggeredWakeUp(true)
      })
    }
  }, [isActive, triggeredWakeUp])

  const [state, formAction, pending] = useActionState(signup, {})

  return (
    <div className="grid w-[min(13.2em,94vw)]">
      {state.success === true ? (
        <p className="mt-2 bg-[lightseagreen]">{state.message}</p>
      ) : (
        <>
          <div
            className={cn(
              'pointer-events-none fixed top-0 right-0 bottom-0 left-0 z-10 opacity-0 backdrop-blur-md',
              {
                'pointer-events-auto opacity-100': isActive,
              },
            )}
            onClick={() => setIsActive(false)}
          />
          <form
            action={formAction}
            className={cn('z-10 flex flex-col items-center', {
              'relative z-10 grid items-center justify-center': isActive,
              'opacity-50': pending,
            })}
          >
            <fieldset disabled={pending} className="flex justify-between border-b-1">
              <input
                id="email"
                name="email"
                type="email"
                placeholder="sign@me.up"
                aria-label="your email address"
                required={true}
                onFocus={() => setIsActive(true)}
                className={cn(
                  'h-[2.6rem] w-[6.5em] transition-all duration-200 ease-in-out focus:ring-0 focus:outline-0',
                  {
                    'w-[12em]': isActive,
                  },
                )}
              />
              <button
                type="submit"
                aria-label="sign up for our newsletter"
                className="h-[2.6rem] font-[Arial]"
              >
                &crarr;
              </button>
            </fieldset>
            <div className={cn({ hidden: !isActive })}>
              {isActive && (
                <Turnstile
                  sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
                  execution="render"
                  onVerify={() => setCaptchaState('verified')}
                  onError={() => setCaptchaState('error')}
                />
              )}
              {state.success === false && (
                <p className="bg-[orangered]">
                  {state.message || "We couldn't sign you up. Please try again."}
                </p>
              )}
              <p className="text-sm text-neutral-500">
                {captchaState === 'checking' && "we're checking if you are human..."}
                {captchaState === 'verified' && 'all checks passed'}
                {captchaState === 'error' && 'It seems like you are a bot, please try again.'}
              </p>
              <button
                className="mt-4 bg-[lightseagreen] px-4 py-2 transition-colors duration-200 disabled:cursor-not-allowed disabled:bg-neutral-500"
                type="submit"
                aria-label="sign up for our newsletter"
                disabled={captchaState !== 'verified'}
              >
                {pending ? 'signing you up...' : 'sign me up'}
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  )
}
