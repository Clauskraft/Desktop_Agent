/**
 * TdcButton Component
 * 
 * TDC-branded button component that enforces CVI compliance.
 * Use this instead of raw MUI Button to ensure consistent styling.
 */

import React from 'react';
import { Button, ButtonProps } from '@mui/material';
import { colors } from '../../theme/tokens';

export interface TdcButtonProps extends ButtonProps {
  /**
   * Glass morphism variant
   */
  glass?: boolean;
}

export const TdcButton: React.FC<TdcButtonProps> = ({ 
  glass = false,
  sx,
  ...props 
}) => {
  const glassSx = glass ? {
    background: colors.glass.light.background,
    backdropFilter: 'blur(10px)',
    border: `1px solid ${colors.glass.light.border}`,
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.90)',
    },
  } : {};

  return (
    <Button
      {...props}
      sx={{
        ...glassSx,
        ...sx,
      }}
    />
  );
};

export default TdcButton;
