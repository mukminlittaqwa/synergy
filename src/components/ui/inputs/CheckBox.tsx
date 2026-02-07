'use client';

import * as React from 'react';
import { Checkbox, CheckboxProps, styled, FormControlLabel } from '@mui/material';
import { Circle, CheckCircle2 } from 'lucide-react';

const StyledCheckbox = styled(Checkbox)(({ theme }) => ({
  padding: 4,
  '&:hover': {
    backgroundColor: 'transparent',
  },
}));

interface RoundedCheckboxProps extends CheckboxProps {
  label?: string;
  error?: boolean;
  helperText?: string;
}

const RoundedCheckbox = React.forwardRef<HTMLButtonElement, RoundedCheckboxProps>(
  ({ label, error, helperText, ...props }, ref) => {
    return (
      <div className="flex flex-col">
        <FormControlLabel
          label={
            label ? (
              <span className={`text-sm font-medium ${error ? 'text-danger' : 'text-black dark:text-white'}`}>
                {label}
              </span>
            ) : ""
          }
          control={
            <StyledCheckbox
              {...props}
              ref={ref}
              icon={<Circle size={20} className="text-slate-300 dark:text-slate-600" />}
              checkedIcon={<CheckCircle2 size={20} className="text-primary" />}
              disableRipple
            />
          }
        />
        {helperText && (
          <p className={`mt-1 text-xs ${error ? 'text-danger' : 'text-slate-500'}`}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

RoundedCheckbox.displayName = 'RoundedCheckbox';

export default RoundedCheckbox;