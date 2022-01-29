import React, { useState, useCallback } from "react";
import ReactFlow, {
  ReactFlowProvider,
  removeElements,
  addEdge,
  useZoomPanHelper,
} from "react-flow-renderer";
// import localforage from "localforage";

// // import "./save.css";

// localforage.config({
//   name: "react-flow-docs",
//   storeName: "flows",
// });

const flowKey = "example-flow";

const getNodeId = () => `randomnode_${+new Date()}`;
const initialElements = [
  { id: "1", data: { label: "Node 1" }, position: { x: 300, y: 100 } },
  { id: "2", data: { label: "Node 2" }, position: { x: 300, y: 200 } },
  { id: "e1-2", source: "1", target: "2" },
];

const WorkFlowLogs = () => {
  const [rfInstance, setRfInstance] = useState(null);
  const [elements, setElements] = useState(initialElements);
  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));
  const onConnect = (params) => setElements((els) => addEdge(params, els));

  return (
    <ReactFlowProvider>
      <div style={{ height: 300 }}>
        <ReactFlow
          elements={elements}
          onElementsRemove={onElementsRemove}
          onConnect={onConnect}
          onLoad={setRfInstance}
        ></ReactFlow>
      </div>
    </ReactFlowProvider>
  );
};

export default WorkFlowLogs;
