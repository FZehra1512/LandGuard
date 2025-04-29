import { AppSidebar } from "@/components/AdminSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex flex-col h-screen w-full overflow-hidden">
        <div className="sticky top-0 w-full z-10 bg-white">
          <div className="my-2 w-full p-2 bg-background border flex items-center rounded-[0.5rem] shadow-md">
            <SidebarTrigger className="h-10 w-10" />
            <h2 className="pl-4 text-lg">Admin Dashboard</h2>
          </div>
        </div>
        <div className="flex-1">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
}
