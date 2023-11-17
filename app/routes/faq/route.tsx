import { json, type LoaderFunctionArgs } from "@remix-run/node";
import classes from "./index.module.css";
import { useLoaderData } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";

export const loader = async ({ context: { payload } }: LoaderFunctionArgs) => {
  const faq = await payload.findGlobal({
    slug: "faq",
  });
  return json({ faq }, { status: 200 });
};

export default function Faq() {
  const { faq } = useLoaderData<typeof loader>();

  const main = useRef<HTMLDivElement>(null);
  const refs = useRef<Array<HTMLDivElement>>([]);
  const [active, setActive] = useState<number | null>(null);
  const [invert, setInvert] = useState(false);

  // i toggles invert, space goes to the next question
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "i") {
      setInvert(!invert);
    } else if (e.key === " ") {
      nextQuestion();
    }
  };

  const nextQuestion = async () => {
    if (active !== null) {
      refs.current[active]?.classList.remove(classes.active as string);
    }
    const next = active === null ? 0 : active + 1;
    setActive(next);
    refs.current[next]?.classList.add(classes.active as string);
  };

  // focus the main element when the page loads in order to enable keyboard
  useEffect(() => {
    main.current?.focus();
  });
  useEffect(() => {
    refs.current?.forEach((el) => {
      el.style.transform = `translate(${Math.random() * 100}vw, ${
        Math.random() * 100
      }vh) scaleX(.1)`;
      el.style.display = "block";
    });
  }, [faq]);

  return (
    <main
      onClick={nextQuestion}
      tabIndex={0}
      ref={main}
      onKeyDown={onKeyDown}
      className={classes.container}
    >
      <div className={classes.wrapper}>
        {faq.questions?.map((item) => (
          <div
            key={item.id}
            className={classes.node}
            ref={(el) => el && refs.current.push(el)}
          >
            <div className={classes.content}>{item.question}</div>
          </div>
        ))}
      </div>
      {invert && <div className={classes.invert} />}
    </main>
  );
}
