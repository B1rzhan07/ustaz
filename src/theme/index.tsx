import React, { useMemo, ReactNode } from 'react'

import { CssBaseline } from '@mui/material'
import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
  StyledEngineProvider,
} from '@mui/material/styles'

import breakpoints from './breakpoints'
import { componentsOverrides } from './overrides'
import palette from './palette'
import shadows, { customShadows } from './shadows'
import typography from './typography'
import zIndex from './zIndex'

type Props = {
  children: ReactNode
}

export default function ThemeProvider({ children }: Props) {
  const theme = useMemo(
    () =>
      createTheme({
        palette: palette.light,
        typography,
        breakpoints,
        shape: { borderRadius: 8 },
        shadows: shadows.light,
        customShadows: customShadows.light,
        zIndex,
      }),
    [],
  )

  theme.components = componentsOverrides(theme)

  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  )
}
