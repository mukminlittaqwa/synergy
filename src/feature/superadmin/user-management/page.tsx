'use client'

import React from 'react';
import { UserPlus, Users, ShieldCheck, UserX } from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';
import AtomicSummaryCard from '@/components/ui/AtomicSummaryCard';
import AtomicButton from '@/components/ui/inputs/AtomicButton';
import AtomicDataTable from '@/components/ui/table/MuiTable';
import { userColumns, userRows } from './data/user-list';

export default function UserManagementPage() {
  return (
    <>
      <PageHeader 
        title="User Management"
        description="Kelola hak akses dan profil seluruh anggota WALHI"
        renderRight={
          <AtomicButton 
            variant="contained" 
            startIcon={<UserPlus size={20} />}
            onClick={() => console.log('Add User')}
          >
            Tambah User Baru
          </AtomicButton>
        }
      />

      {/* Summary Cards */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-6">
        <AtomicSummaryCard 
          title="Total Users"
          value="156"
          icon={<Users />}
          iconBgColor="bg-blue-100"
          iconColor="text-blue-600"
        />
        <AtomicSummaryCard 
          title="Admins"
          value="12"
          icon={<ShieldCheck />}
          iconBgColor="bg-green-100"
          iconColor="text-green-600"
        />
        <AtomicSummaryCard 
          title="Inactive"
          value="8"
          icon={<UserX />}
          iconBgColor="bg-red-100"
          iconColor="text-red-600"
        />
      </div>

      {/* Data Table */}
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <AtomicDataTable 
          title="Daftar Pengguna Sistem"
          rows={userRows}
          columns={userColumns}
          checkboxSelection
        />
      </div>
    </>
  );
}