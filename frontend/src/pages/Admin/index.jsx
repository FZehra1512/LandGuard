import { AppSidebar } from "@/components/AdminSidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Outlet } from "react-router-dom"

export default function AdminLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex flex-col h-screen w-full">
        <div className="my-2 p-2 w-full bg-background flex items-center rounded-[0.5rem] shadow-md">
            <SidebarTrigger className="h-10 w-10"/>
            <h2 className="pl-4 text-lg">Admin Dashboard</h2>
        </div>
        <div className="flex-1 py-6">
            <Outlet />
        </div>
      </main>
    </SidebarProvider>
  )
}

