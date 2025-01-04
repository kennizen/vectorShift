import { Handle, Position, useStore, useUpdateNodeInternals } from "reactflow";
import { LinkedInputData } from "../../constants/nodes";
import { ChangeEvent, useEffect, useState } from "react";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { StyledTextField } from "../ui/styledComponents/StyledTextField";
import { StyledSelect } from "../ui/styledComponents/StyledSelect";

interface IProps {
  data: LinkedInputData;
  parentId: string;
}

export const LinkedInput = ({ data, parentId }: IProps) => {
  // consts
  const { handlers, lowerInput, type, upperInput, value } = data;

  // states
  const [val, setVal] = useState(value);
  const [inputType, setInputType] = useState(upperInput.type.toLowerCase());
  const [srcSteps, setSrcSteps] = useState<number[]>([]);
  const [tarSteps, setTarSteps] = useState<number[]>([]);

  // hooks
  const updateNodeInternals = useUpdateNodeInternals();
  const zoom = useStore((state) => state.transform[2]);

  // handlers
  const handleChange = (e: any) => {
    setInputType(e.target.value as string);
  };

  function handleInputTypeChange(e: ChangeEvent<HTMLSelectElement>) {
    setInputType(e.target.value);
  }

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
  }, [handlers.length]);

  useEffect(() => {
    updateNodeInternals(parentId);
  }, [srcSteps, tarSteps]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
      className="nodrag"
    >
      <StyledTextField
        size="small"
        type={inputType}
        label={inputType === "file" ? "" : upperInput.label.toLowerCase()}
      />
      <FormControl size="small">
        <InputLabel>{lowerInput.label.toLowerCase()}</InputLabel>
        <StyledSelect value={inputType} label={lowerInput.label.toLowerCase()} onChange={handleChange} zoom={zoom}>
          {lowerInput.options.map((op, i) => (
            <MenuItem key={i} value={op}>
              {op}
            </MenuItem>
          ))}
        </StyledSelect>
      </FormControl>

      {handlers
        .filter((h) => h.position === Position.Left)
        .map((h, i) => (
          <Handle
            key={h.name + i}
            id={h.name + parentId}
            position={h.position}
            type={h.type}
            style={{
              top: srcSteps[i] + "%",
              width: "15px",
              height: "15px",
              borderRadius: "50%",
              left: "-7px",
              outline: "1px solid var(--primary-color)",
              backgroundColor: "var(--primary-color)",
            }}
          />
        ))}
      {handlers
        .filter((h) => h.position === Position.Right)
        .map((h, i) => (
          <Handle
            key={h.name + i}
            id={h.name + parentId}
            position={h.position}
            type={h.type}
            style={{
              top: tarSteps[i] + "%",
            }}
          />
        ))}
    </div>
  );
};
