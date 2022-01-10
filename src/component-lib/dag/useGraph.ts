import { useEffect, useRef, useState } from 'react';
import dagre from 'dagre';

import { setGraphNodesAndEdges, getGraphSize, getEdges, getNodeStyle } from './helpers';
import { Graph, GraphEdge, InputNode, Node } from './types';

function useGraph(nodes: { [nodeId: string]: InputNode }, fontSize: string) {
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const graphRef = useRef<Graph>();
  const edgeRef = useRef<Array<GraphEdge>>();
  const nodesRef = useRef<Array<Node>>();

  useEffect(() => {
    graphRef.current = new dagre.graphlib.Graph();
    graphRef.current.setGraph({});
    graphRef.current.setDefaultEdgeLabel(() => ({}));
    setGraphNodesAndEdges(graphRef.current, nodes, fontSize);
    graphRef.current.graph().nodesep = 2 * 100;
    dagre.layout(graphRef.current);
    nodesRef.current = graphRef.current.nodes().map((id) => {
      const node = graphRef.current.node(id);
      node.dagStyle = getNodeStyle(node);
      node.id = id;
      return node;
    });
    setCanvasSize(getGraphSize(nodesRef.current));
    edgeRef.current = getEdges(graphRef.current);
  }, [fontSize, nodes]);

  return {
    graph: graphRef.current,
    edges: edgeRef.current,
    graphNodes: nodesRef.current,
    canvasSize,
  };
}

export default useGraph;
