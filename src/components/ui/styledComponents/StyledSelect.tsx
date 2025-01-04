import { Select, SelectProps } from "@mui/material";
import { styled } from "@mui/material/styles";

type StyledSelectProps = {
  zoom?: number;
} & SelectProps;

export const StyledSelect = styled((props: StyledSelectProps) => (
  <Select
    {...props}
    MenuProps={{
      elevation: 0,
      sx: {
        "& .MuiPaper-root": {
          scale: props.zoom ?? 1,
          border: "1px solid var(--primary-color)",
        },
      },
    }}
  />
))(() => ({
  borderRadius: "20px",
  "&.MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: "var(--primary-color)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "var(--sec-color)",
    },
    "& fieldset": {
      borderColor: "var(--primary-color)",
    },
  },
}));
