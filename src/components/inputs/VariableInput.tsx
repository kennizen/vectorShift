import { useEffect, useState } from "react";
import { NodeHandler, VariableInputData } from "../../constants/nodes";
import { Position } from "reactflow";
import { AutoHeightTextArea } from "../AutoHeightTextArea";
import { useDebounce } from "../hooks/useDebounce";
import { Handler } from "../Handler";

interface IProps {
  data: VariableInputData;
}

const regex = /\{\{(\w+)\}\}/g;

export const VariableInput = ({ data }: IProps) => {
  // consts
  const { input, value } = data;

  // states
  const [val, setVal] = useState("");
  const [handlers, setHandlers] = useState<NodeHandler[]>([]);

  // hooks
  const debouncedVal = useDebounce(val, 200);

  // handlers
  function handleOnChange(val: string) {
    setVal(val);
  }

  function handleVariableHandlers() {
    const variables = [...val.matchAll(regex)].map((n) => n[1]);
    const tmp: NodeHandler[] = [];

    for (const v of variables) {
      tmp.push({
        name: v,
        position: Position.Left,
        type: "target",
      });
    }

    setHandlers(tmp);
  }

  // effect
  useEffect(() => {
    handleVariableHandlers();
  }, [debouncedVal]);

  return (
    <div>
      <AutoHeightTextArea
        id={input.label.toLowerCase()}
        name={input.label.toLowerCase()}
        value={value}
        onChange={handleOnChange}
      />
      <Handler handlers={handlers} />
    </div>
  );
};
