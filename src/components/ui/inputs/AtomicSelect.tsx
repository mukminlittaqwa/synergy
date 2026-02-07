'use client';

import * as React from 'react';
import {
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
  OutlinedInput,
  styled,
  SelectProps,
} from '@mui/material';
import { ChevronDown, AlertCircle } from 'lucide-react';

const StyledInput = styled(OutlinedInput, {
  shouldForwardProp: (prop) => prop !== 'error',
})(({ error }) => ({
  borderRadius: '8px',
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: error ? '#FC5757' : '#E2E8F0', // Merah jika error
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderWidth: '1.5px',
    borderColor: error ? '#FC5757' : '#3C50E0',
  },
}));

export interface SelectOption {
  label: string;
  value: string | number;
}

interface AtomicSelectProps extends Omit<SelectProps, 'options'> {
  label?: string;
  options: SelectOption[];
  error?: boolean;
  helperText?: string;
  placeholder?: string;
  required?: boolean; // Menampilkan tanda bintang *
}

const AtomicSelect = React.forwardRef<HTMLDivElement, AtomicSelectProps>(
  ({ label, options = [], error, helperText, placeholder, required, ...props }, ref) => {
    return (
      <FormControl fullWidth error={error} className="flex flex-col gap-1.5">
        {label && (
          <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
            {label} {required && <span className="text-danger">*</span>}
          </label>
        )}
        
        <Select
          {...props}
          ref={ref}
          displayEmpty
          input={<StyledInput error={error} />}
          renderValue={(selected) => {
            if (!selected || (Array.isArray(selected) && selected.length === 0)) {
              return <span className="text-slate-400">{placeholder}</span>;
            }
            const selectedOption = options.find(opt => opt.value === selected);
            return selectedOption ? selectedOption.label : (selected as string);
          }}
          IconComponent={(iconProps) => (
            <ChevronDown {...iconProps} size={18} className={`mr-3 ${error ? 'text-danger' : 'text-slate-500'}`} />
          )}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
          ))}
        </Select>

        {/* Pesan Error dengan Icon */}
        {error && helperText && (
          <div className="flex items-center gap-1 mt-1 text-danger">
            <AlertCircle size={14} />
            <span className="text-xs font-medium">{helperText}</span>
          </div>
        )}
      </FormControl>
    );
  }
);

AtomicSelect.displayName = 'AtomicSelect';
export default AtomicSelect;

/**
 * --- CONTOH PEMAKAIAN LENGKAP DENGAN VALIDASI ---
 * * const { control, handleSubmit } = useForm({
 * defaultValues: { region: '' }
 * });
 * * const onSubmit = (data) => console.log(data);
 * * <form onSubmit={handleSubmit(onSubmit)}>
 * <Controller
 * name="region"
 * control={control}
 * rules={{ required: 'Wilayah wajib dipilih!' }} // VALIDASI REQUIRED
 * render={({ field, fieldState }) => (
 * <AtomicSelect
 * {...field}
 * label="Wilayah Kerja"
 * placeholder="Pilih wilayah..."
 * required={true}
 * options={[
 * { label: 'Papua', value: 'papua' },
 * { label: 'Jambi', value: 'jambi' }
 * ]}
 * // MENGIRIM STATUS ERROR DARI RHF
 * error={!!fieldState.error} 
 * helperText={fieldState.error?.message}
 * />
 * )}
 * />
 * <button type="submit">Simpan</button>
 * </form>
 */