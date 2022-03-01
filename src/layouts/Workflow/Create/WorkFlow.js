import React, { useState, useCallback } from "react";
import ReactFlow, {
  ReactFlowProvider,
  removeElements,
  addEdge,
  useZoomPanHelper,
  Controls,
  Background,
} from "react-flow-renderer";
// import localforage from "localforage";

// // import "./save.css";

// localforage.config({
//   name: "react-flow-docs",
//   storeName: "flows",
// });

const flowKey = "example-flow";

const getNodeId = () => `randomnode_${+new Date()}`;

const WorkFlow = ({ elements, setElements }) => {
  console.log("--elements--", elements);
  const [rfInstance, setRfInstance] = useState(null);
  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));
  const onConnect = (params) => setElements((els) => addEdge(params, els));
  //   const { transform } = useZoomPanHelper();

  //   const onSave = useCallback(() => {
  //     if (rfInstance) {
  //       const flow = rfInstance.toObject();
  //       localforage.setItem(flowKey, flow);
  //     }
  //   }, [rfInstance]);

  //   const onRestore = useCallback(() => {
  //     const restoreFlow = async () => {
  //       const flow = await localforage.getItem(flowKey);

  //       if (flow) {
  //         const [x = 0, y = 0] = flow.position;
  //         setElements(flow.elements || []);
  //         transform({ x, y, zoom: flow.zoom || 0 });
  //       }
  //     };

  //     restoreFlow();
  //   }, [setElements, transform]);

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

  return (
    <ReactFlowProvider>
      <ReactFlow
        elements={elements}
        onElementsRemove={onElementsRemove}
        onConnect={onConnect}
        onLoad={setRfInstance}
        snapToGrid={true}
        snapGrid={[15, 15]}
      >
        <Controls />
        <Background variant="dots" color="#aaa" gap={16} size={0.8} />
      </ReactFlow>
    </ReactFlowProvider>
  );
};

export default WorkFlow;
