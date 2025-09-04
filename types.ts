
import { Node, Edge } from 'reactflow';

export interface MindMapDataNode {
  label: string;
  children?: MindMapDataNode[];
}

export interface MindMapResponse {
  root: MindMapDataNode;
}

export interface FlowData {
  nodes: Node[];
  edges: Edge[];
}
