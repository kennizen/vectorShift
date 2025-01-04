import { Stack, Typography } from "@mui/material";
import { ChangeEvent, useEffect, useRef, useState } from "react";

interface IProps {
  value?: string;
  name?: string;
  id?: string;
  onChange: (val: string) => void;
}

export const AutoHeightTextArea = ({ id, name, value, onChange }: IProps) => {
  // states
  const [val, setVal] = useState(value);

  // hooks
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const parentRef = useRef<HTMLDivElement | null>(null);

  // handlers
  function handleFocus() {
    if (!parentRef || !parentRef.current) return;
    parentRef.current.style.outline = "1px solid var(--primary-color)";
  }

  function handleBlur() {
    if (!parentRef || !parentRef.current) return;
    parentRef.current.style.outline = "none";
  }

  function handleOnChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setVal(e.target.value);
    onChange(e.target.value);
  }

  function handleAutoHeight() {
    if (!textAreaRef || !textAreaRef.current) return;

    textAreaRef.current.style.height = "auto";
    textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
  }

  // effects
  useEffect(() => {
    textAreaRef.current?.addEventListener("input", handleAutoHeight);
    return () => textAreaRef.current?.removeEventListener("input", handleAutoHeight);
  }, []);

  return (
    <Stack
      ref={parentRef}
      sx={{
        border: "1px solid var(--primary-color)",
        padding: "0.5rem",
        borderRadius: "10px",
      }}
      gap="0.4rem"
    >
      <Typography>{name}</Typography>
      <textarea
        ref={textAreaRef}
        style={{
          resize: "none",
          overflow: "hidden",
          height: "30px",
          border: "none",
          outline: "none",
        }}
        id={id}
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={val}
        onChange={handleOnChange}
      />
    </Stack>
  );
};
