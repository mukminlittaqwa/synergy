import ProjectsPage from "@/feature/activis/project/page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Synergy - dashboard",
  description: "Synergy - dashboard superadmin",
};

export default function ProjectMagement() {
  return <ProjectsPage/>
}
