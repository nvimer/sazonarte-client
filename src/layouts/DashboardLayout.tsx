import { Sidebar } from "@/components/layout/Sidebar";
import { TopBar } from "@/components/layout/TopBar";
import type { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-neutral-50">
      <Sidebar />
      <div className="ml-64">
        <TopBar />
        <main className="p-10">{children}</main>
      </div>
    </div>
  );
}
