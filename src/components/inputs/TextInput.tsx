import { useEffect, useState } from "react";
import { SimpleInputData } from "../../constants/nodes";
import { AutoHeightTextArea } from "../AutoHeightTextArea";
import { Handle, Position, useUpdateNodeInternals } from "reactflow";

interface IProps {
  data: SimpleInputData;
  parentId: string;
}

export const TextInput = ({ data, parentId }: IProps) => {
  console.log({ parentId });

  // consts
  const { input, type, value, handlers } = data;

  // states
  const [srcSteps, setSrcSteps] = useState<number[]>([]);
  const [tarSteps, setTarSteps] = useState<number[]>([]);

  // hooks
  const updateNodeInternals = useUpdateNodeInternals();

  // methods
  function handleGenerateHandlerPositions(h: number) {
    const hndlrs = h;
    const res: number[] = [];
    const step = 100 / (hndlrs + 1);
    let interval = step;

    for (let i = 1; i <= hndlrs; i++) {
      res.push(interval);
      interval += step;
    }
    return res;
  }

  // effect
  useEffect(() => {
    setSrcSteps(handleGenerateHandlerPositions(handlers.filter((h) => h.position === Position.Left).length));
    setTarSteps(handleGenerateHandlerPositions(handlers.filter((h) => h.position === Position.Right).length));
  }, [handlers.length, parentId]);

  useEffect(() => {
    updateNodeInternals(parentId);
  }, [srcSteps, tarSteps]);

  return (
    <div className="nodrag">
      <AutoHeightTextArea
        id={input.label.toLowerCase()}
        name={input.label.toLowerCase()}
        value={value}
        onChange={() => {}}
      />
      {handlers
        .filter((h) => h.position === Position.Left)
        .map((h, i) => {
          return (
            <Handle
              key={h.name + i}
              id={parentId + h.name}
              position={h.position}
              type={h.type}
              style={{
                top: srcSteps[i] + "%",
              }}
            />
          );
        })}
      {handlers
        .filter((h) => h.position === Position.Right)
        .map((h, i) => {
          return (
            <Handle
              key={h.name + i}
              id={parentId + h.name}
              position={h.position}
              type={h.type}
              style={{
                top: tarSteps[i] + "%",
              }}
            />
          );
        })}
    </div>
  );
};
