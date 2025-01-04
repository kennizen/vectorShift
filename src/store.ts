// store.js

import { create } from "zustand";
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
  Edge,
  NodeChange,
  EdgeChange,
  Connection,
} from "reactflow";
import { v4 as uuid } from "uuid";
import { CustomNode } from "./constants/nodes";

export interface Store {
  nodes: CustomNode[];
  edges: Edge[];
  getNodeID: (type: string) => string;
  addNode: (node: CustomNode) => void;
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onConnect: (connection: Connection) => void;
  updateNodeField: (nodeId: string, fieldName: string, fieldValue: string) => void;
}

export const useStore = create<Store>()((set, get) => ({
  nodes: [],
  edges: [],
  getNodeID: () => {
    return uuid();
  },
  addNode: (node) => {
    set({
      nodes: [...get().nodes, node],
    });
  },
  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection) => {
    console.log("on connect", connection);

    set({
      edges: addEdge(
        {
          ...connection,
          type: "smoothstep",
          animated: true,
          markerEnd: { type: MarkerType.Arrow, height: 30, width: 30, color: "#7c79d2" },
          style: {
            stroke: "var(--primary-color)",
          },
        },
        get().edges
      ),
    });
  },
  updateNodeField: (nodeId, fieldName, fieldValue) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          node.data = { ...node.data, [fieldName]: fieldValue };
        }
        return node;
      }),
    });
  },
}));
