import { GridColDef } from '@mui/x-data-grid';

export interface ProjectRow {
  id: number;
  project: string;
  category: string;
  ratio: string;
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
    field: 'ratio', 
    headerName: 'Ratio', 
    flex: 1,
    renderCell: (params) => <span className="text-slate-600 dark:text-slate-400 font-medium">{params.value}</span>
  },
  { 
    field: 'team', 
    headerName: 'Team', 
    flex: 1.2,
    renderCell: (params) => (
      <div className="flex -space-x-2 overflow-hidden">
        {params.value.map((src: string, i: number) => (
          <img 
            key={i}
            className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-boxdark object-cover" 
            src={src} 
            alt="Team member" 
          />
        ))}
        {params.row.extraTeam > 0 && (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-[10px] font-bold ring-2 ring-white dark:bg-slate-800 dark:ring-boxdark">
            +{params.row.extraTeam}
          </div>
        )}
      </div>
    )
  },
  { 
    field: 'progress', 
    headerName: 'Progress', 
    flex: 1.5,
    renderCell: (params) => (
      <div className="flex w-full flex-col gap-1.5">
        <span className="text-xs font-bold text-slate-500">{params.value}%</span>
        <div className="h-1.5 w-full rounded-full bg-slate-200 dark:bg-slate-700">
          <div 
            className={`h-1.5 rounded-full transition-all duration-500 ${params.value > 70 ? 'bg-success' : params.value > 40 ? 'bg-primary' : 'bg-warning'}`} 
            style={{ width: `${params.value}%` }}
          />
        </div>
      </div>
    )
  },
  { 
    field: 'status', 
    headerName: 'Status', 
    flex: 1,
    renderCell: (params) => (
      <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
        params.value === 'Active' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
      }`}>
        {params.value}
      </span>
    )
  },
];

export const projectRows: ProjectRow[] = [
  { 
    id: 1, 
    project: 'Forest Conservation A', 
    category: 'Environment', 
    ratio: '24/36', 
    progress: 68, 
    status: 'Active', 
    colorClass: 'bg-green-100 text-green-600',
    team: ['https://i.pravatar.cc/150?u=1', 'https://i.pravatar.cc/150?u=2'],
    extraTeam: 3
  },
  { 
    id: 2, 
    project: 'Water Management Phase 2', 
    category: 'Monitoring', 
    ratio: '12/48', 
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
    ratio: '42/45', 
    progress: 94, 
    status: 'Active', 
    colorClass: 'bg-purple-100 text-purple-600',
    team: ['https://i.pravatar.cc/150?u=5'],
    extraTeam: 8
  },
];