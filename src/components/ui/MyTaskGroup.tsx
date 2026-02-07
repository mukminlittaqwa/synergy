'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import TaskItem from './TaskItem';
import AtomicChip from './dataComponent/AtomicChip';

interface Task {
  title: string;
  pic: string;
  picColor: string;
  date: string;
  isCompleted: boolean;
  category: string;
  categoryColor: 'primary' | 'success' | 'warning' | 'info' | 'error' | 'default';
}

interface MyTaskGroupProps {
  projectName: string;
  projectClient: string;
  taskCount: number;
  tasks: Task[];
}

const MyTaskGroup = ({ projectName, projectClient, taskCount, tasks }: MyTaskGroupProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="mb-4">
      <div 
        className="flex items-center gap-2 py-2 cursor-pointer group"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <ChevronDown 
          size={16} 
          className={`text-primary transition-transform ${!isExpanded ? '-rotate-90' : ''}`} 
        />
        <h3 className="font-bold text-primary text-sm sm:text-base">
          {projectName} ({taskCount})
        </h3>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-2">
          • {projectClient}
        </span>
      </div>

      {isExpanded && (
        <div className="ml-6 border-l border-slate-100 pl-2">
          {tasks.map((task, idx) => (
            <div key={idx} className="flex items-center justify-between group">
              <TaskItem {...task} />
              <div className="hidden sm:block">
                <AtomicChip 
                  label={task.category} 
                  color={task.categoryColor} 
                  variantType="soft" 
                  className="text-[9px] font-black h-6 px-3"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTaskGroup;