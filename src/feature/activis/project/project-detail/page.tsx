'use client';

import React, { useState } from 'react';
import { Plus, ChevronDown, List as ListIcon } from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';
import AtomicTabs from '@/components/ui/AtomicTabs';
import TaskItem from '@/components/ui/TaskItem';
import TaskGroup from '@/components/ui/TaskGroup';

const TABS = [
  { id: 'tasks', label: 'Tasks' },
  { id: 'discussions', label: 'Discussions' },
  { id: 'files', label: 'Files' },
  { id: 'notes', label: 'Notes' },
  { id: 'time', label: 'Time' },
  { id: 'expenses', label: 'Expenses' },
  { id: 'activity', label: 'Activity' },
];

export default function ProjectDetailPage() {
  const [activeTab, setActiveTab] = useState('tasks');

  return (
    <div className="mx-auto max-w-7xl p-4 md:p-6">
      <PageHeader title="Advokasi Penyelamatan Mata Air" />
      
      <AtomicTabs tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />

      <div className="grid grid-cols-12 gap-8">
        {/* LEFT CONTENT: Task Groups */}
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-8">
          
              {/* Section 1 */}
              <TaskGroup 
            title="Tahap Investigasi"
            progress="(3/5)"
            tasks={[
              { title: "Survey titik koordinat mata air", pic: "Dika P.", picColor: "bg-blue-500", date: "Jan 12", isCompleted: true },
              { title: "Wawancara warga terdampak", pic: "Wulan S.", picColor: "bg-green-500", date: "Jan 15", isCompleted: true },
              { title: "Pengambilan sampel air lab", pic: "Bagas K.", picColor: "bg-purple-500", date: "Today", isCompleted: false, isToday: true },
            ]}
          />

          <TaskGroup 
            title="Penyusunan Laporan"
            progress="(0/4)"
            defaultExpanded={false}
            tasks={[
              { title: "Analisis data investigasi lapangan", pic: "Dika P.", picColor: "bg-orange-400", date: "Jan 28", isCompleted: false },
              { title: "Draft narasi kronologi konflik", pic: "Wulan S.", picColor: "bg-blue-400", date: "Feb 02", isCompleted: false },
            ]}
          />
        </div>

        {/* RIGHT CONTENT: Sidebar Summary */}
        <div className="col-span-12 lg:col-span-4">
          <div className="sticky top-6 rounded-xl bg-white border border-slate-100 p-6 dark:bg-boxdark dark:border-slate-800">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Task List Summary</h4>
              <ListIcon size={16} className="text-slate-300" />
            </div>
            
            <div className="flex flex-col gap-4">
              {[
                { label: 'Tahap Investigasi', progress: '3/5' },
                { label: 'Penyusunan Laporan', progress: '0/4' },
                { label: 'Kajian Hukum & Advokasi', progress: '0/3' },
                { label: 'Kampanye Media', progress: '0/5' },
                { label: 'Konsolidasi Jaringan', progress: '0/2' },
                { label: 'Evaluasi & Tindak Lanjut', progress: '0/3' },
              ].map((item, idx) => (
                <div key={idx} className="flex justify-between items-center group cursor-pointer">
                  <span className="text-sm font-bold text-slate-600 group-hover:text-primary transition-colors">{item.label}</span>
                  <span className="text-[11px] font-bold text-slate-400">{item.progress}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}