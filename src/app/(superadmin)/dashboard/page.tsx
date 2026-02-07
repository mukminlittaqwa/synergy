import DashboardSuperAdmin from "@/feature/superadmin/dashboard/page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Synergy - dashboard",
  description: "Synergy - dashboard superadmin",
};

export default function Dashboard() {
  return <DashboardSuperAdmin/>
}
