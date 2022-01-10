import styled from 'styled-components';
import { aisColors, Colors } from '../utils/ais-defaults';

const sizes: { [size: string]: string } = {
  small: '1',
  medium: '1.5',
  large: '2.25',
};

export const IconWrapper = styled.span<{ color: Colors; size: string }>`
  color: ${aisColors};
  font-size: ${(props) => sizes[props.size]}rem;
  height: ${(props) => sizes[props.size]}rem;
  width: ${(props) => sizes[props.size]}rem;
`;
