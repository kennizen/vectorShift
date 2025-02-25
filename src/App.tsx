import { Stack } from "@mui/material";
import { PipelineToolbar } from "./components/PipelineToolbar";
import { PipelineUI } from "./components/PipelineUI";
import { Submit } from "./components/Submit";

function App() {
  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="space-between" padding="2rem 2rem 0 2rem">
        <PipelineToolbar />
        <Submit />
      </Stack>
      <PipelineUI />
    </>
  );
}

export default App;
