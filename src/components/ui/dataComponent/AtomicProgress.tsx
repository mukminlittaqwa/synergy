'use client';

import * as React from 'react';
import { 
  LinearProgress, 
  CircularProgress, 
  Box, 
  Typography, 
  styled, 
  alpha 
} from '@mui/material';

// --- STYLING UNTUK LINEAR PROGRESS ---
const StyledLinearProgress = styled(LinearProgress)(({ theme, color }) => ({
  height: 8,
  borderRadius: 5,
  backgroundColor: alpha(color === 'inherit' ? '#E2E8F0' : (theme.palette as any)[color as string]?.main || '#E2E8F0', 0.1),
  '& .MuiLinearProgress-bar': {
    borderRadius: 5,
  },
}));

interface AtomicProgressProps {
  /** Nilai progres 0 - 100 */
  value: number;
  /** Tipe progres: 'line' atau 'circle' */
  variant?: 'line' | 'circle';
  /** Warna status */
  color?: 'primary' | 'success' | 'warning' | 'error' | 'info';
  /** Ukuran (untuk circle dalam pixel, untuk line dalam ketebalan) */
  size?: number;
  /** Menampilkan label teks persentase */
  showLabel?: boolean;
  /** Label tambahan di bawah atau di samping */
  label?: string;
  /** Efek loading berputar terus menerus */
  indeterminate?: boolean;
}

const AtomicProgress = ({
  value = 0,
  variant = 'line',
  color = 'primary',
  size,
  showLabel = true,
  label,
  indeterminate = false,
}: AtomicProgressProps) => {
  
  const isCircle = variant === 'circle';
  const progressMode = indeterminate ? 'indeterminate' : 'determinate';

  if (isCircle) {
    return (
      <Box sx={{ position: 'relative', display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
        <Box sx={{ position: 'relative', display: 'flex' }}>
          {/* Background Circle (Track) agar terlihat lebih premium */}
          <CircularProgress
            variant="determinate"
            sx={{ color: (theme) => alpha(theme.palette[color].main, 0.1) }}
            size={size || 60}
            thickness={4}
            value={100}
          />
          {/* Active Progress Circle */}
          <CircularProgress
            variant={progressMode}
            value={value}
            size={size || 60}
            thickness={4}
            color={color}
            sx={{ position: 'absolute', left: 0, strokeLinecap: 'round' }}
          />
          {!indeterminate && showLabel && (
            <Box
              sx={{
                top: 0, left: 0, bottom: 0, right: 0,
                position: 'absolute', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
              }}
            >
              <Typography variant="caption" component="div" fontWeight="bold" color="text.secondary">
                {`${Math.round(value)}%`}
              </Typography>
            </Box>
          )}
        </Box>
        {label && <Typography variant="caption" className="font-medium text-slate-500">{label}</Typography>}
      </Box>
    );
  }

  // --- RENDER LINEAR PROGRESS ---
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}>
        {label && <Typography variant="body2" className="font-semibold text-slate-700">{label}</Typography>}
        {showLabel && !indeterminate && (
          <Typography variant="body2" color="text.secondary" fontWeight="bold">
            {`${Math.round(value)}%`}
          </Typography>
        )}
      </Box>
      <StyledLinearProgress 
        variant={progressMode} 
        value={value} 
        color={color} 
        sx={size ? { height: size } : {}}
      />
    </Box>
  );
};

export default AtomicProgress;

/**
 * --- DOKUMENTASI PEMAKAIAN ---
 * * 1. LINEAR PROGRESS (Untuk Progres Task/Proyek)
 * <AtomicProgress label="Penyelesaian Dokumen" value={75} color="success" />
 * * 2. CIRCULAR PROGRESS (Untuk Dashboard Stats)
 * <AtomicProgress variant="circle" value={65} color="primary" label="Task Done" size={80} />
 * * 3. LOADING STATE (Indeterminate)
 * <AtomicProgress variant="circle" indeterminate color="warning" label="Sikronisasi Data..." />
 * * 4. KETEBALAN CUSTOM (Line)
 * <AtomicProgress value={40} size={12} color="error" label="Urgency Level" />
 */