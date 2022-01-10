import { Node, GraphEdge, Graph, InputNode } from './types';

const NODE_HEIGHT = 34;
const ICON_SIZE_MARGIN = 52;

export const getGraphSize = (nodes: Array<Node>) =>
  nodes.reduce(
    (obj, node) => ({
      width: Math.max(node.x + node.width / 2, obj.width),
      height: Math.max(node.y + node.height / 2, obj.height),
    }),
    { width: 0, height: 0 },
  );

export const getNodeStyle = ({ x, y, width, height }: Node) => ({
  left: x - width / 2,
  top: y - height / 2,
});

export const getEdgeStyle = ({ x1, x2, y1, y2 }: GraphEdge) => {
  const distance = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
  const xMid = (x1 + x2) / 2;
  const yMid = (y1 + y2) / 2;
  const angle = (Math.atan2(y1 - y2, x1 - x2) * 180) / Math.PI;

  return {
    width: distance,
    left: xMid - distance / 2,
    top: yMid,
    transform: ` rotate(${angle}deg)`,
  };
};

export const setGraphNodesAndEdges = (
  graph: Graph,
  nodes: { [nodeId: string]: InputNode },
  fontSize: string,
) => {
  const text = document.createElement('span');
  text.style.fontSize = fontSize;
  text.style.position = 'absolute';
  document.body.appendChild(text);
  // TODO : Append child at the same moment to calculate width
  Object.keys(nodes).forEach((nodeId) => {
    const node = nodes[nodeId];
    text.textContent = node.label;
    const statusIconMargin = node.status ? 24 : 0;
    const width = Math.ceil(text.clientWidth) + statusIconMargin + ICON_SIZE_MARGIN; // 52 is icon size + margin
    graph.setNode(nodeId, { width, height: NODE_HEIGHT, ...node });
    (node.children || []).forEach((childId) => {
      if (nodes[childId]) {
        graph.setEdge(nodeId, childId);
      }
    });
  });

  document.body.removeChild(text);
};

export const getEdges = (graph: Graph): Array<GraphEdge> =>
  graph.edges().map((edgeInfo) => {
    const edgePoints = graph.edge(edgeInfo).points || [];
    const lines: Array<ReturnType<typeof getEdgeStyle>> = [];

    if (edgePoints.length > 1) {
      for (let i = 1; i < edgePoints.length; i += 1) {
        lines.push(
          getEdgeStyle({
            x1: edgePoints[i - 1].x,
            y1: edgePoints[i - 1].y,
            x2: edgePoints[i].x,
            y2: edgePoints[i].y,
            points: edgePoints,
          }),
        );
      }
    }

    return { from: edgeInfo.v, to: edgeInfo.w, lines, points: edgePoints };
  });
