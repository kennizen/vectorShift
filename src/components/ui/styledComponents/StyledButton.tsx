import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledButton = styled(Button)(() => ({
  textTransform: "capitalize",
  borderRadius: "5px",
  color: "var(--primary-color)",
  fontWeight: 600
})) as typeof Button;
