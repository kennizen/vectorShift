import { useState } from "react";
import { SimpleInputData } from "../../constants/nodes";
import { Handle, Position } from "reactflow";
import { AutoHeightTextArea } from "../AutoHeightTextArea";

interface IProps {
  data: SimpleInputData;
}

const regex = /\{\{(\w+)\}\}/g;

export const VariableInput = ({ data }: IProps) => {
  // consts
  const { input, type, value, handlers } = data;

  // states
  const [variableHandlers, setVariableHandlers] = useState<string[]>([]);

  // handlers
  function handleOnChange(val: string) {
    setVariableHandlers([...val.matchAll(regex)].map((n) => n[1]));
  }

  return (
    <div>
      <AutoHeightTextArea
        id={input.label.toLowerCase()}
        name={input.label.toLowerCase()}
        value={value}
        onChange={handleOnChange}
      />
      {handlers.map((h, i) => (
        <Handle key={h.name + i} id={h.name} position={h.position} type={h.type} />
      ))}
      {variableHandlers.map((v, i) => (
        <Handle key={v + i} id={v} position={Position.Left} type="target" />
      ))}
    </div>
  );
};
