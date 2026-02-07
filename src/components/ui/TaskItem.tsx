'use client';

import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';

interface TaskItemProps {
  title: string;
  pic: string;
  picColor: string;
  date: string;
  isCompleted: boolean;
  isToday?: boolean;
}

const TaskItem = ({ title, pic, picColor, date, isCompleted, isToday }: TaskItemProps) => {
  return (
    <div className="flex items-center justify-between py-3 px-2 group hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-all">
      <div className="flex items-center gap-4">
        {isCompleted ? (
          <CheckCircle2 size={20} className="text-blue-600" />
        ) : (
          <Circle size={20} className="text-slate-300" />
        )}
        
        <div className={`px-2 py-0.5 rounded text-[10px] font-bold text-white ${picColor}`}>
          {pic}
        </div>
        
        <span className={`text-sm font-medium ${isCompleted ? 'text-slate-400 line-through' : 'text-slate-700 dark:text-slate-200'}`}>
          {title}
        </span>
      </div>
      
      <span className={`ml-2 text-xs font-bold ${isToday ? 'text-red-500' : 'text-slate-400'}`}>
        {date}
      </span>
    </div>
  );
};

export default TaskItem;