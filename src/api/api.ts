type Data = {
  nodes: string[];
  edges: { from: string; to: string }[];
};

export const sendPipeline = async (input: Data) => {
  try {
    const formData = new FormData();

    formData.append("pipeline", JSON.stringify(input));

    const res = await fetch("http://localhost:8000/pipelines/parse", {
      body: formData,
      method: "POST",
    });

    const data = await res.json();

    return data;
  } catch (error) {
    console.error(error);
    return error as Error;
  }
};
