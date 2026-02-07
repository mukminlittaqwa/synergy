'use client';

import React from 'react';

interface AtomicSummaryCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  /** Warna dasar (hex atau class) untuk background icon dan text icon */
  iconBgColor?: string;
  iconColor?: string;
}

const AtomicSummaryCard = ({ 
  title, 
  value, 
  icon, 
  iconBgColor = 'bg-primary/10', 
  iconColor = 'text-primary' 
}: AtomicSummaryCardProps) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-boxdark">
      <div className="flex items-center gap-4">
        {/* Icon Wrapper dengan warna pastel */}
        <div className={`flex h-16 w-16 items-center justify-center rounded-2xl ${iconBgColor} ${iconColor}`}>
          {/* Kita paksa ukuran icon di sini agar konsisten */}
          {React.cloneElement(icon as React.ReactElement<{ size?: number }>, { size: 28 })}
        </div>

        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {title}
          </span>
          <h4 className="text-3xl font-bold text-black dark:text-white">
            {value}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default AtomicSummaryCard;