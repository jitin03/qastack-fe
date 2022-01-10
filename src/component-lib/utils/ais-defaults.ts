import { DefaultTheme } from 'styled-components';

export type Colors =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'white'
  | 'success'
  | 'warning'
  | 'error'
  | 'disabled'
  | 'inherit';

export type FontSizes =
  | 'displaytitle'
  | 'heading1'
  | 'heading2'
  | 'heading3'
  | 'text'
  | 'textsmall'
  | 'textnano';

function aisColors({ theme, color }: { theme: DefaultTheme; color: Colors }): string {
  const colorMapping = {
    default: theme.colorPalette.textPrimary,
    primary: theme.colorPalette.p100,
    secondary: theme.colorPalette.textSecondary,
    white: theme.colors.White,
    success: theme.colorPalette.suc100,
    warning: theme.colorPalette.warn100,
    error: theme.colorPalette.err100,
    disabled: theme.colorPalette.dis100,
    inherit: 'inherit',
  };

  return colorMapping[color] || 'inherit';
}

function aisFontSizes({ size }: { size: FontSizes }): string {
  const fontSize = {
    displaytitle: '2.25rem',
    heading1: '1.5rem',
    heading2: '1.25rem',
    heading3: '1rem',
    text: '0.875rem',
    textsmall: '0.75rem',
    textnano: '0.688rem',
  };

  return fontSize[size] || 'inherit';
}

export { aisColors, aisFontSizes };
