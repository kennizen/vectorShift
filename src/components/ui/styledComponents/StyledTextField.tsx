import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledTextField = styled(TextField)(() => ({
  "& .MuiInputBase-root": {
    borderRadius: "20px",
  },
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: "var(--primary-color)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "var(--sec-color)",
    },
    "& fieldset": {
      borderColor: "var(--primary-color)",
      borderWidth: "1px",
    },
  },
})) as typeof TextField;
