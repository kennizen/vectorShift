import { Handle } from "reactflow";
import { LinkedInputData } from "../../constants/nodes";
import { ChangeEvent, useState } from "react";

interface IProps {
  data: LinkedInputData;
}

export const LinkedInput = ({ data }: IProps) => {
  // consts
  const { handlers, lowerInput, type, upperInput, value } = data;

  // states
  const [val, setVal] = useState(value);
  const [inputType, setInputType] = useState(upperInput.type.toLowerCase());

  // handlers
  function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
    setVal(e.target.value);
  }

  function handleInputTypeChange(e: ChangeEvent<HTMLSelectElement>) {
    setInputType(e.target.value);
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <input
        type={inputType}
        name={upperInput.label.toLowerCase()}
        id={upperInput.label.toLowerCase()}
        value={val}
        onChange={handleOnChange}
      />
      <select
        name={lowerInput.label.toLowerCase()}
        id={lowerInput.label.toLowerCase()}
        onChange={handleInputTypeChange}
      >
        {lowerInput.options.map((op, i) => (
          <option value={op.toLowerCase()} key={op + i}>
            {op}
          </option>
        ))}
      </select>
      {handlers.map((h, i) => (
        <Handle key={h.name + i} id={h.name} position={h.position} type={h.type} />
      ))}
    </div>
  );
};
