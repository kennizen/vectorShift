import { HandleProps, Node, Position } from "reactflow";

export type CustomNodeTypes = "input" | "output" | "llm" | "text";

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
    name: "Text Node",
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
};

/**
 * {
        type: "simple",
        value: "",
        input: {
          label: "",
          options: [
            {
              optionName: "email",
              handlers: [
                {
                  name: "subject",
                  position: Position.Left,
                  type: "target",
                },
                {
                  name: "Recepient",
                  position: Position.Left,
                  type: "target",
                },
                {
                  name: "body",
                  position: Position.Left,
                  type: "target",
                },
              ],
            },
            {
              optionName: "slack",
              handlers: [
                {
                  name: "Recepients",
                  position: Position.Left,
                  type: "target",
                },
                {
                  name: "Message",
                  position: Position.Left,
                  type: "target",
                },
              ],
            },
          ],
        },
      },
 */
