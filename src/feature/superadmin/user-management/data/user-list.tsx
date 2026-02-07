import { GridColDef } from '@mui/x-data-grid';
import AtomicChip from '@/components/ui/dataComponent/AtomicChip';
import AtomicButton from '@/components/ui/inputs/AtomicButton';
import { Edit, Trash2, Mail } from 'lucide-react';

export interface UserRow {
  id: number;
  name: string;
  email: string;
  role: 'Super Admin' | 'Admin' | 'Aktivis';
  region: string;
  status: 'Active' | 'Inactive';
  avatar?: string;
}

export const userColumns: GridColDef[] = [
  { 
    field: 'name', 
    headerName: 'Full Name', 
    flex: 2,
    renderCell: (params) => (
      <div className="flex items-center gap-3">
        <img 
          src={params.row.avatar || `https://ui-avatars.com/api/?name=${params.value}&background=random`} 
          className="h-10 w-10 rounded-full object-cover"
          alt="Avatar"
        />
        <div className="flex flex-col">
          <span className="font-semibold text-black dark:text-white">{params.value}</span>
          <span className="text-xs text-slate-500">{params.row.email}</span>
        </div>
      </div>
    )
  },
  { 
    field: 'role', 
    headerName: 'Role', 
    flex: 1,
    renderCell: (params) => (
      <span className="font-medium text-slate-700 dark:text-slate-300">{params.value}</span>
    )
  },
  { 
    field: 'region', 
    headerName: 'Region', 
    flex: 1,
  },
  { 
    field: 'status', 
    headerName: 'Status', 
    flex: 1,
    renderCell: (params) => (
      <AtomicChip 
        label={params.value} 
        color={params.value === 'Active' ? 'success' : 'default'} 
        variantType="soft"
      />
    )
  },
  {
    field: 'actions',
    headerName: 'Actions',
    flex: 1,
    sortable: false,
    renderCell: (params) => (
      <div className="flex items-center gap-2">
        <AtomicButton size="small" variant="text" color="primary" className="min-w-0 p-1">
          <Edit size={18} />
        </AtomicButton>
        <AtomicButton size="small" variant="text" color="error" className="min-w-0 p-1">
          <Trash2 size={18} />
        </AtomicButton>
      </div>
    )
  }
];

export const userRows: UserRow[] = [
  { id: 1, name: 'Budi Raharjo', email: 'budi@walhi.org', role: 'Super Admin', region: 'Jakarta', status: 'Active' },
  { id: 2, name: 'Siti Wulandari', email: 'siti@walhi.org', role: 'Admin', region: 'Riau', status: 'Active' },
  { id: 3, name: 'Andi Pratama', email: 'andi@walhi.org', role: 'Aktivis', region: 'Papua', status: 'Inactive' },
];