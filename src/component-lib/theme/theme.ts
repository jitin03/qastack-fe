import { DefaultTheme } from 'styled-components';
import * as colors from './colors';

export const colorPalette = {
  p100: colors.Blue_100,
  p30: colors.Blue_30,
  p20: colors.Blue_20,
  p10: colors.Blue_10,
  p140: colors.Blue_140,
  p180: colors.Blue_180,

  dis100: colors.Black_30,
  dis30: colors.Black_10,

  err100: colors.Scarlet_Red_100,
  err10: colors.Scarlet_Red_10,
  suc100: colors.Dark_Grass_Green_100,
  suc10: colors.Dark_Grass_Green_10,
  warn100: colors.Orangey_Yellow_100,

  textPrimary: colors.Black_87,
  textSecondary: colors.Black_50,

  border: colors.Mercury,
  primaryBackground: colors.Alabaster,
  secondaryBackground: colors.Wild_Sand,
  white: colors.White,
};

export const fontFamily = {
  normal: 'neue-haas-grotesk-text, "Helvetica Neue", Arial, sans-serif',
  mono: '"Roboto Mono", monospace',
};

export const fontWeight = {
  normal: 400,
  bold: 500,
};

export const spacing = 8;

export const zIndex = {
  tooltip: 1500,
  modal: 1300,
  drawer: 1200,
  popover: 1400,
  fixedTable: 30,
};

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  export interface DefaultTheme {
    colorPalette: typeof colorPalette;
    fontFamily: typeof fontFamily;
    fontWeight: typeof fontWeight;
    spacing: number;
    zIndex: typeof zIndex;
    colors: typeof colors;
  }
}

const theme: DefaultTheme = {
  colorPalette,
  fontFamily,
  fontWeight,
  spacing,
  zIndex,
  colors,
};

export { colors };
export default theme;
