'use client';

import ProjectDetailPage from '@/feature/activis/project/project-detail/page';
import { useParams } from 'next/navigation';


export default function Page() {
  const params = useParams();
  const projectId = params.id;
  
  return <ProjectDetailPage />;
}