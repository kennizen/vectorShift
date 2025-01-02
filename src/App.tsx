import { PipelineToolbar } from "./components/PipelineToolbar";
import { PipelineUI } from "./components/PipelineUI";
import { Submit } from "./components/Submit";

function App() {
  return (
    <div>
      <PipelineToolbar />
      <PipelineUI />
      <Submit />
    </div>
  );
}

export default App;
