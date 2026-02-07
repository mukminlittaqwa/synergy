'use client'

import React from 'react';
import { Plus, Users, UserCheck, Rocket, Filter, LayoutGrid, List } from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';
import AtomicButton from '@/components/ui/inputs/AtomicButton';
import AtomicSummaryCard from '@/components/ui/AtomicSummaryCard';
import AtomicProjectCard from '@/components/ui/AtomicProjectCard';

const MOCK_PROJECTS = [
  {
    id: 1,
    title: 'Development of Community-based Waste Management System',
    subtitle: 'WALHI Central Java',
    category: 'PRODUCT',
    categoryColor: 'default' as const,
    lastActive: 'Today 09:31',
    isFavorite: false
  },
  {
    id: 2,
    title: 'Investigating Illegal Mining Activities in Kalimantan',
    subtitle: 'WALHI East Kalimantan',
    category: 'RESEARCH',
    categoryColor: 'primary' as const,
    lastActive: 'Yesterday 21:03',
    isFavorite: true
  },
  {
    id: 3,
    title: 'Analyzing Deforestation Rates in Sumatra Regions',
    subtitle: 'WALHI South Sumatra',
    category: 'ANALYTICS',
    categoryColor: 'info' as const,
    lastActive: 'Yesterday 16:29',
    isFavorite: false
  },
  {
    id: 4,
    title: 'Youth Environmental Leadership Training Program',
    subtitle: 'WALHI National Secretariat',
    category: 'HR/ORG',
    categoryColor: 'success' as const,
    lastActive: 'Yesterday 15:54',
    isFavorite: false
  }
];

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-7xl p-4 md:p-6">
      <PageHeader 
        title="Projects"
        renderRight={
          <AtomicButton variant="contained" startIcon={<Plus size={18} />}>
            New Project
          </AtomicButton>
        }
      />

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <AtomicSummaryCard title="Active Teams" value="12" icon={<Users />} iconBgColor="bg-blue-50" iconColor="text-blue-600" />
        <AtomicSummaryCard title="Total Members" value="84" icon={<UserCheck />} iconBgColor="bg-green-50" iconColor="text-green-600" />
        <AtomicSummaryCard title="Active Projects" value="24" icon={<Rocket />} iconBgColor="bg-purple-50" iconColor="text-purple-600" />
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-xl bg-white p-2 border border-slate-100 dark:bg-boxdark dark:border-slate-800">
        <div className="flex p-1 bg-slate-50 dark:bg-slate-800 rounded-lg">
          <button className="px-6 py-1.5 text-sm font-bold text-primary bg-white rounded-md shadow-sm dark:bg-slate-700 dark:text-white">Active</button>
          <button className="px-6 py-1.5 text-sm font-bold text-slate-400">Completed</button>
        </div>

        <div className="flex items-center gap-6 text-slate-500">
          <button className="flex items-center gap-2 text-sm font-bold hover:text-primary"><Filter size={16} /> Filter</button>
          <div className="h-4 w-[1px] bg-slate-200" />
          <div className="text-sm font-bold">Group: <span className="text-black dark:text-white">Favorite</span></div>
          <div className="text-sm font-bold">Sort: <span className="text-black dark:text-white">Activity</span></div>
          <div className="flex items-center gap-2 ml-2">
             <button className="p-1.5 bg-primary/10 text-primary rounded"><LayoutGrid size={18} /></button>
             <button className="p-1.5 hover:bg-slate-100 rounded"><List size={18} /></button>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 mb-2">
           <span className="text-slate-400"><LayoutGrid size={14} /></span>
           <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Other (4)</span>
        </div>
        
        {MOCK_PROJECTS.map((project) => (
          <AtomicProjectCard 
            key={project.id}
            {...project}
            onFavoriteToggle={() => console.log('Toggle', project.id)}
          />
        ))}
      </div>
    </div>
  );
}