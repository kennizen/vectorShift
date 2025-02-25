import { useEffect, useState } from "react";
import { ActionableInputData, NodeHandler } from "../../constants/nodes";
import { FormControl, InputLabel, MenuItem, Stack } from "@mui/material";
import { StyledSelect } from "../ui/styledComponents/StyledSelect";
import { Handler } from "../Handler";
import { StyledButton } from "../ui/styledComponents/StyledButton";
import { useNodeCtx } from "../providers/NodeProvider";

interface IProps {
  data: ActionableInputData;
}

type OptionsMap = Record<string, NodeHandler[]>;

export const ActionableInput = ({ data }: IProps) => {
  // consts
  const { ctas, input, value } = data;

  // states
  const [selOption, setSelOption] = useState(value);
  const [options, setOptions] = useState<OptionsMap>({});

  // hooks
  const { zoom } = useNodeCtx();

  // handlers
  function handleOnOptionSelect(e: any) {
    setSelOption(e.target.value);
  }

  function handleTransformOptions() {
    const tmp: OptionsMap = {};

    for (const ele of input.options) {
      tmp[ele.optionName] = ele.handlers;
    }

    setOptions(tmp);
  }

  // effects
  useEffect(() => {
    handleTransformOptions();
  }, []);

  return (
    <Stack gap="1rem">
      <FormControl size="small">
        <InputLabel>{input.label.toLowerCase()}</InputLabel>
        <StyledSelect value={selOption} label={input.label.toLowerCase()} onChange={handleOnOptionSelect} zoom={zoom}>
          {input.options.map((op, i) => (
            <MenuItem key={i} value={op.optionName.toLowerCase()}>
              {op.optionName}
            </MenuItem>
          ))}
        </StyledSelect>
      </FormControl>
      <Handler handlers={options[selOption] ?? []} />
      <Stack gap="0.3rem">
        {ctas.map((c, i) => (
          <StyledButton size="small" variant="text" key={c + i}>
            {c}
          </StyledButton>
        ))}
      </Stack>
    </Stack>
  );
};
