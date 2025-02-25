// ui.js
// Displays the drag-and-drop UI
// --------------------------------------------------

import { useState, useRef, useCallback, DragEvent } from "react";
import ReactFlow, { Controls, Background, MiniMap, ConnectionLineType, NodeTypes, ReactFlowInstance } from "reactflow";
import { useStore, Store } from "../store";
import { shallow } from "zustand/shallow";

import { Node } from "./Node";
import { NodeData, CustomNodeTypes, NODE_DATA, CustomNode } from "../constants/nodes";
import "reactflow/dist/style.css";

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes: NodeTypes = {
  node: Node,
};

const selector = (state: Store) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

function getInitNodeData(type: CustomNodeTypes): NodeData {
  return NODE_DATA[type];
}

export const PipelineUI = () => {
  const reactFlowWrapper = useRef<HTMLDivElement | null>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
  const { nodes, edges, getNodeID, addNode, onNodesChange, onEdgesChange, onConnect } = useStore(selector, shallow);

  const handleSetReactFlowIns = (ins: ReactFlowInstance) => {
    setReactFlowInstance(ins);
  };

  const onDrop = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      if (!reactFlowWrapper || !reactFlowWrapper.current) return;

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      if (event?.dataTransfer?.getData("application/reactflow")) {
        const appData = JSON.parse(event.dataTransfer.getData("application/reactflow"));
        const type = appData?.nodeType;
        const rfType = appData?.rfNodeType;

        // check if the dropped element is valid
        if (typeof type === "undefined" || !type) {
          return;
        }

        const position = reactFlowInstance!.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        const nodeID = getNodeID(type);
        const newNode: CustomNode = {
          id: nodeID,
          type: rfType,
          position,
          data: getInitNodeData(type),
        };

        addNode(newNode);
      }
    },
    [reactFlowInstance]
  );

  const onDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  console.log({ nodes, edges });

  return (
    <>
      <div ref={reactFlowWrapper} style={{ width: "full", height: "calc(100dvh - 100px)" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onInit={handleSetReactFlowIns}
          nodeTypes={nodeTypes}
          proOptions={proOptions}
          snapGrid={[gridSize, gridSize]}
          connectionLineType={ConnectionLineType.SmoothStep}
        >
          <Background color="#aaa" gap={gridSize} />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </div>
    </>
  );
};
