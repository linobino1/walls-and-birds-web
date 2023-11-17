import { useRef, useState } from "react";
import classes from "./index.module.css";
import onlyText from "./util";

export const PressText: React.FC<
  React.HtmlHTMLAttributes<HTMLParagraphElement>
> = ({ children }) => {
  const plaintext = onlyText(children);
  const count = plaintext.length;
  const copyPlain = () => {
    navigator.clipboard.writeText(plaintext);
    setPlaintextState("done");
    window.setTimeout(() => setPlaintextState("init"), 1000);
  };
  const copyHtml = () => {
    navigator.clipboard.writeText(contentRef.current?.innerHTML || "");
    setHtmlState("done");
    window.setTimeout(() => setHtmlState("init"), 1000);
  };

  const [plaintextState, setPlaintextState] = useState<"init" | "done">("init");
  const [htmlState, setHtmlState] = useState<"init" | "done">("init");

  const contentRef = useRef<HTMLParagraphElement>(null);

  return (
    <div className={classes.container}>
      <p ref={contentRef}>{children}</p>
      <div className={classes.bar}>
        <div className={classes.number}>{count} characters</div>
        <button
          onClick={copyPlain}
          className={plaintextState === "done" ? classes.done : ""}
        >
          copy plaintext
        </button>
        <button
          onClick={copyHtml}
          className={htmlState === "done" ? classes.done : ""}
        >
          copy HTML
        </button>
      </div>
    </div>
  );
};

export default PressText;
