/**
 * TDC Corporate Visual Identity - Design Tokens
 * 
 * This file contains all design tokens for the TDC brand.
 * NO other file should contain hard-coded colors, spacing, or typography values.
 * 
 * @see docs/brand/TDC-CVI.md for brand guidelines
 */

// ============================================================================
// COLOR TOKENS
// ============================================================================

export const colors = {
  // Primary Brand Colors
  primary: {
    main: '#003D7A',      // Digital Blue - Primary brand color
    light: '#0066CC',     // Light Blue - Lighter variant
    dark: '#002147',      // Dark Blue - Darker variant
    contrast: '#FFFFFF',  // White text on primary
  },

  // Secondary Brand Colors
  secondary: {
    main: '#4DA6FF',      // Sky Blue - Accent color
    light: '#80BFFF',     // Light Sky Blue
    dark: '#1A8FFF',      // Dark Sky Blue
    contrast: '#FFFFFF',  // White text on secondary
  },

  // Semantic Colors
  success: {
    main: '#28A745',
    light: '#48C76F',
    dark: '#1E7E34',
    contrast: '#FFFFFF',
  },

  warning: {
    main: '#FFC107',
    light: '#FFD54F',
    dark: '#FFA000',
    contrast: '#000000',
  },

  error: {
    main: '#DC3545',
    light: '#E57373',
    dark: '#C62828',
    contrast: '#FFFFFF',
  },

  info: {
    main: '#17A2B8',
    light: '#4FC3F7',
    dark: '#0288D1',
    contrast: '#FFFFFF',
  },

  // Neutral Colors (Light Mode)
  neutral: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },

  // Background Colors
  background: {
    light: {
      default: '#FFFFFF',
      paper: '#F5F7FA',
      elevated: '#FFFFFF',
    },
    dark: {
      default: '#0A0E1A',
      paper: '#1A1F2E',
      elevated: '#242938',
    },
  },

  // Text Colors
  text: {
    light: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.60)',
      disabled: 'rgba(0, 0, 0, 0.38)',
    },
    dark: {
      primary: 'rgba(255, 255, 255, 0.95)',
      secondary: 'rgba(255, 255, 255, 0.70)',
      disabled: 'rgba(255, 255, 255, 0.50)',
    },
  },

  // Border Colors
  border: {
    light: {
      main: 'rgba(0, 0, 0, 0.12)',
      light: 'rgba(0, 0, 0, 0.08)',
      dark: 'rgba(0, 0, 0, 0.23)',
    },
    dark: {
      main: 'rgba(255, 255, 255, 0.12)',
      light: 'rgba(255, 255, 255, 0.08)',
      dark: 'rgba(255, 255, 255, 0.23)',
    },
  },

  // Glassmorphism
  glass: {
    light: {
      background: 'rgba(255, 255, 255, 0.80)',
      border: 'rgba(255, 255, 255, 0.30)',
      shadow: 'rgba(0, 61, 122, 0.08)',
    },
    dark: {
      background: 'rgba(26, 31, 46, 0.80)',
      border: 'rgba(255, 255, 255, 0.10)',
      shadow: 'rgba(0, 0, 0, 0.30)',
    },
  },
} as const;

// ============================================================================
// TYPOGRAPHY TOKENS
// ============================================================================

export const typography = {
  // Font Families
  fontFamily: {
    primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    mono: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
  },

  // Font Sizes
  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem',    // 48px
    '6xl': '3.75rem', // 60px
  },

  // Font Weights
  fontWeight: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },

  // Line Heights
  lineHeight: {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },

  // Letter Spacing
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
} as const;

// ============================================================================
// SPACING TOKENS
// ============================================================================

export const spacing = {
  0: '0',
  0.5: '0.125rem',  // 2px
  1: '0.25rem',     // 4px
  1.5: '0.375rem',  // 6px
  2: '0.5rem',      // 8px
  2.5: '0.625rem',  // 10px
  3: '0.75rem',     // 12px
  3.5: '0.875rem',  // 14px
  4: '1rem',        // 16px
  5: '1.25rem',     // 20px
  6: '1.5rem',      // 24px
  7: '1.75rem',     // 28px
  8: '2rem',        // 32px
  9: '2.25rem',     // 36px
  10: '2.5rem',     // 40px
  11: '2.75rem',    // 44px
  12: '3rem',       // 48px
  14: '3.5rem',     // 56px
  16: '4rem',       // 64px
  20: '5rem',       // 80px
  24: '6rem',       // 96px
  28: '7rem',       // 112px
  32: '8rem',       // 128px
  36: '9rem',       // 144px
  40: '10rem',      // 160px
  44: '11rem',      // 176px
  48: '12rem',      // 192px
  52: '13rem',      // 208px
  56: '14rem',      // 224px
  60: '15rem',      // 240px
  64: '16rem',      // 256px
  72: '18rem',      // 288px
  80: '20rem',      // 320px
  96: '24rem',      // 384px
} as const;

// ============================================================================
// BORDER RADIUS TOKENS
// ============================================================================

export const borderRadius = {
  none: '0',
  sm: '0.25rem',    // 4px
  base: '0.5rem',   // 8px
  md: '0.75rem',    // 12px
  lg: '1rem',       // 16px
  xl: '1.25rem',    // 20px
  '2xl': '1.5rem',  // 24px
  '3xl': '2rem',    // 32px
  full: '9999px',
} as const;

// ============================================================================
// SHADOW TOKENS
// ============================================================================

export const shadows = {
  none: 'none',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  glass: '0 8px 32px 0 rgba(0, 61, 122, 0.08)',
} as const;

// ============================================================================
// ANIMATION TOKENS
// ============================================================================

export const animation = {
  // Duration
  duration: {
    fast: '150ms',
    base: '200ms',
    slow: '300ms',
    slower: '500ms',
  },

  // Timing Functions
  easing: {
    linear: 'linear',
    ease: 'ease',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
  },
} as const;

// ============================================================================
// Z-INDEX TOKENS
// ============================================================================

export const zIndex = {
  hide: -1,
  base: 0,
  dropdown: 1000,
  sticky: 1100,
  fixed: 1200,
  modalBackdrop: 1300,
  modal: 1400,
  popover: 1500,
  tooltip: 1600,
  notification: 1700,
  max: 9999,
} as const;

// ============================================================================
// BREAKPOINTS
// ============================================================================

export const breakpoints = {
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1280,
  xl: 1920,
} as const;

// ============================================================================
// COMPONENT-SPECIFIC TOKENS
// ============================================================================

export const components = {
  // Navigation
  navigation: {
    width: {
      collapsed: '72px',
      expanded: '280px',
    },
    height: '64px',
  },

  // Button
  button: {
    height: {
      small: '32px',
      medium: '40px',
      large: '48px',
    },
    padding: {
      small: '8px 16px',
      medium: '12px 24px',
      large: '16px 32px',
    },
  },

  // Card
  card: {
    padding: {
      small: spacing[4],
      medium: spacing[6],
      large: spacing[8],
    },
  },

  // Input
  input: {
    height: {
      small: '36px',
      medium: '42px',
      large: '48px',
    },
    padding: {
      small: '8px 12px',
      medium: '10px 14px',
      large: '12px 16px',
    },
  },
} as const;

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type Colors = typeof colors;
export type Typography = typeof typography;
export type Spacing = typeof spacing;
export type BorderRadius = typeof borderRadius;
export type Shadows = typeof shadows;
export type Animation = typeof animation;
export type ZIndex = typeof zIndex;
export type Breakpoints = typeof breakpoints;
export type ComponentTokens = typeof components;
