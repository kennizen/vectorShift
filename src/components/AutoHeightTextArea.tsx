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

  // handlers
  function handleAutoHeight() {
    if (!textAreaRef || !textAreaRef.current) return;

    textAreaRef.current.style.height = "auto";
    textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
  }

  function handleOnChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setVal(e.target.value);
    onChange(e.target.value);
  }

  // effects
  useEffect(() => {
    textAreaRef.current?.addEventListener("input", handleAutoHeight);
    return () => textAreaRef.current?.removeEventListener("input", handleAutoHeight);
  }, []);

  return (
    <textarea
      ref={textAreaRef}
      id={id}
      name={name}
      style={{
        padding: "0.5rem 0.5rem 0 0.5rem",
        resize: "none",
        overflow: "hidden",
        height: "38px",
      }}
      value={val}
      onChange={handleOnChange}
    />
  );
};
