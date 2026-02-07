'use client';

import * as React from 'react';
import { 
  Radio, 
  RadioGroup as MuiRadioGroup, 
  FormControlLabel, 
  FormControl, 
  FormLabel, 
  FormHelperText,
  RadioGroupProps as MuiRadioGroupProps,
  styled
} from '@mui/material';
import { Circle, Dot } from 'lucide-react';

/**
 * Reusable Radio Group Component
 * * @example
 * const projectTypes = [
 * { label: 'Advocacy', value: 'advocacy', description: 'Kebijakan publik' },
 * { label: 'Field Work', value: 'field', description: 'Aksi lapangan' }
 * ];
 * * <RadioGroup 
 * label="Tipe Proyek" 
 * options={projectTypes} 
 * row={true} 
 * />
 */

const StyledRadio = styled(Radio)(({ theme }) => ({
  '&:hover': { backgroundColor: 'transparent' },
  padding: 8,
}));

interface RadioOption {
  label: string;
  value: string | number;
  description?: string;
}

interface CustomRadioGroupProps extends Omit<MuiRadioGroupProps, 'options'> {
  label?: string;
  options: RadioOption[];
  error?: boolean;
  helperText?: string;
  row?: boolean;
}

const RadioGroup = React.forwardRef<HTMLDivElement, CustomRadioGroupProps>(
  ({ label, options = [], error, helperText, row = false, ...props }, ref) => {
    return (
      <FormControl error={error} component="fieldset" className="w-full">
        {label && (
          <FormLabel className="mb-2 text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {label}
          </FormLabel>
        )}

        <MuiRadioGroup 
          {...props} 
          ref={ref} 
          row={row}
          className={`${row ? 'gap-6' : 'gap-2'}`}
        >
          {options.map((option: RadioOption) => (
            <FormControlLabel
              key={option.value}
              value={option.value}
              className={`m-0 rounded-lg border border-transparent transition-all hover:bg-slate-50 dark:hover:bg-meta-4 
                ${props.value === option.value ? 'bg-primary/5 border-primary/20' : ''}`}
              control={
                <StyledRadio
                  disableRipple
                  icon={<Circle size={20} className="text-slate-300 dark:text-slate-600" />}
                  checkedIcon={
                    <div className="relative flex items-center justify-center">
                      <Circle size={20} className="text-primary" />
                      <Dot size={24} className="absolute text-primary fill-current" />
                    </div>
                  }
                />
              }
              label={
                <div className="flex flex-col py-2 pr-4">
                  <span className="text-sm font-semibold text-black dark:text-white leading-none">
                    {option.label}
                  </span>
                  {option.description && (
                    <span className="mt-1 text-xs text-slate-500 font-light">
                      {option.description}
                    </span>
                  )}
                </div>
              }
            />
          ))}
        </MuiRadioGroup>

        {helperText && (
          <FormHelperText className="mx-0 mt-1 font-medium">{helperText}</FormHelperText>
        )}
      </FormControl>
    );
  }
);

RadioGroup.displayName = 'RadioGroup';
export default RadioGroup;