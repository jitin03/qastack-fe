import React, { useRef, useState, useLayoutEffect, useCallback } from 'react';
import classnames from 'classnames';

import * as Styled from './styles';
import * as customClasses from './classes';
import useGraph from './useGraph';
import Spinner from '../spinner';
import { InputNode } from './types';

const MIN_ZOOM = 0.2;
const MAX_ZOOM = 5;
const zoomChangeSize = 0.1;

const statusIcons = {
  success: <Styled.SuccessIcon size="small" name="check_circle" />,
  error: <Styled.ErrorIcon size="small" name="error" />,
  cancel: <Styled.ErrorIcon size="small" name="cancel" />,
  stop: <Styled.ErrorIcon size="small" name="stop_circle" />,
  inProgress: <Spinner size={1} />,
};

export type DAGProps = {
  caption?: React.ReactNode;
  fontSize?: string;
  hoverIcons: Array<(nodeId: string) => React.ReactNode>;
  nodes?: { [nodeId: string]: InputNode };
  onNodeSelect?: (nodeId: string) => void;
  renderActions?: (props: {
    zoomIn: () => void;
    zoomOut: () => void;
    zoomOptions: {
      zoomInEnabled: boolean;
      zoomOutEnabled: boolean;
    };
  }) => React.ReactNode;
  selectedNode?: string;
  zoomLevel?: number;
};

function DAG({
  caption = null,
  fontSize = '0.875rem',
  hoverIcons,
  nodes = {},
  onNodeSelect = () => null,
  renderActions = () => null,
  selectedNode,
  zoomLevel = 1,
}: DAGProps) {
  const isAdjusted = useRef(false);
  const containerRef = useRef<HTMLDivElement>();
  const canvasRef = useRef<HTMLDivElement>();
  const canvasCords = useRef({ xPos: 0, yPos: 0 });
  const [hoveredNode, setHoveredNode] = useState(null);
  const [curZoomLevel, setZoomLevel] = useState(zoomLevel);

  const handleZoomIn = () => {
    let updatedZoomLevel = Math.min(MAX_ZOOM, curZoomLevel + zoomChangeSize);
    updatedZoomLevel = parseFloat(updatedZoomLevel.toFixed(1));
    setZoomLevel(updatedZoomLevel);
  };

  const handleZoomOut = () => {
    let updatedZoomLevel = Math.max(MIN_ZOOM, curZoomLevel - zoomChangeSize);
    updatedZoomLevel = parseFloat(updatedZoomLevel.toFixed(1));
    setZoomLevel(updatedZoomLevel);
  };

  const { canvasSize, edges = [], graphNodes = [] } = useGraph(nodes, fontSize);

  useLayoutEffect(() => {
    const allowedZoom = Math.min(Math.max(curZoomLevel, MIN_ZOOM), MAX_ZOOM);
    canvasRef.current.style.transform = `scale(${allowedZoom})`;
  }, [curZoomLevel]);

  useLayoutEffect(() => {
    if (isAdjusted.current === false) {
      const containerWidth = containerRef.current.offsetWidth;
      const left = Math.floor((containerWidth - canvasSize.width) / 2);
      canvasRef.current.style.left = `${left}px`;
      canvasRef.current.style.top = `${Math.floor(canvasSize.height * 0.1)}px`;
    }
  }, [canvasSize]);

  const handleMouseMove = useCallback((e) => {
    isAdjusted.current = true;
    const canvas = canvasRef.current;
    canvas.style.left = `${e.clientX - canvasCords.current.xPos}px`;
    canvas.style.top = `${e.clientY - canvasCords.current.yPos}px`;
  }, []);

  const handleNodeClicked = (id: string) => {
    if (selectedNode !== id) {
      onNodeSelect(id);
    }
  };

  const handleMouseUp = (event: React.MouseEvent) => {
    if (event.target === canvasRef.current) {
      handleNodeClicked(null);
    }
    containerRef.current.style.cursor = 'grab';
    containerRef.current.removeEventListener('mousemove', handleMouseMove);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    containerRef.current.addEventListener('mousemove', handleMouseMove);
    const canvas = canvasRef.current;
    containerRef.current.style.cursor = 'grabbing';
    canvasCords.current.xPos = e.clientX - canvas.offsetLeft;
    canvasCords.current.yPos = e.clientY - canvas.offsetTop;
  };

  const handleMouseLeave = () => setHoveredNode(null);

  return (
    <Styled.DAGContainer
      ref={containerRef}
      className={customClasses.dagContainerClass}
      onMouseUp={handleMouseUp}
      onMouseDown={handleMouseDown}
    >
      <Styled.Canvas
        ref={canvasRef}
        onDragStart={() => false}
        style={{ width: canvasSize.width, height: canvasSize.height }}
      >
        {graphNodes.map((node) => {
          const { id, label, icon, dagStyle, iconBackground, disable, status } = node;
          const nodeClass = classnames(customClasses.dagNodeClass, iconBackground, {
            active: id === selectedNode,
            disable,
          });
          return (
            <Styled.NodeWrapper
              key={`${id}-${label}`}
              style={dagStyle}
              onMouseEnter={() => setHoveredNode(id)}
              onMouseLeave={handleMouseLeave}
              className="node"
            >
              <Styled.Node className={nodeClass} onClick={() => handleNodeClicked(id)}>
                <Styled.NodeIcon name={icon} className={classnames(iconBackground, { disable })} />
                <Styled.NodeLabel>{label}</Styled.NodeLabel>
                {Boolean(status) && (
                  <Styled.StatusIconWrapper>{statusIcons[status]}</Styled.StatusIconWrapper>
                )}
              </Styled.Node>
              {hoveredNode === id && hoverIcons && hoverIcons.length > 0 && (
                <Styled.HoverIcons>
                  {hoverIcons.map((hoverIcon, i) => (
                    <React.Fragment key={i}>{hoverIcon(id)}</React.Fragment>
                  ))}
                </Styled.HoverIcons>
              )}
            </Styled.NodeWrapper>
          );
        })}
        {edges.map((edge) => (
          <div key={`${edge.from}-${edge.to}`} className="edge">
            {edge.lines.map((line: React.CSSProperties, i: number) => (
              <Styled.Edge
                key={`${edge.from}-${i}-${edge.to}`}
                className={classnames({ arrow: i === edge.lines.length - 1 })}
                style={line}
              />
            ))}
          </div>
        ))}
      </Styled.Canvas>
      {Boolean(caption) && <Styled.Caption>{caption}</Styled.Caption>}
      <Styled.ActionsContainer>
        {renderActions({
          zoomIn: handleZoomIn,
          zoomOut: handleZoomOut,
          zoomOptions: {
            zoomInEnabled: curZoomLevel < MAX_ZOOM,
            zoomOutEnabled: curZoomLevel > MIN_ZOOM,
          },
        })}
      </Styled.ActionsContainer>
    </Styled.DAGContainer>
  );
}

export default DAG;
