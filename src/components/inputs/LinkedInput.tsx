import { LinkedInputData } from "../../constants/nodes";
import { ChangeEvent, useState } from "react";
import { FormControl, InputLabel, MenuItem, Stack } from "@mui/material";
import { StyledTextField } from "../ui/styledComponents/StyledTextField";
import { StyledSelect } from "../ui/styledComponents/StyledSelect";
import { Handler } from "../Handler";
import { useNodeCtx } from "../providers/NodeProvider";

interface IProps {
  data: LinkedInputData;
}

export const LinkedInput = ({ data }: IProps) => {
  // consts
  const { handlers, lowerInput, upperInput, value } = data;

  // states
  const [val, setVal] = useState(value);
  const [inputType, setInputType] = useState(upperInput.type.toLowerCase());

  // hooks
  const { zoom } = useNodeCtx();

  // handlers
  const handleChange = (e: any) => {
    setInputType(e.target.value as string);
  };

  function handleInputTypeChange(e: ChangeEvent<HTMLSelectElement>) {
    setInputType(e.target.value);
  }

  return (
    <Stack gap="1rem">
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
      <Handler handlers={handlers} />
    </Stack>
  );
};
