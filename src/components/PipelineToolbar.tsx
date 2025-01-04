import { NODE_DATA } from "../constants/nodes";
import { DraggableNode } from "./DraggableNode";

export const PipelineToolbar = () => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
      {Object.values(NODE_DATA).map((data, i) => (
        <DraggableNode key={i} type={data.type} label={data.name} />
      ))}
    </div>
  );
};
