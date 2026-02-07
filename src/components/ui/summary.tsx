import React from 'react';

interface SummaryCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  colorClassName?: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ 
  title, 
  value, 
  icon, 
  description, 
  trend,
  colorClassName = "text-meta-3 bg-meta-2"
}) => {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-stroke bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl dark:border-strokedark dark:bg-boxdark dark:hover:shadow-white/5">
      
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary/5 transition-all duration-500 group-hover:scale-150 group-hover:bg-primary/10" />

      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <div className={`flex h-13 w-13 items-center justify-center rounded-xl transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110 ${colorClassName} dark:bg-meta-4 shadow-inner`}>
            {icon}
          </div>
          
          {trend && (
            <div className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold ${
              trend.isPositive 
                ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10' 
                : 'bg-red-100 text-red-600 dark:bg-red-500/10'
            }`}>
              <span>{trend.isPositive ? '↑' : '↓'}</span>
              <span>{trend.value}%</span>
            </div>
          )}
        </div>

        <div className="mt-6">
          <div>
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
              {title}
            </span>
            <h4 className="mt-1 text-2xl font-bold text-black dark:text-white 2xl:text-3xl">
              {value}
            </h4>
          </div>
        </div>

        {description && (
          <div className="mt-4 flex items-center gap-2">
            <div className="h-1 w-1 rounded-full bg-slate-300" />
            <p className="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              {description}
            </p>
          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 h-1 w-0 bg-linear-to-r from-emerald-500 to-teal-400 transition-all duration-500 group-hover:w-full" />
    </div>
  );
};

export default SummaryCard;