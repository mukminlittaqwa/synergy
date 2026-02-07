'use client';

import * as React from 'react';
import { 
  Button as MuiButton, 
  ButtonProps as MuiButtonProps, 
  CircularProgress, 
  styled 
} from '@mui/material';

// Styling custom untuk Button agar lebih "Dashboard-Look"
const StyledButton = styled(MuiButton)(({ theme }) => ({
  borderRadius: '8px',
  padding: '8px 20px',
  textTransform: 'none', // Menghilangkan Uppercase otomatis
  fontWeight: 600,
  boxShadow: 'none',
  '&:hover': {
    boxShadow: 'none',
  },
  '&.MuiButton-containedPrimary': {
    backgroundColor: '#3C50E0',
    '&:hover': { backgroundColor: '#3144c1' },
  },
}));

interface AtomicButtonProps extends MuiButtonProps {
  /** Menampilkan animasi loading dan mematikan klik */
  loading?: boolean;
  /** Icon di sebelah kiri teks */
  startIcon?: React.ReactNode;
  /** Icon di sebelah kanan teks */
  endIcon?: React.ReactNode;
  /** Varian warna tambahan jika diperlukan */
  colorType?: 'primary' | 'success' | 'error' | 'warning' | 'info';
}

/**
 * Reusable Atomic Button
 * @example
 * <AtomicButton 
 * variant="contained" 
 * startIcon={<Plus size={18} />}
 * loading={isLoading}
 * >
 * Tambah Project
 * </AtomicButton>
 */
const AtomicButton = React.forwardRef<HTMLButtonElement, AtomicButtonProps>(
  ({ children, loading, disabled, startIcon, endIcon, colorType, ...props }, ref) => {
    return (
      <StyledButton
        {...props}
        ref={ref}
        disabled={loading || disabled}
        // Jika loading, ganti startIcon dengan spinner
        startIcon={
          loading ? (
            <CircularProgress size={16} color="inherit" />
          ) : (
            startIcon
          )
        }
        endIcon={!loading && endIcon}
      >
        {children}
      </StyledButton>
    );
  }
);

AtomicButton.displayName = 'AtomicButton';

export default AtomicButton;

/**
 * --- CONTOH PEMAKAIAN ---
 * * 1. Button Tambah (Primary + Start Icon):
 * <AtomicButton variant="contained" startIcon={<Plus size={20} />}>
 * Tambah Project
 * </AtomicButton>
 * * 2. Button Export (Outline + End Icon):
 * <AtomicButton variant="outlined" endIcon={<Download size={18} />}>
 * Export CSV
 * </AtomicButton>
 * * 3. Loading State:
 * <AtomicButton loading variant="contained">
 * Simpan Data
 * </AtomicButton>
 * * 4. Button Danger:
 * <AtomicButton variant="contained" color="error" startIcon={<Trash size={18} />}>
 * Hapus Project
 * </AtomicButton>
 */