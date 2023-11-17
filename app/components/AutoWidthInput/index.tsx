import type { ChangeEvent } from "react";
import React, { useRef, useState } from "react";

export const AutoWidthInput: React.FC<
  React.InputHTMLAttributes<HTMLInputElement>
> = (props) => {
  const [content, setContent] = useState(props.placeholder || "");
  const [width, setWidth] = useState(0);
  const span = useRef<HTMLSpanElement>(null);
  const input = useRef<HTMLInputElement>(null);

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);

    if (!span.current || !input.current) return;

    const newWidth = span.current.offsetWidth;
    if (newWidth > width) {
      setWidth(newWidth);
    }
    input.current.style.visibility = "visible";
  };

  return (
    <div>
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
        ref={input}
        {...props}
        style={{ width: `${width === 0 ? 96 : width}px` }}
        onChange={changeHandler}
      />
    </div>
  );
};
