'use client';

import * as React from 'react';
import {
  TextField,
  TextFieldProps,
  InputAdornment,
  IconButton,
  styled,
} from '@mui/material';
import { Eye, EyeOff, XCircle, AlertCircle } from 'lucide-react';

const StyledTextField = styled(TextField, {
  shouldForwardProp: (prop) => prop !== 'error',
})(({ error }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    backgroundColor: 'transparent',
    transition: 'all 0.2s',
    '& fieldset': {
      borderColor: error ? '#FC5757' : '#E2E8F0',
    },
    '&:hover fieldset': {
      borderColor: error ? '#FC5757' : '#3C50E0',
    },
    '&.Mui-focused fieldset': {
      borderColor: error ? '#FC5757' : '#3C50E0',
      borderWidth: '1.5px',
    },
  },
  '& .MuiInputBase-input': {
    padding: '12px 14px',
    fontSize: '14px',
  },
}));

type AtomicTextFieldProps = Omit<TextFieldProps, 'error'> & {
  label?: string;
  error?: boolean;
  helperText?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  /** Fitur hapus text cepat */
  clearable?: boolean;
  onClear?: () => void;
  /** Tanda bintang merah */
  required?: boolean;
};

const AtomicTextField = React.forwardRef<HTMLDivElement, AtomicTextFieldProps>(
  ({ label, error, helperText, startIcon, endIcon, type, clearable, onClear, required, value, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    // Toggle tipe password
    const isPassword = type === 'password';
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
            {label} {required && <span className="text-danger">*</span>}
          </label>
        )}

        <StyledTextField
          {...props}
          ref={ref}
          type={inputType}
          value={value}
          error={error}
          variant="outlined"
          fullWidth
          autoComplete="off"
          InputProps={{
            startAdornment: startIcon && (
              <InputAdornment position="start" className="text-slate-400">
                {startIcon}
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <div className="flex items-center gap-1">
                  {clearable && (value !== undefined && value !== null && value !== '') && (
                    <IconButton onClick={onClear} size="small" edge="end">
                      <XCircle size={16} className="text-slate-400" />
                    </IconButton>
                  )}
                  
                  {isPassword && (
                    <IconButton onClick={() => setShowPassword(!showPassword)} size="small" edge="end">
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </IconButton>
                  )}

                  {!isPassword && endIcon && (
                    <span className="text-slate-400">{endIcon}</span>
                  )}
                </div>
              </InputAdornment>
            ),
          }}
        />

        {error && helperText && (
          <div className="flex items-center gap-1 text-danger">
            <AlertCircle size={14} />
            <span className="text-[11px] font-medium">{helperText}</span>
          </div>
        )}
      </div>
    );
  }
);

AtomicTextField.displayName = 'AtomicTextField';
export default AtomicTextField;

/**
 * --- DOKUMENTASI PEMAKAIAN ---
 * * 1. DENGAN ICON & PASSWORD:
 * <AtomicTextField 
 * label="Password" 
 * type="password" 
 * startIcon={<Lock size={18} />} 
 * />
 * * 2. DENGAN REACT HOOK FORM:
 * <Controller
 * name="email"
 * control={control}
 * rules={{ required: 'Email is required' }}
 * render={({ field, fieldState }) => (
 * <AtomicTextField 
 * {...field}
 * label="Email Address"
 * placeholder="name@walhi.org"
 * error={!!fieldState.error}
 * helperText={fieldState.error?.message}
 * startIcon={<Mail size={18} />}
 * />
 * )}
 * />
 */