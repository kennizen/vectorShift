import { useEffect, useState } from "react";
import { NodeHandler } from "../constants/nodes";
import { useNodeCtx } from "./providers/NodeProvider";
import { handleGenerateHandlerPositions } from "../utils/getHandlerPos";
import { Handle, Position, useUpdateNodeInternals } from "reactflow";
import Style from "./styles.module.css";
interface IProps {
  handlers: NodeHandler[];
}

export const Handler = ({ handlers }: IProps) => {
  const [srcSteps, setSrcSteps] = useState<number[]>([]);
  const [tarSteps, setTarSteps] = useState<number[]>([]);

  // hooks
  const { parentId } = useNodeCtx();
  const updateNodeInternals = useUpdateNodeInternals();

  // effect
  useEffect(() => {
    setSrcSteps(handleGenerateHandlerPositions(handlers.filter((h) => h.position === Position.Left).length));
    setTarSteps(handleGenerateHandlerPositions(handlers.filter((h) => h.position === Position.Right).length));
  }, [handlers]);

  useEffect(() => {
    updateNodeInternals(parentId);
  }, [srcSteps.length, tarSteps.length]);

  return (
    <>
      {handlers
        .filter((h) => h.position === Position.Left)
        .map((h, i) => {
          return (
            <Handle
              key={h.name + i}
              id={`${parentId}-${i}-left`}
              position={h.position}
              type={h.type}
              style={{
                top: srcSteps[i] + "%",
              }}
              className={`${Style["handle"]} ${Style["handle-right"]}`}
            />
          );
        })}
      {handlers
        .filter((h) => h.position === Position.Right)
        .map((h, i) => {
          return (
            <Handle
              key={h.name + i}
              id={`${parentId}-${i}-right`}
              position={h.position}
              type={h.type}
              style={{
                top: tarSteps[i] + "%",
              }}
              className={`${Style["handle"]} ${Style["handle-left"]}`}
            />
          );
        })}
    </>
  );
};
