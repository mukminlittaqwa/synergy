'use client';

import * as React from 'react';
import { Chip, ChipProps, styled, alpha } from '@mui/material';
import { 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  X, 
  Tag, 
  User 
} from 'lucide-react';

// Styling custom untuk varian 'soft' (background transparan/pastel)
const StyledChip = styled(Chip, {
  shouldForwardProp: (prop) => prop !== 'variantType',
})<{ variantType?: 'bold' | 'soft' }>(({ theme, color, variantType }) => {
  const mainColor = color === 'default' || !color ? '#64748b' : (theme.palette as any)[color]?.main || '#3C50E0';
  
  if (variantType === 'soft') {
    return {
      backgroundColor: alpha(mainColor, 0.1),
      color: mainColor,
      fontWeight: 600,
      border: `1px solid ${alpha(mainColor, 0.2)}`,
      '& .MuiChip-deleteIcon': {
        color: alpha(mainColor, 0.7),
        '&:hover': { color: mainColor },
      },
      '& .MuiChip-icon': { color: mainColor },
    };
  }
  
  return {
    fontWeight: 500,
  };
});

interface AtomicChipProps extends Omit<ChipProps, 'color'> {
  /** Warna menggunakan palette MUI (primary, success, error, warning, info) */
  color?: 'primary' | 'success' | 'error' | 'warning' | 'info' | 'default';
  /** 'bold' untuk warna solid, 'soft' untuk warna pastel/transparan */
  variantType?: 'bold' | 'soft';
  /** Icon di sebelah kiri label */
  startIcon?: 'check' | 'alert' | 'time' | 'tag' | 'user' | React.ReactNode;
}

const AtomicChip = ({ 
  label, 
  color = 'primary', 
  variantType = 'soft', 
  startIcon, 
  onDelete, 
  ...props 
}: AtomicChipProps) => {

  // Map icon lucide berdasarkan string atau terima node langsung
  const getIcon = () => {
    const iconSize = 14;
    switch (startIcon) {
      case 'check': return <CheckCircle2 size={iconSize} />;
      case 'alert': return <AlertCircle size={iconSize} />;
      case 'time': return <Clock size={iconSize} />;
      case 'tag': return <Tag size={iconSize} />;
      case 'user': return <User size={iconSize} />;
      default: return startIcon as React.ReactElement;
    }
  };

  return (
    <StyledChip
      {...props}
      label={label}
      color={color as any}
      variantType={variantType}
      icon={startIcon ? getIcon() : undefined}
      deleteIcon={onDelete ? <X size={16} /> : undefined}
      onDelete={onDelete}
      className="transition-all active:scale-95"
    />
  );
};

export default AtomicChip;

/**
 * --- DOKUMENTASI & CONTOH PEMAKAIAN ---
 * * 1. STATUS PROYEK (Soft Variant)
 * <AtomicChip label="Active" color="success" startIcon="check" />
 * <AtomicChip label="Pending" color="warning" startIcon="time" />
 * * 2. KATEGORI/TAG (Deletable)
 * <AtomicChip 
 * label="Advokasi" 
 * color="primary" 
 * startIcon="tag" 
 * onDelete={() => console.log('Deleted')} 
 * />
 * * 3. IDENTITAS (User)
 * <AtomicChip label="Ahmad Aktivis" color="info" startIcon="user" variantType="bold" />
 * * 4. ERROR/URGENT (Bold Variant)
 * <AtomicChip label="High Priority" color="error" variantType="bold" startIcon="alert" />
 */