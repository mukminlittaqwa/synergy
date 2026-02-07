'use client';

import React from 'react';

interface Tab {
  id: string;
  label: string;
}

interface AtomicTabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (id: string) => void;
}

const AtomicTabs = ({ tabs, activeTab, onChange }: AtomicTabsProps) => {
  return (
    <div className="flex border-b border-slate-200 dark:border-slate-800 mb-6 overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`px-4 py-3 text-sm font-bold transition-all whitespace-nowrap border-b-2 ${
            activeTab === tab.id
              ? 'border-primary text-primary'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default AtomicTabs;