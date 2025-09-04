
import React, { useState, useCallback, useEffect } from 'react';
import { Node, Edge, Position } from 'reactflow';
import { MindMapResponse, MindMapDataNode } from '../types';
import { generateMindMap, isApiKeyAvailable } from '../services/geminiService';
import TopicForm from '../components/TopicForm';
import MindMap from '../components/MindMap';
import Loader from '../components/Loader';
import Welcome from '../components/Welcome';

const NODE_WIDTH = 180;
const NODE_HEIGHT = 50;
const HORIZONTAL_SPACING = 100;
const VERTICAL_SPACING = 80;

const getInitialState = () => {
  try {
    const savedState = localStorage.getItem('mindMapSave');
    if (savedState) {
      const { topic, nodes, edges } = JSON.parse(savedState);
      if (topic && Array.isArray(nodes) && Array.isArray(edges)) {
        return { initialTopic: topic, initialNodes: nodes, initialEdges: edges };
      }
    }
  } catch (error) {
    console.error("Failed to load state from localStorage", error);
  }
  return { initialTopic: '', initialNodes: [], initialEdges: [] };
};


const transformToFlowData = (data: MindMapResponse): { nodes: Node[], edges: Edge[] } => {
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  let idCounter = 0;

  const processNode = (
      nodeData: MindMapDataNode, 
      parentId: string | null = null, 
      level: number = 0, 
      siblingIndex: number = 0, 
      numSiblings: number = 1
  ): string => {
      const id = `${level}-${idCounter++}`;
      nodes.push({
          id,
          type: 'custom',
          data: { label: nodeData.label },
          position: { x: 0, y: 0 }, // Position will be calculated later
          sourcePosition: Position.Right,
          targetPosition: Position.Left,
      });

      if (parentId) {
          edges.push({
              id: `e-${parentId}-${id}`,
              source: parentId,
              target: id,
              type: 'smoothstep',
              animated: true,
          });
      }

      if (nodeData.children) {
          nodeData.children.forEach((child, index) => {
              processNode(child, id, level + 1, index, nodeData.children!.length);
          });
      }
      return id;
  };

  processNode(data.root);
  return { nodes, edges };
};

const layoutNodes = (nodes: Node[], edges: Edge[]): Node[] => {
    if (nodes.length === 0) return [];

    const graph = new Map<string, string[]>();
    nodes.forEach(node => graph.set(node.id, []));
    edges.forEach(edge => graph.get(edge.source)?.push(edge.target));

    const nodeHeights = new Map<string, number>();
    
    const calculateHeight = (nodeId: string): number => {
        if (nodeHeights.has(nodeId)) return nodeHeights.get(nodeId)!;

        const children = graph.get(nodeId) || [];
        if (children.length === 0) {
            nodeHeights.set(nodeId, NODE_HEIGHT);
            return NODE_HEIGHT;
        }

        const childrenHeight = children
            .map(calculateHeight)
            .reduce((sum, h) => sum + h, 0) + (children.length - 1) * VERTICAL_SPACING;
        
        nodeHeights.set(nodeId, childrenHeight);
        return childrenHeight;
    };
    
    calculateHeight(nodes[0].id);

    const laidOutNodes = new Map<string, Node>();

    const positionNodes = (nodeId: string, x: number, y: number) => {
        const originalNode = nodes.find(n => n.id === nodeId)!;
        laidOutNodes.set(nodeId, {
            ...originalNode,
            position: { x, y: y - nodeHeights.get(nodeId)! / 2 },
        });

        const children = graph.get(nodeId) || [];
        let currentY = y - (nodeHeights.get(nodeId)! / 2);
        
        children.forEach(childId => {
            const childHeight = nodeHeights.get(childId)!;
            positionNodes(childId, x + NODE_WIDTH + HORIZONTAL_SPACING, currentY + childHeight / 2);
            currentY += childHeight + VERTICAL_SPACING;
        });
    };
    
    positionNodes(nodes[0].id, 0, calculateHeight(nodes[0].id)/2);

    return Array.from(laidOutNodes.values());
};

const ApiConfigurationBanner: React.FC = () => (
    <div className="bg-red-900/50 border border-red-500 text-red-300 px-4 py-3 rounded-lg text-center max-w-2xl mx-auto" role="alert">
        <strong className="font-bold">Configuration Required: </strong>
        <span className="block sm:inline">
            The API Key is not set. Please configure it in your deployment environment to enable mind map generation.
        </span>
    </div>
);


const AppPage: React.FC = () => {
  const { initialTopic, initialNodes, initialEdges } = getInitialState();
  const [topic, setTopic] = useState<string>(initialTopic);
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isApiConfigured, setIsApiConfigured] = useState<boolean>(true);

  useEffect(() => {
    // Check for API key on component mount
    setIsApiConfigured(isApiKeyAvailable());
  }, []);
  
  useEffect(() => {
    // Only save if there's a map on the canvas
    if (nodes.length === 0 && edges.length === 0) return;

    const handler = setTimeout(() => {
        try {
            const stateToSave = { topic, nodes, edges };
            localStorage.setItem('mindMapSave', JSON.stringify(stateToSave));
        } catch (error) {
            console.error("Failed to save state to localStorage", error);
        }
    }, 1000); // Debounce save by 1 second

    return () => {
        clearTimeout(handler);
    };
  }, [topic, nodes, edges]);

  const handleGenerate = useCallback(async () => {
    if (!topic.trim()) {
      setError('Please enter a topic to generate a mind map.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setNodes([]);
    setEdges([]);

    try {
      const mindMapData = await generateMindMap(topic);
      const { nodes: newNodes, edges: newEdges } = transformToFlowData(mindMapData);
      const laidOutNodes = layoutNodes(newNodes, newEdges);
      setNodes(laidOutNodes);
      setEdges(newEdges);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [topic]);

  const handleNodeLabelChange = useCallback((nodeId: string, newLabel: string) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === nodeId) {
          return {
            ...node,
            data: {
              ...node.data,
              label: newLabel,
            },
          };
        }
        return node;
      })
    );
  }, [setNodes]);

  return (
    <div className="flex flex-col h-full p-4 md:p-6 gap-6">
      <TopicForm 
        topic={topic}
        setTopic={setTopic}
        onGenerate={handleGenerate}
        isLoading={isLoading || !isApiConfigured}
      />

      {!isApiConfigured && <ApiConfigurationBanner />}

      {error && (
          <div className="bg-red-900/50 border border-red-500 text-red-300 px-4 py-3 rounded-lg text-center max-w-2xl mx-auto" role="alert">
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{error}</span>
          </div>
      )}
      <div className="relative flex-grow bg-gray-900 border-2 border-gray-700 rounded-2xl shadow-2xl shadow-indigo-900/20 overflow-hidden min-h-[60vh]">
        {isLoading && <Loader />}
        {nodes.length > 0 ? (
           <MindMap 
              nodes={nodes} 
              edges={edges} 
              setNodes={setNodes} 
              onNodeLabelChange={handleNodeLabelChange}
          />
        ) : !isLoading && !error && (
          <Welcome />
        )}
      </div>
    </div>
  );
};

export default AppPage;
