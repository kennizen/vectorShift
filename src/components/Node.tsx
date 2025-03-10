import { NodeProps, useStore } from "reactflow";
import { LinkedInput } from "./inputs/LinkedInput";
import { VariableInput } from "./inputs/VariableInput";
import { ActionableInput } from "./inputs/ActionableInput";
import { RiCloseCircleLine } from "@remixicon/react";
import { NodeCtx } from "./providers/NodeProvider";
import { NodeData } from "../constants/nodes";
import { TextInput } from "./inputs/TextInput";
import { Stack } from "@mui/material";
import { useCallback } from "react";

export const Node = (props: NodeProps) => {
  // consts
  const { data, id, selected } = props;
  const nodeData = data as NodeData;

  // hooks
  const z = useStore((state) => state.transform[2]);

  const handleGetInputs = useCallback(() => {
    const inputs = nodeData.inputs;

    return inputs.map((data, i) => {
      switch (data.type) {
        case "linked":
          return <LinkedInput key={i} data={{ ...data }} />;
        case "actionable":
          return <ActionableInput key={i} data={{ ...data }} />;
        case "variable":
          return <VariableInput key={i} data={{ ...data }} />;
        case "simple":
          return <TextInput key={i} data={{ ...data }} />;
      }
    });
  }, [nodeData.inputs.length]);

  return (
    <Stack
      id={id}
      sx={{
        borderRadius: "10px",
        backgroundColor: "white",
        gap: "1rem",
        border: "1px solid var(--primary-color)",
        padding: "1rem",
        width: "15rem",
        boxShadow: selected
          ? "var(--primary-color) 0px 0.0625em 0.0625em, var(--primary-color) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;"
          : "none",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem" }}>
        <p style={{ fontWeight: 500, fontSize: 14, color: "var(--sec-color)" }}>{nodeData.name}</p>
        <button
          style={{
            backgroundColor: "transparent",
            padding: "0",
            borderRadius: "50%",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <RiCloseCircleLine size={20} />
        </button>
      </div>
      <NodeCtx.Provider
        value={{
          parentId: id,
          zoom: z,
        }}
      >
        <Stack className="nodrag" gap="1rem">
          {handleGetInputs()}
        </Stack>
      </NodeCtx.Provider>
    </Stack>
  );
};
