import { RiPlayFill } from "@remixicon/react";
import { StyledButton } from "./ui/styledComponents/StyledButton";
import { useStore } from "../store";
import { sendPipeline } from "../api/api";
import { toast } from "react-toastify";
import { Stack, Typography } from "@mui/material";

const Msg = ({ data }: { data: { n: number; e: number; isd: boolean } }) => {
  return (
    <Stack>
      <Typography>Total no. of nodes is {data.n}</Typography>
      <Typography>Total no. of edges is {data.e}</Typography>
      <Typography>{data.isd ? "Current pipeline is a DAG" : "Current pipeline is not a DAG"}</Typography>
    </Stack>
  );
};

export const Submit = () => {
  // hooks
  const { edges, nodes } = useStore((state) => ({ nodes: state.nodes, edges: state.edges }));

  // handler
  async function handlePipelineSubmit() {
    const n = nodes.map((no) => no.id);
    const e = edges.map((ed) => ({ from: ed.source, to: ed.target }));

    const res = await sendPipeline({ nodes: n, edges: e });

    console.log(res);

    toast.success(Msg, {
      data: {
        isd: res.is_dag,
        e: res.num_edges,
        n: res.num_nodes,
      },
    });
  }

  return (
    <StyledButton
      onClick={handlePipelineSubmit}
      variant="contained"
      type="submit"
      disableElevation
      sx={{
        backgroundColor: "var(--primary-color)",
        color: "white",
      }}
      startIcon={<RiPlayFill size={20} />}
    >
      Submit
    </StyledButton>
  );
};
