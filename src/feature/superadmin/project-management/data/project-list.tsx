import { GridColDef } from '@mui/x-data-grid';
import AtomicProgress from '@/components/ui/dataComponent/AtomicProgress';
import AtomicChip from '@/components/ui/dataComponent/AtomicChip';

export interface ProjectRow {
  id: number;
  project: string;
  category: string;
  teamLead: string;
  totalTask: string;
  progress: number;
  status: 'Active' | 'Pending';
  colorClass: string;
  team: string[];
  extraTeam: number;
}

export const projectColumns: GridColDef[] = [
  { 
    field: 'project', 
    headerName: 'Project Name', 
    flex: 2,
    renderCell: (params) => {
      const initials = params.value.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase();
      return (
        <div className="flex items-center gap-3 py-2">
          <div className={`flex h-10 w-10 items-center justify-center rounded-lg font-bold text-xs ${params.row.colorClass || 'bg-primary/10 text-primary'}`}>
            {initials}
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-black dark:text-white leading-tight">{params.value}</span>
            <span className="text-[11px] text-slate-500 uppercase font-bold tracking-wider">{params.row.category}</span>
          </div>
        </div>
      );
    }
  },
  { 
    field: 'teamLead', 
    headerName: 'Team Lead', 
    flex: 1.2,
    renderCell: (params) => (
      <div className="flex items-center gap-2">
        <div className="h-6 w-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-600">
          {params.value.charAt(0)}
        </div>
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{params.value}</span>
      </div>
    )
  },
  { 
    field: 'totalTask', 
    headerName: 'Total Task', 
    flex: 1,
    renderCell: (params) => (
      <span className="font-mono text-sm font-semibold text-slate-600 bg-slate-50 px-2 py-1 rounded">
        {params.value}
      </span>
    )
  },
  { 
    field: 'progress', 
    headerName: 'Progress', 
    flex: 1.5,
    renderCell: (params) => (
      <div className="w-full pr-4">
        <AtomicProgress 
          value={params.value} 
          color={params.value > 70 ? 'success' : params.value > 40 ? 'primary' : 'warning'}
          size={6}
          showLabel={true}
        />
      </div>
    )
  },
  { 
    field: 'status', 
    headerName: 'Status', 
    flex: 1,
    renderCell: (params) => (
      <AtomicChip 
        label={params.value} 
        color={params.value === 'Active' ? 'success' : 'warning'} 
        startIcon={params.value === 'Active' ? 'check' : 'time'}
        variantType="soft"
      />
    )
  },
];

export const projectRows: ProjectRow[] = [
  { 
    id: 1, 
    project: 'Forest Conservation A', 
    category: 'Environment', 
    teamLead: 'Ahmad Subardjo',
    totalTask: '22/24',
    progress: 85, 
    status: 'Active', 
    colorClass: 'bg-green-100 text-green-600',
    team: ['https://i.pravatar.cc/150?u=1', 'https://i.pravatar.cc/150?u=2'],
    extraTeam: 3
  },
  { 
    id: 2, 
    project: 'Water Management Phase 2', 
    category: 'Monitoring', 
    teamLead: 'Siti Aminah',
    totalTask: '05/20',
    progress: 25, 
    status: 'Pending', 
    colorClass: 'bg-blue-100 text-blue-600',
    team: ['https://i.pravatar.cc/150?u=3', 'https://i.pravatar.cc/150?u=4'],
    extraTeam: 0
  },
  { 
    id: 3, 
    project: 'Sustainable Agriculture Initiative', 
    category: 'Advocacy', 
    teamLead: 'Budi Santoso',
    totalTask: '40/45',
    progress: 94, 
    status: 'Active', 
    colorClass: 'bg-purple-100 text-purple-600',
    team: ['https://i.pravatar.cc/150?u=5'],
    extraTeam: 8
  },
];