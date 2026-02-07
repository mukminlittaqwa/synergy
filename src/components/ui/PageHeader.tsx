'use client';

import React from 'react';

interface PageHeaderProps {
  /** Judul besar halaman */
  title: string;
  /** Deskripsi singkat di bawah judul */
  description?: string;
  /** Elemen opsional di sebelah kanan (Button, Filter, dsb) */
  renderRight?: React.ReactNode;
}

/**
 * Reusable Page Header Component
 * @example
 * <PageHeader 
 * title="Project Environment" 
 * description="Manage your project data"
 * renderRight={<button className="bg-primary p-2 text-white">Add Project</button>}
 * />
 */
const PageHeader = ({ title, description, renderRight }: PageHeaderProps) => {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="text-title-md font-bold text-black dark:text-white">
          {title}
        </h2>
        {description && (
          <p className="font-light text-slate-500 dark:text-slate-400">
            {description}
          </p>
        )}
      </div>

      {/* Bagian Kanan (Slot untuk Button/Actions) */}
      {renderRight && (
        <div className="flex items-center gap-3">
          {renderRight}
        </div>
      )}
    </div>
  );
};

export default PageHeader;