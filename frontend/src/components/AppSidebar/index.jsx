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

export function AppSidebar({menuLinks, openLogoutDialog}) {
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
              {menuLinks.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild size="lg" className={`${open ? "" : "!pl-1"}`}>
                    {item.title === "Logout" ? (
                      <div onClick={openLogoutDialog} className="cursor-pointer">
                        <item.icon style={{width: "22px", height: "22px"}}/>
                        <span className="pl-4 text-base">{item.title}</span>
                      </div>
                    ) : (
                      <Link to={item.url}>
                        <item.icon style={{width: "22px", height: "22px"}}/>
                        <span className="pl-4 text-base">{item.title}</span>
                      </Link>
                    )}
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
