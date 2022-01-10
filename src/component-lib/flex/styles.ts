import styled from 'styled-components';
import { AlignItem, FlexDirection, JustifyContent } from './types';

export const Flex = styled.div<{
  alignItems: AlignItem;
  flexDirection: FlexDirection;
  flexWrap: boolean;
  justifyContent: JustifyContent;
}>`
  display: flex;
  flex-direction: ${(props) => props.flexDirection};
  align-items: ${(props) => props.alignItems};
  justify-content: ${(props) => props.justifyContent};
  flex-wrap: ${(props) => (props.flexWrap ? 'wrap' : 'nowrap')};
`;

export const Left = styled.div<{ spacing?: number }>`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  & > *:not(:last-child) {
    margin-right: ${({ spacing = 8 }) => spacing}px;
  }
`;

export const Right = styled.div<{ alignItems?: string; spacing?: number }>`
  display: flex;
  margin-left: auto;
  align-items: center;
  justify-content: flex-end;

  & > *:not(:first-child) {
    margin-left: ${({ spacing = 8 }) => spacing}px;
  }
`;
