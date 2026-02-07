'use client'

import React from 'react';
import { Plus, Users, UserCheck, Rocket } from 'lucide-react';
import AtomicDataTable from '@/components/ui/table/MuiTable';
import PageHeader from '@/components/ui/PageHeader';
import { projectColumns, projectRows } from './data/project-list';
import AtomicButton from '@/components/ui/inputs/AtomicButton';
import AtomicSummaryCard from '@/components/ui/AtomicSummaryCard';

export default function SuperAdminProjectManagementPage() {
  return (
    <>
      <PageHeader 
        title="Project Management"
        description="Monitor and manage all active environmental projects"
        renderRight={
          <AtomicButton 
            variant="contained" 
            startIcon={<Plus size={20} />}
            onClick={() => console.log('Add Project')}
          >
            Tambah Project
          </AtomicButton>
        }
      />

      {/* Stats Section - Persis seperti di Gambar */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-6">
        <AtomicSummaryCard 
          title="Active Teams"
          value="12"
          icon={<Users />}
          iconBgColor="bg-blue-100"
          iconColor="text-blue-600"
        />
        <AtomicSummaryCard 
          title="Total Members"
          value="84"
          icon={<UserCheck />}
          iconBgColor="bg-green-100"
          iconColor="text-green-600"
        />
        <AtomicSummaryCard 
          title="Active Projects"
          value="24"
          icon={<Rocket />}
          iconBgColor="bg-purple-100"
          iconColor="text-purple-600"
        />
      </div>

      <div className="mt-4">
        <div className="col-span-12">
          <AtomicDataTable 
            title="Project Environment List"
            rows={projectRows}
            columns={projectColumns} 
          />
        </div>
      </div>
    </>
  );
}