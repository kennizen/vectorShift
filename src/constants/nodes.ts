import { HandleProps, Node, Position } from "reactflow";

export type NodeTypes = "input" | "output" | "llm" | "text";

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

export type VariableTextInput = {
  type: "variableText";
  value: string;
  variables: string[];
};
// ------------------------------- Input Types ------------------------------------- //

export type NodeData = {
  id?: string;
  name: string;
  type: NodeTypes;
  inputs: Array<LinkedInputData | SimpleInputData | ActionableInputData | VariableTextInput>;
};

export type CustomNode = Node<NodeData>;

// export const NodeData: Record<NodeTypes, NodeData> = {
//   input: {
//     name: "Input",
//     type: "input",
//     inputs: [
//       {
//         type: "linked",
//         value: "",
//         upperInput: {
//           type: "text",
//           label: "Name",
//         },
//         lowerInput: {
//           label: "Type",
//           options: ["text", "file"],
//         },
//         handlers: [
//           {
//             name: "",
//             position: Position.Right,
//             type: "source",
//           },
//         ],
//       },
//     ],
//   },
//   output: {
//     name: "Output",
//     type: "output",
//     inputs: [
//       {
//         type: "linked",
//         value: "",
//         upperInput: {
//           type: "text",
//           label: "Name",
//         },
//         lowerInput: {
//           label: "Type",
//           options: ["text", "file"],
//         },
//         handlers: [
//           {
//             name: "",
//             position: Position.Left,
//             type: "target",
//           },
//         ],
//       },
//     ],
//   },
//   llm: {
//     name: "LLM",
//     type: "llm",
//     inputs: [
//       {
//         type: "actionable",
//         ctas: [],
//         value: "",
//         input: {
//           label: "",
//           options: [
//             {
//               optionName: "email",
//               handlers: [
//                 {
//                   name: "subject",
//                   position: Position.Left,
//                   type: "target",
//                 },
//                 {
//                   name: "Recepient",
//                   position: Position.Left,
//                   type: "target",
//                 },
//                 {
//                   name: "body",
//                   position: Position.Left,
//                   type: "target",
//                 },
//               ],
//             },
//             {
//               optionName: "slack",
//               handlers: [
//                 {
//                   name: "Recepients",
//                   position: Position.Left,
//                   type: "target",
//                 },
//                 {
//                   name: "Message",
//                   position: Position.Left,
//                   type: "target",
//                 },
//               ],
//             },
//           ],
//         },
//       },
//     ],
//   },
//   text: {},
// };
