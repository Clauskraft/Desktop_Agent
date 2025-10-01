/**
 * TDC Component Overrides
 * 
 * Material-UI component style overrides to enforce TDC CVI.
 * These overrides ensure consistent styling across all MUI components.
 */

import { Components, Theme } from '@mui/material/styles';
import { colors, borderRadius, shadows, spacing } from './tokens';

export const componentOverrides: Components<Theme> = {
  // ============================================================================
  // BUTTON
  // ============================================================================
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: borderRadius.base,
        textTransform: 'none',
        fontWeight: 500,
        boxShadow: 'none',
        '&:hover': {
          boxShadow: shadows.sm,
        },
      },
      contained: {
        '&:hover': {
          boxShadow: shadows.md,
        },
      },
      sizeSmall: {
        padding: '6px 16px',
        fontSize: '0.875rem',
      },
      sizeMedium: {
        padding: '10px 24px',
        fontSize: '0.9375rem',
      },
      sizeLarge: {
        padding: '14px 32px',
        fontSize: '1rem',
      },
    },
    variants: [
      {
        props: { variant: 'glass' } as any,
        style: ({ theme }) => ({
          background: theme.mode === 'light' 
            ? colors.glass.light.background 
            : colors.glass.dark.background,
          backdropFilter: 'blur(10px)',
          border: `1px solid ${
            theme.mode === 'light' 
              ? colors.glass.light.border 
              : colors.glass.dark.border
          }`,
          boxShadow: shadows.glass,
          '&:hover': {
            background: theme.mode === 'light'
              ? 'rgba(255, 255, 255, 0.90)'
              : 'rgba(26, 31, 46, 0.90)',
          },
        }),
      },
    ],
  },

  // ============================================================================
  // CARD
  // ============================================================================
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: borderRadius.lg,
        boxShadow: shadows.md,
        backgroundImage: 'none',
      },
    },
    variants: [
      {
        props: { variant: 'glass' } as any,
        style: ({ theme }) => ({
          background: theme.mode === 'light'
            ? colors.glass.light.background
            : colors.glass.dark.background,
          backdropFilter: 'blur(20px)',
          border: `1px solid ${
            theme.mode === 'light'
              ? colors.glass.light.border
              : colors.glass.dark.border
          }`,
          boxShadow: shadows.glass,
        }),
      },
      {
        props: { variant: 'elevated' } as any,
        style: {
          boxShadow: shadows.xl,
        },
      },
    ],
  },

  // ============================================================================
  // TEXT FIELD
  // ============================================================================
  MuiTextField: {
    styleOverrides: {
      root: {
        '& .MuiOutlinedInput-root': {
          borderRadius: borderRadius.base,
        },
      },
    },
    defaultProps: {
      variant: 'outlined',
    },
  },

  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        borderRadius: borderRadius.base,
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: colors.primary.light,
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderWidth: '2px',
        },
      },
    },
  },

  // ============================================================================
  // PAPER
  // ============================================================================
  MuiPaper: {
    styleOverrides: {
      root: {
        backgroundImage: 'none',
      },
      rounded: {
        borderRadius: borderRadius.lg,
      },
      elevation1: {
        boxShadow: shadows.sm,
      },
      elevation2: {
        boxShadow: shadows.base,
      },
      elevation3: {
        boxShadow: shadows.md,
      },
      elevation4: {
        boxShadow: shadows.lg,
      },
      elevation8: {
        boxShadow: shadows.xl,
      },
      elevation16: {
        boxShadow: shadows['2xl'],
      },
    },
  },

  // ============================================================================
  // DIALOG
  // ============================================================================
  MuiDialog: {
    styleOverrides: {
      paper: {
        borderRadius: borderRadius.xl,
        boxShadow: shadows['2xl'],
      },
    },
  },

  MuiDialogTitle: {
    styleOverrides: {
      root: {
        fontSize: '1.25rem',
        fontWeight: 600,
        padding: spacing[6],
      },
    },
  },

  MuiDialogContent: {
    styleOverrides: {
      root: {
        padding: spacing[6],
      },
    },
  },

  MuiDialogActions: {
    styleOverrides: {
      root: {
        padding: spacing[6],
        gap: spacing[2],
      },
    },
  },

  // ============================================================================
  // DRAWER
  // ============================================================================
  MuiDrawer: {
    styleOverrides: {
      paper: {
        borderRight: 'none',
        backgroundImage: 'none',
      },
    },
  },

  // ============================================================================
  // APP BAR
  // ============================================================================
  MuiAppBar: {
    styleOverrides: {
      root: {
        boxShadow: shadows.sm,
        backgroundImage: 'none',
      },
    },
  },

  // ============================================================================
  // CHIP
  // ============================================================================
  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: borderRadius.full,
        fontWeight: 500,
      },
      filled: {
        '&:hover': {
          boxShadow: shadows.sm,
        },
      },
    },
  },

  // ============================================================================
  // TOOLTIP
  // ============================================================================
  MuiTooltip: {
    styleOverrides: {
      tooltip: {
        borderRadius: borderRadius.base,
        fontSize: '0.875rem',
        padding: `${spacing[2]} ${spacing[3]}`,
        boxShadow: shadows.lg,
      },
    },
  },

  // ============================================================================
  // MENU
  // ============================================================================
  MuiMenu: {
    styleOverrides: {
      paper: {
        borderRadius: borderRadius.lg,
        boxShadow: shadows.xl,
        marginTop: spacing[2],
      },
      list: {
        padding: spacing[2],
      },
    },
  },

  MuiMenuItem: {
    styleOverrides: {
      root: {
        borderRadius: borderRadius.base,
        margin: `${spacing[1]} 0`,
        '&:hover': {
          backgroundColor: 'rgba(0, 61, 122, 0.08)',
        },
        '&.Mui-selected': {
          backgroundColor: 'rgba(0, 61, 122, 0.12)',
          '&:hover': {
            backgroundColor: 'rgba(0, 61, 122, 0.16)',
          },
        },
      },
    },
  },

  // ============================================================================
  // TAB
  // ============================================================================
  MuiTabs: {
    styleOverrides: {
      root: {
        minHeight: '48px',
      },
      indicator: {
        height: '3px',
        borderRadius: borderRadius.full,
      },
    },
  },

  MuiTab: {
    styleOverrides: {
      root: {
        textTransform: 'none',
        fontWeight: 500,
        fontSize: '0.9375rem',
        minHeight: '48px',
        '&.Mui-selected': {
          fontWeight: 600,
        },
      },
    },
  },

  // ============================================================================
  // ALERT
  // ============================================================================
  MuiAlert: {
    styleOverrides: {
      root: {
        borderRadius: borderRadius.lg,
        padding: `${spacing[3]} ${spacing[4]}`,
      },
      standardSuccess: {
        backgroundColor: 'rgba(40, 167, 69, 0.12)',
      },
      standardError: {
        backgroundColor: 'rgba(220, 53, 69, 0.12)',
      },
      standardWarning: {
        backgroundColor: 'rgba(255, 193, 7, 0.12)',
      },
      standardInfo: {
        backgroundColor: 'rgba(23, 162, 184, 0.12)',
      },
    },
  },

  // ============================================================================
  // SNACKBAR
  // ============================================================================
  MuiSnackbar: {
    styleOverrides: {
      root: {
        '& .MuiPaper-root': {
          borderRadius: borderRadius.lg,
          boxShadow: shadows.xl,
        },
      },
    },
  },

  // ============================================================================
  // SWITCH
  // ============================================================================
  MuiSwitch: {
    styleOverrides: {
      root: {
        padding: spacing[2],
      },
      switchBase: {
        '&.Mui-checked': {
          '& + .MuiSwitch-track': {
            opacity: 1,
          },
        },
      },
      thumb: {
        boxShadow: shadows.sm,
      },
      track: {
        borderRadius: borderRadius.full,
      },
    },
  },

  // ============================================================================
  // SLIDER
  // ============================================================================
  MuiSlider: {
    styleOverrides: {
      root: {
        height: '6px',
      },
      thumb: {
        width: '18px',
        height: '18px',
        boxShadow: shadows.md,
        '&:hover': {
          boxShadow: shadows.lg,
        },
      },
      track: {
        borderRadius: borderRadius.full,
      },
      rail: {
        borderRadius: borderRadius.full,
        opacity: 0.3,
      },
    },
  },

  // ============================================================================
  // CHECKBOX & RADIO
  // ============================================================================
  MuiCheckbox: {
    styleOverrides: {
      root: {
        borderRadius: borderRadius.sm,
      },
    },
  },

  MuiRadio: {
    styleOverrides: {
      root: {
        '&.Mui-checked': {
          color: colors.primary.main,
        },
      },
    },
  },

  // ============================================================================
  // ACCORDION
  // ============================================================================
  MuiAccordion: {
    styleOverrides: {
      root: {
        borderRadius: borderRadius.lg,
        '&:before': {
          display: 'none',
        },
        '&.Mui-expanded': {
          margin: 0,
        },
      },
    },
  },

  MuiAccordionSummary: {
    styleOverrides: {
      root: {
        borderRadius: borderRadius.lg,
        '&.Mui-expanded': {
          minHeight: '48px',
        },
      },
      content: {
        '&.Mui-expanded': {
          margin: '12px 0',
        },
      },
    },
  },
};
