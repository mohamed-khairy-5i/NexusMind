// FIX: Import 'useCallback' from 'react' to fix the 'Cannot find name' error.
import React, { useMemo, useCallback } from 'react';
import ReactFlow, { Background, Controls, MiniMap, Node, Edge, BackgroundVariant, OnNodesChange, applyNodeChanges, NodeProps } from 'reactflow';
import CustomNode from './CustomNode';

interface MindMapProps {
    nodes: Node[];
    edges: Edge[];
    setNodes: React.Dispatch<React.SetStateAction<Node<any, string | undefined>[]>>;
    onNodeLabelChange: (nodeId: string, newLabel: string) => void;
}

const MindMap: React.FC<MindMapProps> = ({ nodes, edges, setNodes, onNodeLabelChange }) => {

  const nodeTypes = useMemo(() => ({ 
    custom: (props: NodeProps) => <CustomNode {...props} onLabelChange={onNodeLabelChange} /> 
  }), [onNodeLabelChange]);

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  
  // A dark theme for the minimap
  const minimapStyle = {
    backgroundColor: '#111827', // bg-gray-900
    borderRadius: '8px',
    border: '1px solid #4B5563' // border-gray-600
  };

  const nodeColor = (node: Node) => {
    // You can customize this function for more advanced coloring
    return '#4B5563'; // gray-600
  };

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      nodeTypes={nodeTypes}
      fitView
      fitViewOptions={{ padding: 0.2 }}
      attributionPosition="bottom-right"
      className="bg-gray-900"
    >
      <Controls 
        className="[&>button]:bg-gray-700 [&>button]:border-gray-600 [&>button:hover]:bg-gray-600 [&>button>svg]:fill-white"
      />
      <MiniMap 
        style={minimapStyle} 
        nodeColor={nodeColor}
        maskColor="rgba(31, 41, 55, 0.6)" // bg-gray-800 with opacity
      />
      <Background variant={BackgroundVariant.Dots} gap={24} size={1} color="#4B5563" />
    </ReactFlow>
  );
};

export default MindMap;