/**
 * TdcCard Component
 * 
 * TDC-branded card component that enforces CVI compliance.
 * Use this instead of raw MUI Card to ensure consistent styling.
 */

import React from 'react';
import { Card, CardProps } from '@mui/material';
import { colors } from '../../theme/tokens';

export interface TdcCardProps extends CardProps {
  /**
   * Glass morphism variant
   */
  glass?: boolean;
  /**
   * Elevated shadow variant
   */
  elevated?: boolean;
}

export const TdcCard: React.FC<TdcCardProps> = ({ 
  glass = false,
  elevated = false,
  sx,
  ...props 
}) => {
  const glassSx = glass ? {
    background: colors.glass.light.background,
    backdropFilter: 'blur(20px)',
    border: `1px solid ${colors.glass.light.border}`,
  } : {};

  const elevatedSx = elevated ? {
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  } : {};

  return (
    <Card
      {...props}
      sx={{
        ...glassSx,
        ...elevatedSx,
        ...sx,
      }}
    />
  );
};

export default TdcCard;
