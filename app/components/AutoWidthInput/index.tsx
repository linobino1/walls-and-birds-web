import type { ChangeEvent } from "react";
import React, { useEffect, useRef, useState } from "react";
import classes from "./index.module.css";

export const AutoWidthInput: React.FC<
  React.InputHTMLAttributes<HTMLInputElement>
> = (props) => {
  const [content, setContent] = useState(props.placeholder || "");
  const [width, setWidth] = useState(0);
  const span = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (span.current) {
      const newWidth = span.current.offsetWidth;
      if (newWidth > width) {
        setWidth(newWidth);
      }
    }
  }, [content, width]);

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  return (
    <div className={classes.container}>
      <span
        ref={span}
        style={{
          visibility: "hidden",
          position: "absolute",
          paddingLeft: "1em",
        }}
        aria-hidden={true}
      >
        {content}
      </span>
      <input
        {...props}
        style={{ width: width === 0 ? "auto" : width }}
        className={classes.input}
        onChange={changeHandler}
      />
    </div>
  );
};
