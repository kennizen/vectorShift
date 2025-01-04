import { DraggableNode } from "./DraggableNode";

export const PipelineToolbar = () => {
  return (
    <div style={{ padding: "10px" }}>
      <div style={{ marginTop: "20px", display: "flex", flexWrap: "wrap", gap: "10px" }}>
        <DraggableNode type="input" label="Input" />
        <DraggableNode type="llm" label="LLM" />
        <DraggableNode type="output" label="Output" />
        <DraggableNode type="text" label="Text" />
      </div>
    </div>
  );
};
