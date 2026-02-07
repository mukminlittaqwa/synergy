'use client';

import React, { useState } from 'react';
import { ChevronDown, Plus } from 'lucide-react';
import TaskItem from './TaskItem';

interface Task {
  title: string;
  pic: string;
  picColor: string;
  date: string;
  isCompleted: boolean;
  isToday?: boolean;
}

interface TaskGroupProps {
  title: string;
  progress: string;
  tasks: Task[];
  defaultExpanded?: boolean;
}

const TaskGroup = ({ title, progress, tasks, defaultExpanded = true }: TaskGroupProps) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <section className="transition-all">
      {/* Header Klikable */}
      <div className="flex items-center justify-between mb-2">
        <div 
          className="flex items-center gap-2 cursor-pointer select-none group"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <ChevronDown 
            size={18} 
            className={`text-slate-400 transition-transform duration-200 ${!isExpanded ? '-rotate-90' : ''}`} 
          />
          <h3 className="font-bold text-slate-800 dark:text-white group-hover:text-primary transition-colors">
            {title}
          </h3>
          <span className="text-slate-400 font-medium">{progress}</span>
        </div>

        <button className="flex items-center gap-1 text-xs font-bold text-primary hover:underline transition-all active:scale-95">
          <Plus size={14} /> Add Task
        </button>
      </div>

      {/* List Konten dengan Animasi Sederhana */}
      <div className={`flex flex-col gap-1 ml-6 overflow-hidden transition-all duration-300 ${
        isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
      }`}>
        {tasks.map((task, idx) => (
          <TaskItem key={idx} {...task} />
        ))}
      </div>
    </section>
  );
};

export default TaskGroup;