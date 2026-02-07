import SuperAdminProjectManagementPage from "@/feature/superadmin/project-management/page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Synergy - dashboard",
  description: "Synergy - dashboard superadmin",
};

export default function ProjectMagement() {
  return <SuperAdminProjectManagementPage/>
}
