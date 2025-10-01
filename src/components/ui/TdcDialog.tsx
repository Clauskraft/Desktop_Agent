/**
 * TdcDialog Component
 * 
 * TDC-branded dialog component that enforces CVI compliance.
 * Use this instead of raw MUI Dialog to ensure consistent styling.
 */

import React from 'react';
import {
  Dialog,
  DialogProps,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export interface TdcDialogProps extends DialogProps {
  /**
   * Dialog title
   */
  title?: string;
  /**
   * Show close button
   */
  showCloseButton?: boolean;
  /**
   * Actions to display in dialog footer
   */
  actions?: React.ReactNode;
}

export const TdcDialog: React.FC<TdcDialogProps> = ({
  title,
  showCloseButton = true,
  actions,
  children,
  onClose,
  ...props
}) => {
  return (
    <Dialog onClose={onClose} {...props}>
      {title && (
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {title}
          {showCloseButton && onClose && (
            <IconButton
              aria-label="close"
              onClick={(e) => onClose(e, 'escapeKeyDown')}
              sx={{ marginLeft: 'auto' }}
            >
              <CloseIcon />
            </IconButton>
          )}
        </DialogTitle>
      )}
      <DialogContent>{children}</DialogContent>
      {actions && <DialogActions>{actions}</DialogActions>}
    </Dialog>
  );
};

export default TdcDialog;
