'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { ChevronDown, Plus } from 'lucide-react';
import AtomicTabs from '@/components/ui/AtomicTabs';
import MyTaskGroup from '@/components/ui/MyTaskGroup';
import { MY_TASKS_DATA } from './data/my-tasks-data';
import AddTaskModal from '@/components/modals/AddTaskModal';
import { DataGrid, GridColDef, GridRenderCellParams, GridRowModel } from '@mui/x-data-grid';

interface TimesheetRow {
  id: string;
  taskTitle: string;
  mon: number;
  tue: number;
  wed: number;
  thu: number;
  fri: number;
  sat: number;
  sun: number;
  total: number;
  isProject: boolean;
}

const MY_TASK_TABS = [
  { id: 'tasks', label: 'Tasks (12)' },
  { id: 'timesheet', label: 'Timesheet' },
  { id: 'activity', label: 'Activity' },
  { id: 'availability', label: 'Availability' },
];

export default function MyTasksPage() {
  const [activeTab, setActiveTab] = useState('timesheet');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const initialRows = useMemo<TimesheetRow[]>(() => {
    return MY_TASKS_DATA.flatMap((project) => {
      const projectRow: TimesheetRow = {
        id: project.projectName,
        taskTitle: project.projectName,
        mon: 0, tue: 0, wed: 0, thu: 0, fri: 0, sat: 0, sun: 0,
        total: 0, isProject: true
      };
      const taskRows: TimesheetRow[] = project.tasks.map((task, index) => ({
        id: `${project.projectName}-task-${index}`,
        taskTitle: task.title,
        mon: 0, tue: 0, wed: 0, thu: 0, fri: 0, sat: 0, sun: 0,
        total: 0, isProject: false
      }));
      return [projectRow, ...taskRows];
    });
  }, []);

  const [rows, setRows] = useState<TimesheetRow[]>(initialRows);

  const processRowUpdate = useCallback((newRow: GridRowModel) => {
    const row = newRow as TimesheetRow;
    const total = (Number(row.mon) || 0) + (Number(row.tue) || 0) + 
                  (Number(row.wed) || 0) + (Number(row.thu) || 0) + 
                  (Number(row.fri) || 0) + (Number(row.sat) || 0) + (Number(row.sun) || 0);
    const updatedRow: TimesheetRow = { ...row, total };
    setRows((prev) => prev.map((r) => (r.id === updatedRow.id ? updatedRow : r)));
    return updatedRow;
  }, []);

  const dailyTotals = useMemo(() => {
    const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
    const totals = days.map(day => 
      rows.filter(r => !r.isProject).reduce((acc, curr) => acc + (Number(curr[day as keyof TimesheetRow]) || 0), 0)
    );
    const grandTotal = totals.reduce((acc, curr) => acc + curr, 0);
    return { totals, grandTotal };
  }, [rows]);

  const columns: GridColDef[] = [
    {
      field: 'taskTitle',
      headerName: 'PROJECTS / TASKS',
      width: 380,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <div className="flex items-center w-full h-full px-4 overflow-hidden">
          {params.row.isProject ? (
            <div className="flex items-center gap-2">
              <div className="min-w-[24px] h-6 rounded bg-blue-600 text-white flex items-center justify-center font-bold text-[10px]">WJ</div>
              <span className="font-extrabold text-blue-600 uppercase text-[11px] truncate tracking-tight">
                {params.value}
              </span>
            </div>
          ) : (
            <span className="text-slate-500 ml-10 text-[13px] font-medium italic truncate">
              {params.value}
            </span>
          )}
        </div>
      )
    },
    ...['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'].map((day) => ({
      field: day,
      headerName: day.toUpperCase(),
      width: 85,
      editable: true,
      sortable: false,
      align: 'center' as const,
      headerAlign: 'center' as const,
      renderCell: (params: GridRenderCellParams) => {
        const val = Number(params.value);
        if (params.row.isProject) return null;
        
        return val > 0 ? (
          <span className="font-bold text-slate-800 text-sm">{val}</span>
        ) : (
          <div className="w-full h-[1px] bg-slate-200" />
        );
      }
    })),
    {
      field: 'total',
      headerName: 'TOTAL',
      width: 100,
      sortable: false,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params: GridRenderCellParams) => (
        <span className={`font-black text-sm ${params.row.isProject ? 'text-blue-600' : 'text-slate-900'}`}>
          {params.value || 0}
        </span>
      )
    },
  ];

  return (
    <div className="mx-auto max-w-7xl p-4 md:p-6 min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
        <AtomicTabs tabs={MY_TASK_TABS} activeTab={activeTab} onChange={setActiveTab} />
        
       <div className="flex items-center gap-4 mb-4 sm:mb-0">
          <div className="flex items-center gap-2 text-[10px] font-black tracking-widest text-slate-400 uppercase">
            Group: 
            <button className="flex items-center gap-1 text-slate-700 dark:text-slate-200 hover:text-primary transition-colors">
              By Project <ChevronDown size={14} />
            </button>
          </div>
          <button onClick={() => setIsModalOpen(true)} className="bg-blue-700 text-white p-2.5 rounded-full shadow-lg hover:scale-110 transition-all">
            <Plus size={20} />
          </button>
        </div>
      </div>

      <div className="mt-4 w-full">
        {activeTab === 'tasks' ? (
          <div className="flex flex-col gap-4">
            {MY_TASKS_DATA.map((project, index) => (<MyTaskGroup key={index} {...project} />))}
          </div>
        ) : activeTab === 'timesheet' ? (
          <div className="mt-6 bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col">
            <div className="h-[550px] w-full">
              <DataGrid
                rows={rows}
                columns={columns}
                processRowUpdate={processRowUpdate}
                disableRowSelectionOnClick
                hideFooter
                rowHeight={64}
                sx={{
                  border: 'none',
                  '& .MuiDataGrid-main': { borderTop: 'none' },
                  '& .MuiDataGrid-columnHeaders': { 
                    backgroundColor: '#f8fafc',
                    minHeight: '60px !important',
                  },
                  '& .MuiDataGrid-columnHeader': {
                    borderRight: '1px solid #e2e8f0 !important',
                  },
                  '& .MuiDataGrid-cell': {
                    borderRight: '1px solid #e2e8f0 !important',
                    borderBottom: '1px solid #f1f5f9',
                    padding: 0,
                  },
                  '& .MuiDataGrid-row.Mui-selected, & .MuiDataGrid-row:hover': {
                    backgroundColor: '#f8fafc !important',
                  },
                  '& .MuiDataGrid-cell:focus': {
                    outline: 'none',
                  },
                  '& .MuiDataGrid-cell--withRenderer[data-field="total"], & .MuiDataGrid-columnHeader[data-field="total"]': {
                    borderRight: 'none !important',
                  }
                }}
              />
            </div>

            <div className="flex items-center bg-white border-t-2 border-slate-200">
              <div className="w-[380px] pl-8 py-6 border-r border-slate-200 bg-slate-50/50">
                <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Daily Total</span>
              </div>
              <div className="flex flex-1 items-center font-bold">
                {dailyTotals.totals.map((t, i) => (
                  <div key={i} className="w-[85px] flex justify-center border-r border-slate-200 py-6">
                    {t > 0 ? (
                      <span className="text-slate-800 font-bold">{t.toFixed(1)}</span>
                    ) : (
                      <div className="w-8 h-[2px] bg-slate-100" />
                    )}
                  </div>
                ))}
                <div className="w-[110px] text-center text-blue-600 text-xl font-black bg-blue-50/30 py-6">
                  {dailyTotals.grandTotal.toFixed(1)}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      <AddTaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}