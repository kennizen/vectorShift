import { RiPlayFill } from "@remixicon/react";
import { StyledButton } from "./ui/styledComponents/StyledButton";

export const Submit = () => {
  return (
    <StyledButton
      variant="contained"
      type="submit"
      disableElevation
      sx={{
        backgroundColor: "var(--primary-color)",
        color: "white",
      }}
      startIcon={<RiPlayFill size={20}/>}
    >
      Submit
    </StyledButton>
  );
};
