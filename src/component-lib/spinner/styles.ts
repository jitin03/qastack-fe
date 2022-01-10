import styled, { keyframes } from 'styled-components';

const rotator = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(270deg);
  }
`;

const dash = keyframes`
  0% {
    stroke-dashoffset: 300;
  }
  50% {
    stroke-dashoffset: 75;
    transform: rotate(135deg);
  }
  100% {
    stroke-dashoffset: 300;
    transform: rotate(450deg);
  }
`;

const Wrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const Svg = styled.svg<{ size: number }>`
  width: ${(props) => props.size}rem;
  height: ${(props) => props.size}rem;
  animation: ${rotator} 1.5s linear infinite;
`;

const Circle = styled.circle`
  stroke-dasharray: 300;
  stroke-dashoffset: 0;
  transform-origin: center;
  stroke: ${(props) => props.theme.colorPalette.p100};
  animation: ${dash} 1.5s ease-in-out infinite;
`;

export { Wrapper, Svg, Circle };
