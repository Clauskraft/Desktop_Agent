/**
 * TDC MUI Theme Configuration
 * 
 * Creates Material-UI theme based on TDC design tokens.
 * Supports both light and dark mode.
 */

import { createTheme, ThemeOptions } from '@mui/material/styles';
import { colors, typography, spacing, borderRadius, shadows, animation } from './tokens';

// ============================================================================
// BASE THEME OPTIONS
// ============================================================================

const baseThemeOptions: ThemeOptions = {
  typography: {
    fontFamily: typography.fontFamily.primary,
    fontSize: 16,
    
    h1: {
      fontSize: typography.fontSize['5xl'],
      fontWeight: typography.fontWeight.bold,
      lineHeight: typography.lineHeight.tight,
      letterSpacing: typography.letterSpacing.tight,
    },
    h2: {
      fontSize: typography.fontSize['4xl'],
      fontWeight: typography.fontWeight.bold,
      lineHeight: typography.lineHeight.tight,
      letterSpacing: typography.letterSpacing.tight,
    },
    h3: {
      fontSize: typography.fontSize['3xl'],
      fontWeight: typography.fontWeight.semibold,
      lineHeight: typography.lineHeight.snug,
    },
    h4: {
      fontSize: typography.fontSize['2xl'],
      fontWeight: typography.fontWeight.semibold,
      lineHeight: typography.lineHeight.snug,
    },
    h5: {
      fontSize: typography.fontSize.xl,
      fontWeight: typography.fontWeight.medium,
      lineHeight: typography.lineHeight.normal,
    },
    h6: {
      fontSize: typography.fontSize.lg,
      fontWeight: typography.fontWeight.medium,
      lineHeight: typography.lineHeight.normal,
    },
    body1: {
      fontSize: typography.fontSize.base,
      lineHeight: typography.lineHeight.normal,
    },
    body2: {
      fontSize: typography.fontSize.sm,
      lineHeight: typography.lineHeight.normal,
    },
    button: {
      fontSize: typography.fontSize.sm,
      fontWeight: typography.fontWeight.medium,
      textTransform: 'none',
      letterSpacing: typography.letterSpacing.wide,
    },
    caption: {
      fontSize: typography.fontSize.xs,
      lineHeight: typography.lineHeight.normal,
    },
  },

  shape: {
    borderRadius: parseInt(borderRadius.base),
  },

  shadows: [
    shadows.none,
    shadows.sm,
    shadows.base,
    shadows.md,
    shadows.md,
    shadows.lg,
    shadows.lg,
    shadows.xl,
    shadows.xl,
    shadows['2xl'],
    shadows['2xl'],
    shadows['2xl'],
    shadows['2xl'],
    shadows['2xl'],
    shadows['2xl'],
    shadows['2xl'],
    shadows['2xl'],
    shadows['2xl'],
    shadows['2xl'],
    shadows['2xl'],
    shadows['2xl'],
    shadows['2xl'],
    shadows['2xl'],
    shadows['2xl'],
    shadows['2xl'],
  ],

  transitions: {
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
    easing: {
      easeInOut: animation.easing.easeInOut,
      easeOut: animation.easing.easeOut,
      easeIn: animation.easing.easeIn,
      sharp: animation.easing.sharp,
    },
  },

  spacing: (factor: number) => `${0.25 * factor}rem`,

  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },

  zIndex: {
    mobileStepper: 1000,
    speedDial: 1050,
    appBar: 1100,
    drawer: 1200,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500,
  },
};

// ============================================================================
// LIGHT THEME
// ============================================================================

