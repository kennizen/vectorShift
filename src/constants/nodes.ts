import { HandleProps, Node, Position } from "reactflow";

export type CustomNodeTypes = "input" | "output" | "llm" | "text" | "input2" | "output2" | "llm2" | "text2" | "loop";

export type NodeHandler = {
  type: HandleProps["type"];
  position: HandleProps["position"];
  name: string;
};

// ------------------------------- Input Types ------------------------------------- //
export type LinkedInputData = {
  type: "linked";
  value: string;
  upperInput: {
    label: string;
    type: string;
  };
  lowerInput: {
    label: string;
    options: string[];
  };
  handlers: NodeHandler[];
};

export type VariableInputData = {
  type: "variable";
  input: {
    label: string;
  };
  value: string;
};

export type SimpleInputData = {
  type: "simple";
  input: {
    label: string;
  };
  value: string;
  handlers: NodeHandler[];
};

type ActionableInputOption = {
  optionName: string;
  handlers: NodeHandler[];
};
export type ActionableInputData = {
  type: "actionable";
  ctas: string[];
  input: {
    label: string;
    options: ActionableInputOption[];
  };
  value: string;
};
// ------------------------------- Input Types ------------------------------------- //

export type NodeData = {
  id?: string;
  name: string;
  type: CustomNodeTypes;
  inputs: Array<LinkedInputData | VariableInputData | ActionableInputData | SimpleInputData>;
};

export type CustomNode = Node<NodeData>;

export const NODE_DATA: Record<CustomNodeTypes, NodeData> = {
  input: {
    name: "Input",
    type: "input",
    inputs: [
      {
        type: "linked",
        value: "",
        upperInput: {
          type: "text",
          label: "Name",
        },
        lowerInput: {
          label: "Type",
          options: ["text", "file"],
        },
        handlers: [
          {
            name: "h1",
            position: Position.Right,
            type: "source",
          },
        ],
      },
    ],
  },
  output: {
    name: "Output",
    type: "output",
    inputs: [
      {
        type: "linked",
        value: "",
        upperInput: {
          type: "text",
          label: "Name",
        },
        lowerInput: {
          label: "Type",
          options: ["text", "file"],
        },
        handlers: [
          {
            name: "h2",
            position: Position.Left,
            type: "target",
          },
        ],
      },
    ],
  },
  llm: {
    name: "LLM",
    type: "llm",
    inputs: [
      {
        type: "simple",
        value: "",
        input: {
          label: "LLM",
        },
        handlers: [
          {
            name: "h1",
            position: Position.Left,
            type: "target",
          },
          {
            name: "h2",
            position: Position.Left,
            type: "target",
          },
          {
            name: "h3",
            position: Position.Right,
            type: "source",
          },
        ],
      },
    ],
  },
  text: {
    type: "text",
    name: "Text",
    inputs: [
      {
        type: "variable",
        input: {
          label: "Text node",
        },
        value: "",
      },
    ],
  },
  input2: {
    type: "input2",
    name: "Input 2",
    inputs: [
      {
        type: "actionable",
        ctas: [],
        value: "",
        input: {
          label: "input 2",
          options: [
            {
              optionName: "option1",
              handlers: [],
            },
            {
              optionName: "option2",
              handlers: [],
            },
            {
              optionName: "option3",
              handlers: [],
            },
            {
              optionName: "option4",
              handlers: [],
            },
          ],
        },
      },
      {
        type: "linked",
        value: "",
        upperInput: {
          type: "text",
          label: "Name",
        },
        lowerInput: {
          label: "Type",
          options: ["text", "file", "number"],
        },
        handlers: [
          {
            name: "h1",
            position: Position.Right,
            type: "source",
          },
        ],
      },
    ],
  },
  output2: {
    type: "output2",
    name: "Output 2",
    inputs: [
      {
        type: "actionable",
        ctas: [],
        value: "",
        input: {
          label: "output 2",
          options: [
            {
              optionName: "option1",
              handlers: [],
            },
            {
              optionName: "option2",
              handlers: [],
            },
            {
              optionName: "option3",
              handlers: [],
            },
            {
              optionName: "option4",
              handlers: [],
            },
          ],
        },
      },
      {
        type: "linked",
        value: "",
        upperInput: {
          type: "text",
          label: "Name",
        },
        lowerInput: {
          label: "Type",
          options: ["text", "file", "number"],
        },
        handlers: [
          {
            name: "h2",
            position: Position.Left,
            type: "target",
          },
        ],
      },
    ],
  },
  llm2: {
    type: "llm2",
    name: "LLM2",
    inputs: [
      {
        type: "actionable",
        value: "",
        ctas: ["Edit Selected", "Create New"],
        input: {
          label: "llm2",
          options: [
            {
              optionName: "email",
              handlers: [
                {
                  name: "h1",
                  position: Position.Left,
                  type: "target",
                },
                {
                  name: "h2",
                  position: Position.Left,
                  type: "target",
                },
                {
                  name: "h3",
                  position: Position.Left,
                  type: "target",
                },
              ],
            },
            {
              optionName: "slack",
              handlers: [
                {
                  name: "h1",
                  position: Position.Left,
                  type: "target",
                },
                {
                  name: "h2",
                  position: Position.Left,
                  type: "target",
                },
              ],
            },
          ],
        },
      },
    ],
  },
  text2: {
    type: "text2",
    name: "Text 2",
    inputs: [
      {
        type: "simple",
        value: "",
        handlers: [],
        input: {
          label: "text 2",
        },
      },
      {
        type: "variable",
        value: "",
        input: {
          label: "text node",
        },
      },
      {
        type: "actionable",
        ctas: ["Edit something", "Create something new"],
        value: "",
        input: {
          label: "input 2",
          options: [
            {
              optionName: "option1",
              handlers: [],
            },
            {
              optionName: "option2",
              handlers: [],
            },
            {
              optionName: "option3",
              handlers: [],
            },
            {
              optionName: "option4",
              handlers: [],
            },
          ],
        },
      },
    ],
  },
  loop: {
    type: "loop",
    name: "Loop Node",
    inputs: [
      {
        type: "simple",
        value: "",
        handlers: [
          {
            name: "h1",
            type: "source",
            position: Position.Right,
          },
          {
            name: "h2",
            type: "target",
            position: Position.Right,
          },
          {
            name: "h3",
            type: "source",
            position: Position.Left,
          },
          {
            name: "h4",
            type: "target",
            position: Position.Left,
          },
        ],
        input: {
          label: "loop node",
        },
      },
    ],
  },
};
