import React, { PropsWithChildren } from 'react';
import { ThemeProvider as StyledComponentsThemeProvider, DefaultTheme } from 'styled-components';
import defaultTheme from './theme';

import mergeDeep from '../utils/deep-merge';

function ThemeProvider({
  theme = {},
  children,
}: PropsWithChildren<{ theme: Partial<DefaultTheme> }>): JSX.Element {
  const mergedTheme = mergeDeep<DefaultTheme>(defaultTheme, theme);

  return (
    <StyledComponentsThemeProvider theme={mergedTheme}>{children}</StyledComponentsThemeProvider>
  );
}

export default ThemeProvider;