export const lightTheme = createTheme({
  ...baseThemeOptions,
  palette: {
    mode: 'light',
    primary: {
      main: colors.primary.main,
      light: colors.primary.light,
      dark: colors.primary.dark,
      contrastText: colors.primary.contrast,
    },
    secondary: {
      main: colors.secondary.main,
      light: colors.secondary.light,
      dark: colors.secondary.dark,
      contrastText: colors.secondary.contrast,
    },
    error: {
      main: colors.error.main,
      light: colors.error.light,
      dark: colors.error.dark,
      contrastText: colors.error.contrast,
    },
    warning: {
      main: colors.warning.main,
      light: colors.warning.light,
      dark: colors.warning.dark,
      contrastText: colors.warning.contrast,
    },
    info: {
      main: colors.info.main,
      light: colors.info.light,
      dark: colors.info.dark,
      contrastText: colors.info.contrast,
    },
    success: {
      main: colors.success.main,
      light: colors.success.light,
      dark: colors.success.dark,
      contrastText: colors.success.contrast,
    },
    background: {
      default: colors.background.light.default,
      paper: colors.background.light.paper,
    },
    text: {
      primary: colors.text.light.primary,
      secondary: colors.text.light.secondary,
      disabled: colors.text.light.disabled,
    },
    divider: colors.border.light.main,
    action: {
      active: colors.text.light.primary,
      hover: 'rgba(0, 0, 0, 0.04)',
      selected: 'rgba(0, 0, 0, 0.08)',
      disabled: colors.text.light.disabled,
      disabledBackground: 'rgba(0, 0, 0, 0.12)',
      focus: 'rgba(0, 0, 0, 0.12)',
    },
  },
});

// ============================================================================
// DARK THEME
// ============================================================================

export const darkTheme = createTheme({
  ...baseThemeOptions,
  palette: {
    mode: 'dark',
    primary: {
      main: colors.primary.light,  // Use lighter variant for dark mode
      light: colors.secondary.light,
      dark: colors.primary.main,
      contrastText: colors.primary.contrast,
    },
    secondary: {
      main: colors.secondary.main,
      light: colors.secondary.light,
      dark: colors.secondary.dark,
      contrastText: colors.secondary.contrast,
    },
    error: {
      main: colors.error.main,
      light: colors.error.light,
      dark: colors.error.dark,
      contrastText: colors.error.contrast,
    },
    warning: {
      main: colors.warning.main,
      light: colors.warning.light,
      dark: colors.warning.dark,
      contrastText: colors.warning.contrast,
    },
    info: {
      main: colors.info.main,
      light: colors.info.light,
      dark: colors.info.dark,
      contrastText: colors.info.contrast,
    },
    success: {
      main: colors.success.main,
      light: colors.success.light,
      dark: colors.success.dark,
      contrastText: colors.success.contrast,
    },
    background: {
      default: colors.background.dark.default,
      paper: colors.background.dark.paper,
    },
    text: {
      primary: colors.text.dark.primary,
      secondary: colors.text.dark.secondary,
      disabled: colors.text.dark.disabled,
    },
    divider: colors.border.dark.main,
    action: {
      active: colors.text.dark.primary,
      hover: 'rgba(255, 255, 255, 0.08)',
      selected: 'rgba(255, 255, 255, 0.16)',
      disabled: colors.text.dark.disabled,
      disabledBackground: 'rgba(255, 255, 255, 0.12)',
      focus: 'rgba(255, 255, 255, 0.12)',
    },
  },
});

// ============================================================================
// CUSTOM THEME EXTENSIONS
// ============================================================================

declare module '@mui/material/styles' {
  interface Theme {
    custom: {
      glass: {
        background: string;
        border: string;
        shadow: string;
      };
      navigation: {
        width: {
          collapsed: string;
          expanded: string;
        };
      };
    };
  }
  interface ThemeOptions {
    custom?: {
      glass?: {
        background?: string;
        border?: string;
        shadow?: string;
      };
      navigation?: {
        width?: {
          collapsed?: string;
          expanded?: string;
        };
      };
    };
  }
}

// Add custom properties to themes
lightTheme.custom = {
  glass: {
    background: colors.glass.light.background,
    border: colors.glass.light.border,
    shadow: colors.glass.light.shadow,
  },
  navigation: {
    width: {
      collapsed: '72px',
      expanded: '280px',
    },
  },
};

darkTheme.custom = {
  glass: {
    background: colors.glass.dark.background,
    border: colors.glass.dark.border,
    shadow: colors.glass.dark.shadow,
  },
  navigation: {
    width: {
      collapsed: '72px',
      expanded: '280px',
    },
  },
};

// ============================================================================
// EXPORTS
// ============================================================================

export { lightTheme as default };
