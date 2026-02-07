'use client';

import React from 'react';
import { Star } from 'lucide-react';
import AtomicChip from './dataComponent/AtomicChip';
import Link from 'next/link';

interface AtomicProjectCardProps {
  id: string | number;
  title: string;
  subtitle: string;
  category: string;
  lastActive: string;
  isFavorite?: boolean;
  onFavoriteToggle?: () => void;
  /** Warna untuk chip kategori */
  categoryColor?: 'primary' | 'success' | 'warning' | 'info' | 'error' | 'default';
}

const AtomicProjectCard = ({
  id,
  title,
  subtitle,
  category,
  lastActive,
  isFavorite,
  onFavoriteToggle,
  categoryColor = 'default'
}: AtomicProjectCardProps) => {
  return (
    <div className="group relative flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5 transition-all hover:border-primary hover:shadow-md dark:border-slate-800 dark:bg-boxdark sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-4 sm:items-center">
        {/* Tombol Favorit (Bintang) */}
        <button 
          onClick={onFavoriteToggle}
          className={`mt-1 transition-colors sm:mt-0 ${isFavorite ? 'text-yellow-400 fill-yellow-400' : 'text-slate-300 hover:text-yellow-400'}`}
        >
          <Star size={22} />
        </button>

        <div className="flex flex-col">
          <Link href={`/project/${id}`}>
          <h3 className="text-lg font-bold text-black dark:text-white group-hover:text-primary transition-colors cursor-pointer">
            {title}
            </h3>
            </Link>
          <p className="text-sm text-slate-500 font-medium">
            For: <span className="text-slate-700 dark:text-slate-300">{subtitle}</span>
          </p>
        </div>
      </div>

      <div className="flex flex-row items-center justify-between gap-6 sm:flex-row">
        {/* Tag Kategori menggunakan AtomicChip kita */}
        <AtomicChip 
          label={category} 
          color={categoryColor} 
          variantType="soft" 
          className="text-[10px] font-black tracking-widest uppercase px-4 h-7"
        />

        {/* Metadata Waktu */}
        <div className="text-right min-w-[120px]">
          <p className="text-[11px] font-medium text-slate-400 uppercase tracking-tight">
            Active: <span className="font-bold text-slate-600 dark:text-slate-300">{lastActive}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AtomicProjectCard;