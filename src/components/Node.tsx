import { Handle, NodeProps, Position } from "reactflow";
import { LinkedInput } from "./inputs/LinkedInput";
import { VariableInput } from "./inputs/VariableInput";
import { ActionableInput } from "./inputs/ActionableInput";

export const Node = (props: NodeProps) => {
  console.log({ props });

  return (
    <div style={{ border: "1px solid black", padding: "1rem" }}>
      {/* <LinkedInput
        data={{
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
              name: "",
              position: Position.Right,
              type: "source",
            },
          ],
        }}
      /> */}
      <VariableInput
        data={{
          input: {
            label: "Sample",
          },
          type: "simple",
          value: "",
          handlers: [
            // {
            //   name: "",
            //   position: Position.Right,
            //   type: "source",
            // },
          ],
        }}
      />
      {/* <ActionableInput
        data={{
          ctas: ["Edit", "Add new data"],
          input: {
            label: "Label",
            options: [
              {
                optionName: "email",
                handlers: [
                  {
                    name: "Subject",
                    position: Position.Left,
                    type: "target",
                  },
                  {
                    name: "Recepient",
                    position: Position.Left,
                    type: "target",
                  },
                  {
                    name: "Body",
                    position: Position.Left,
                    type: "target",
                  },
                ],
              },
              {
                optionName: "slack",
                handlers: [
                  {
                    name: "Recepient",
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
          type: "actionable",
          value: "",
        }}
      /> */}
    </div>
  );
};
