import React, { useState, useCallback, useEffect } from "react";
import ReactFlow, {
  ReactFlowProvider,
  removeElements,
  addEdge,
  useZoomPanHelper,
  Controls,
  Background,
  isNode,
  Position,
  NodeExtent,
  Edge,
} from "react-flow-renderer";
import "./layouting.css";
import dagre from "dagre";

const getNodeId = () => `randomnode_${+new Date()}`;

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));
const position = { x: 0, y: 0 };
// In order to keep this example simple the node width and height are hardcoded.
// In a real world app you would use the correct width and height values of
// const nodes = useStoreState(state => state.nodes) and then node.__rf.width, node.__rf.height

const nodeWidth = 172;
const nodeHeight = 36;

const nodeExtent = [
  [0, 0],
  [1000, 1000],
];

const getLayoutedElements = (elements, direction = "TB") => {
  const isHorizontal = direction === "LR";
  dagreGraph.setGraph({ rankdir: direction });

  elements.forEach((el) => {
    if (isNode(el)) {
      dagreGraph.setNode(el.id, { width: nodeWidth, height: nodeHeight });
    } else {
      dagreGraph.setEdge(el.source, el.target);
    }
  });

  dagre.layout(dagreGraph);

  return elements.map((el, index) => {
    if (isNode(el)) {
      const nodeWithPosition = dagreGraph.node(el.id);
      el.targetPosition = isHorizontal ? "left" : "top";
      el.sourcePosition = isHorizontal ? "right" : "bottom";

      console.log("--nodeWithPosition--", nodeWithPosition);
      // unfortunately we need this little hack to pass a slightly different position
      // to notify react flow about the change. Moreover we are shifting the dagre node position
      // (anchor=center center) to the top left so it matches the react flow node anchor point (top left).
      // el.position = {
      //   x: nodeWithPosition.x - nodeWidth / 2 + Math.random() / 1000,
      //   y: nodeWithPosition.y - nodeHeight / 2,
      // };
      el.position = {
        x: nodeWithPosition.x + Math.random() / 1000,
        y: nodeWithPosition.y,
      };
    }

    return el;
  });
};

const WorkFlow = ({ elements, setElements }) => {
  const [workflowElements, setWorkFlowElements] = useState([]);
  console.log("--elements--", workflowElements);
  const [rfInstance, setRfInstance] = useState(null);
  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));
  const onConnect = (params) => setElements((els) => addEdge(params, els));

  const onLayout = (direction) => {
    console.log("layout called");
    const isHorizontal = direction === "LR";
    dagreGraph.setGraph({ rankdir: direction });

    elements.forEach((el) => {
      if (isNode(el)) {
        dagreGraph.setNode(el.id, { width: 150, height: 50 });
      } else {
        dagreGraph.setEdge(el.source, el.target);
      }
    });

    dagre.layout(dagreGraph);

    const layoutedElements = elements.map((el, index) => {
      if (isNode(el)) {
        const nodeWithPosition = dagreGraph.node(index);
        el.targetPosition = isHorizontal ? Position.Left : Position.Top;
        el.sourcePosition = isHorizontal ? Position.Right : Position.Bottom;
        // we need to pass a slightly different position in order to notify react flow about the change
        // @TODO how can we change the position handling so that we dont need this hack?
        el.position = {
          x: nodeWithPosition.x + Math.random() / 1000,
          y: nodeWithPosition.y,
        };
      }

      return el;
    });
    console.log("---layoutedElements---", layoutedElements);
    setWorkFlowElements(layoutedElements);
  };

  const onAdd = useCallback(() => {
    const newNode = {
      id: getNodeId(),
      data: { label: "Added node" },
      position: {
        x: 100,
        y: 100,
      },
    };
    setElements((els) => els.concat(newNode));
  }, [setElements]);

  useEffect(() => {
    console.log("layout called");
    const direction = "TB";
    const isHorizontal = direction === "LR";
    dagreGraph.setGraph({ rankdir: direction });

    elements.forEach((el) => {
      if (isNode(el)) {
        dagreGraph.setNode(el.id, { width: 150, height: 50 });
      } else {
        dagreGraph.setEdge(el.source, el.target);
      }
    });

    dagre.layout(dagreGraph);

    const layoutedElements = elements.map((el, index) => {
      if (isNode(el)) {
        const nodeWithPosition = dagreGraph.node(el.id);
        el.targetPosition = isHorizontal ? Position.Left : Position.Top;
        el.sourcePosition = isHorizontal ? Position.Right : Position.Bottom;
        // we need to pass a slightly different position in order to notify react flow about the change
        // @TODO how can we change the position handling so that we dont need this hack?
        el.position = {
          x: nodeWithPosition.x + Math.random() / 1000,
          y: nodeWithPosition.y,
        };
      }

      return el;
    });
    console.log("---layoutedElements---", layoutedElements);
    setWorkFlowElements(layoutedElements);
  }, [elements]);
  const customNodeStyles = {
    background: "#9CA8B3",
    color: "#FFF",
    padding: 10,
  };
  const CustomNodeComponent = ({ data }) => {
    return (
      <div style={customNodeStyles}>
        <div>{data.text}</div>
        <div>Test</div>
      </div>
    );
  };
  const nodeTypes = {
    special: CustomNodeComponent,
  };
  return (
    <div className="layoutflow">
      <ReactFlowProvider>
        <ReactFlow
          elements={workflowElements}
          onElementsRemove={onElementsRemove}
          // connectionLineType="smoothstep"
          onConnect={onConnect}
          onLoad={setRfInstance}
          // onLoad={() => onLayout("TB")}
          snapToGrid={true}
          // nodeExtent={nodeExtent}
          snapGrid={[15, 15]}
          nodeTypes={nodeTypes}
        >
          <Controls />
          <Background variant="dots" color="#aaa" gap={16} size={0.8} />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
};

export default WorkFlow;
