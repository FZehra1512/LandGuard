import { Home, MapPinCheck, MapPinPlus, Search, Settings, UsersRound } from "lucide-react"
import logo from "../../assets/images/Landguard_white_logo.png"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Link } from "react-router-dom"

// Menu items.
const items = [
  {
    title: "Home",
    url: "/admin",
    icon: Home,
  },
  {
    title: "Add Location",
    url: "/admin/addlocation",
    icon: MapPinPlus,
  },
  {
    title: "Manage Locations",
    url: "/admin/managelocations",
    icon: MapPinCheck,
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: UsersRound,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]

export function AppSidebar() {
    const { open } = useSidebar()
  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarHeader className={`${open ? "p-4" : "p-2"} flex flex-row items-center h-auto justify-center`}>
      <Link to="/">
        <img src={logo} alt="Logo" className="w-44" />
      </Link>
        {/* <div className={`${open ? "h-10 w-10" : "h-8 w-8"} rounded bg-background flex justify-center items-center`}><img src={logo} alt="Logo" className={`${open ? "w-6" : "w-4"}`} /></div>
        <h2 className={`${open ? "block" : "hidden"} text-xl`}>LandGuard</h2> */}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild size="lg" className={`${open ? "" : "!pl-1"}`}>
                    <Link to={item.url}>
                      <item.icon style={{width: "22px", height: "22px"}}/>
                      <span className="pl-4 text-base">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
