import { useEffect, useState } from "react";
import { VariableInputData } from "../../constants/nodes";
import { Handle, Position, useUpdateNodeInternals } from "reactflow";
import { AutoHeightTextArea } from "../AutoHeightTextArea";

interface IProps {
  data: VariableInputData;
  parentId: string;
}

const regex = /\{\{(\w+)\}\}/g;

export const VariableInput = ({ data, parentId }: IProps) => {
  // consts
  const { input, type, value } = data;

  // states
  const [variableHandlers, setVariableHandlers] = useState<string[]>([]);
  const [steps, setSteps] = useState<number[]>([]);

  // hooks
  const updateNodeInternals = useUpdateNodeInternals();

  // handlers
  function handleOnChange(val: string) {
    setVariableHandlers([...val.matchAll(regex)].map((n) => n[1]));
  }

  function handleGenerateHandlerPositions() {
    const handlers = variableHandlers.length;
    const res: number[] = [];
    const step = 100 / (handlers + 1);
    let interval = step;

    for (let i = 1; i <= handlers; i++) {
      res.push(interval);
      interval += step;
    }

    return res;
  }

  // effect
  useEffect(() => {
    setSteps(handleGenerateHandlerPositions() ?? []);
  }, [variableHandlers.length]);

  useEffect(() => {
    updateNodeInternals(parentId);
  }, [steps]);

  return (
    <div>
      <AutoHeightTextArea
        id={input.label.toLowerCase()}
        name={input.label.toLowerCase()}
        value={value}
        onChange={handleOnChange}
      />
      {variableHandlers.map((v, i) => (
        <Handle
          key={v + i}
          id={v + parentId}
          position={Position.Left}
          type="target"
          style={{
            top: steps[i] + "%",
          }}
        />
      ))}
    </div>
  );
};
