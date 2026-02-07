'use client';

import React, { useState } from 'react';
import { Plus, ChevronDown } from 'lucide-react';
import AtomicTabs from '@/components/ui/AtomicTabs';
import MyTaskGroup from '@/components/ui/MyTaskGroup';
import { MY_TASKS_DATA } from './data/my-tasks-data'; // Import data

const MY_TASK_TABS = [
  { id: 'tasks', label: 'Tasks (12)' },
  { id: 'timesheet', label: 'Timesheet' },
  { id: 'activity', label: 'Activity' },
  { id: 'availability', label: 'Availability' },
];

export default function MyTasksPage() {
  const [activeTab, setActiveTab] = useState('tasks');

  return (
    <div className="mx-auto max-w-7xl p-4 md:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 border-b">
        <AtomicTabs 
          tabs={MY_TASK_TABS} 
          activeTab={activeTab} 
          onChange={setActiveTab} 
        />
        
        <div className="flex items-center gap-4 mb-4 sm:mb-0">
          <div className="flex items-center gap-2 text-[10px] font-black tracking-widest text-slate-400 uppercase">
            Group: 
            <button className="flex items-center gap-1 text-slate-700 dark:text-slate-200 hover:text-primary transition-colors">
              By Project <ChevronDown size={14} />
            </button>
          </div>
          <button className="bg-primary text-black p-2.5 rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all">
            <Plus size={20} />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {MY_TASKS_DATA.map((project, index) => (
          <MyTaskGroup 
            key={index}
            projectName={project.projectName}
            projectClient={project.projectClient}
            taskCount={project.taskCount}
            tasks={project.tasks}
          />
        ))}
      </div>
    </div>
  );
}