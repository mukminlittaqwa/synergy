'use client'

import SummaryCard from '@/components/ui/summary';
import React from 'react';
import { 
  Briefcase,
  Clock,
  Users,
  CheckCircle2,
} from 'lucide-react';
import AtomicDataTable from '@/components/ui/table/MuiTable';
import { GridColDef } from '@mui/x-data-grid';
import { projectColumns, projectRows } from './data/project-list';
import { LineChart } from '@/components/ui/charts/LineChart';
import PageHeader from '@/components/ui/PageHeader';

export default function DashboardSuperAdmin() {

  return (
    <>
      <PageHeader 
        title="Dashboard Overview"
        description="Monitor all project active environment"
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <SummaryCard 
          title="Active Projects"
          value="24"
          icon={<Briefcase size={24} />}
          trend={{ value: 12, isPositive: true }}
          description="Advokasi lahan & lingkungan"
        />

        <SummaryCard 
          title="Total Hours"
          value="1,240h"
          icon={<Clock size={24} />}
          colorClassName="text-primary"
          description="Timesheet bulan ini"
        />

        <SummaryCard 
          title="Field Activists"
          value="86"
          icon={<Users size={24} />}
          colorClassName="text-warning"
          description="Aktivis di lapangan"
        />

        <SummaryCard 
          title="Completed Milestones"
          value="92%"
          icon={<CheckCircle2 size={24} />}
          trend={{ value: 5, isPositive: true }}
          colorClassName="text-meta-3"
          description="Target tercapai"
        />
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <div className="col-span-12 xl:col-span-12">
          <AtomicDataTable 
            title="Project Environment List"
            rows={projectRows}
            columns={projectColumns} 
          />
        </div>

        <div className="col-span-12">
          <div className="rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
            <h4 className="mb-4 text-xl font-semibold text-black dark:text-white">
              Environment Performance
            </h4>
            <div className="h-80 w-full bg-gray-1 flex items-center justify-center rounded">
              <LineChart 
                categories={['Jan', 'Feb', 'Mar', 'Apr']}
                series={[{ name: 'Work Hours', data: [30, 70, 45, 90] }]}
                colors={['#10B981']} 
              />
            </div>
          </div>
        </div>
      </div>
    </>
    
  );
}