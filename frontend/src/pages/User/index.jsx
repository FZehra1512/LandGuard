//TODO: Add user name to the navbar
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import { LogOut, MapPinCheck, Trees, User2, UsersRound } from "lucide-react"

// Menu items.
const items = [
  {
    title: "Profile",
    url: "/user",
    icon: User2,
  },
  {
    title: "Drives",
    url: "/user/drives",
    icon: Trees,
  },
  {
    title: "Plantation sites",
    url: "/user",
    icon: MapPinCheck,
  },
  {
    title: "Saved Locations",
    url: "/user",
    icon: UsersRound,
  },
  {
    title: "Logout",
    url: "/user/logout",
    icon: LogOut,
  },
]

export default function UserLayout() {
  return (
    <SidebarProvider>
      <AppSidebar menuLinks={items}/>
      <main className="flex flex-col h-screen w-full md:overflow-hidden">
        <div className="sticky top-0 w-full z-10 bg-white">
          <div className="my-2 w-full p-2 bg-background border flex items-center rounded-[0.5rem] shadow-md">
            <SidebarTrigger className="h-10 w-10" />
            <h2 className="pl-4 text-lg">User Dashboard</h2>
          </div>
        </div>
        <div className="flex-1">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
}
