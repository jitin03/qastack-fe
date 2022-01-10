import styled from 'styled-components';

import Flex from '../flex';
import { Black_50, Blue_100, Blue_30, Purpley_100, Purpley_30, White } from '../theme/colors';
import Icon from '../icon';

export const ActionsContainer = styled(Flex)`
  right: 48px;
  bottom: 48px;
  align-items: flex-end;
  position: absolute;
`;

export const Caption = styled.div`
  position: absolute;
  bottom: 0.75rem;
  left: 0.75rem;
  background-color: ${(props) => props.theme.colorPalette.p20};
  width: 19rem;
`;

export const Canvas = styled.div`
  position: relative;
`;

export const DAGContainer = styled.div`
  width: 100%;
  overflow: hidden;
  height: 100%;
  background: ${(props) => props.theme.colorPalette.p10};
  position: relative;
  cursor: grab;
`;

export const Edge = styled.div`
  position: absolute;
  border-top: 1px dashed ${Black_50};

  &.arrow {
    &:after {
      position: absolute;
      color: #a3a3a3; /* TODO: take from theme */
      font-size: 0.75rem;
      top: -9px;
      left: -1px;
      transform: rotate(180deg);
      content: '\u25BA';
    }
  }
`;

export const HoverIcons = styled.div`
  border-radius: 4px;
  margin-left: 4px;
  background: ${(props) => props.theme.colorPalette.p20};
  display: flex;
  align-items: center;
  z-index: 1;
  padding: 0px 0.5rem;
  &:empty {
    padding: 0;
  }
`;

export const Node = styled.div`
  background-color: ${White};
  cursor: pointer;
  display: flex;
  align-items: center;
  z-index: 1;
  border: 1px solid transparent;

  &.teal {
    border-color: ${Blue_100};
    &.active {
      background: ${Blue_30};
    }
  }

  &.liliac {
    border-color: ${Purpley_100};
    &.active {
      background: ${Purpley_30};
    }
  }

  &.disable {
    border-color: ${(props) => props.theme.colorPalette.dis100};
    &.active {
      background: ${(props) => props.theme.colorPalette.dis30};
    }
  }
`;

export const StatusIconWrapper = styled.span`
  padding-right: 0.5rem;
  display: inline-flex;
`;

export const NodeIcon = styled(Icon)`
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${White};

  &.teal {
    background: ${(props) => props.theme.colorPalette.p100};
  }

  &.liliac {
    background: ${Purpley_100};
  }

  &.disable {
    background: ${(props) => props.theme.colorPalette.dis100};
  }
`;

export const SuccessIcon = styled(Icon)`
  color: ${(props) => props.theme.colorPalette.suc100};
`;

export const ErrorIcon = styled(Icon)`
  color: ${(props) => props.theme.colorPalette.err100};
`;

export const NodeLabel = styled.div`
  margin: 0 0.5rem;
  font-size: 0.875rem;
`;

export const NodeWrapper = styled.div`
  position: absolute;
  display: flex;
  white-space: nowrap;
`;
