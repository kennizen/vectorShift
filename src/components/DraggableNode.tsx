import { DragEvent } from "react";
import { CustomNodeTypes } from "../constants/nodes";

interface IProps {
  label: string;
  type: CustomNodeTypes;
}

export const DraggableNode = ({ type, label }: IProps) => {
  const onDragStart = (event: DragEvent<HTMLDivElement>, nodeType: string) => {
    const target = event.target as HTMLDivElement;
    const appData = { rfNodeType: "node", nodeType: nodeType };

    target.style.cursor = "grabbing";

    event.dataTransfer.setData("application/reactflow", JSON.stringify(appData));
    event.dataTransfer.effectAllowed = "move";
  };

  const onDragEnd = (event: DragEvent<HTMLDivElement>) => {
    (event.target as HTMLDivElement).style.cursor = "grab";
  };

  return (
    <div
      className={type}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={onDragEnd}
      style={{
        cursor: "grab",
        minWidth: "80px",
        height: "60px",
        display: "flex",
        alignItems: "center",
        borderRadius: "8px",
        backgroundColor: "#1C2536",
        justifyContent: "center",
        flexDirection: "column",
      }}
      draggable
    >
      <span style={{ color: "#fff" }}>{label}</span>
    </div>
  );
};
