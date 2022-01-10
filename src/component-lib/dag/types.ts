import React from 'react';
import { Node as GenericNode, graphlib } from 'dagre';
export type { GraphEdge } from 'dagre';

export type Status = 'success' | 'error' | 'cancel' | 'inProgress';

export type InputNode = {
  children?: Array<string>;
  dagStyle?: React.CSSProperties;
  disable?: boolean;
  icon: string;
  iconBackground: string;
  id?: string;
  label: string;
  status: Status;
};

export type Graph = graphlib.Graph<InputNode>;

export type Node = GenericNode<InputNode>;
