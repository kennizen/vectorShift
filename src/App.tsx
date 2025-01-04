import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { PipelineToolbar } from "./components/PipelineToolbar";
import { PipelineUI } from "./components/PipelineUI";
import { Submit } from "./components/Submit";

function App() {
  return (
    <div>
      <PipelineToolbar />
      <PipelineUI />
      <Submit />
      <FormControl size="small">
        <InputLabel>Age</InputLabel>
        <Select value={""} label="Age">
          {/* {lowerInput.options.map((op, i) => (
            <MenuItem key={i} value={op}>
              {op}
            </MenuItem>
          ))} */}
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default App;
