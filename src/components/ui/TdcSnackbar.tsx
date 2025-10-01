/**
 * TdcSnackbar Component
 * 
 * TDC-branded snackbar component that enforces CVI compliance.
 * Use this instead of raw MUI Snackbar to ensure consistent styling.
 */

import React from 'react';
import { Snackbar, SnackbarProps, Alert, AlertColor } from '@mui/material';

export interface TdcSnackbarProps extends Omit<SnackbarProps, 'children'> {
  /**
   * Snackbar message
   */
  message: string;
  /**
   * Severity of the snackbar (success, error, warning, info)
   */
  severity?: AlertColor;
}

export const TdcSnackbar: React.FC<TdcSnackbarProps> = ({
  message,
  severity = 'info',
  onClose,
  ...props
}) => {
  return (
    <Snackbar onClose={onClose} {...props}>
      <Alert onClose={onClose as any} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default TdcSnackbar;
