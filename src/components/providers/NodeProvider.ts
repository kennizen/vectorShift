import { createContext, useContext } from "react";

type NodeCtxType = {
  parentId: string;
  zoom: number
};

export const NodeCtx = createContext<NodeCtxType | null>(null);

export function useNodeCtx() {
  const ctx = useContext(NodeCtx);
  if (!ctx) throw new Error("Cannot access node ctx outside of the node ctx provider");
  return ctx;
}
