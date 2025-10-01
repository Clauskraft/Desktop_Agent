/**
 * TdcTextField Component
 * 
 * TDC-branded text field component that enforces CVI compliance.
 * Use this instead of raw MUI TextField to ensure consistent styling.
 */

import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';

export type TdcTextFieldProps = TextFieldProps;

export const TdcTextField: React.FC<TdcTextFieldProps> = (props) => {
  return (
    <TextField
      variant="outlined"
      {...props}
    />
  );
};

export default TdcTextField;
