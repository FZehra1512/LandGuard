import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import { Home, LogOut, MapPinCheck, MapPinPlus, UsersRound } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState, createContext, useEffect } from "react";
import { useLogout } from "@/hooks/use-logout";
import { useAuth } from "@/providers/AuthProvider";
import { getAllUsers } from "@/api/adminEndPoints";
import { toast } from "@/hooks/use-toast";

// Create context for users data
export const UsersContext = createContext();

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
    title: "Logout",
    icon: LogOut,
    onClick: (openLogoutDialog) => openLogoutDialog(),
  },
]

export default function AdminLayout() {
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const { handleLogout, isLoggingOut } = useLogout();
  const { userDetails } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await getAllUsers();
        if (response.code === 200) {
          setUsers(response.data);
        } else {
          toast({
            variant: "warning",
            title: "Error",
            description: "Failed to fetch users",
          });
        }
      } catch (error) {
        console.error(error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch users",
        });
      }
      setLoading(false);
    };

    fetchUsers();
  }, []);

  return (
    <UsersContext.Provider value={{ users, loading, setUsers }}>
      <SidebarProvider>
        <AppSidebar menuLinks={items} openLogoutDialog={() => setShowLogoutDialog(true)}/>
        <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Logout</DialogTitle>
              <DialogDescription>
                Are you sure you want to logout? You will need to login again to access your account.
              </DialogDescription>
            </DialogHeader>

            <DialogFooter className="gap-4">
              <Button variant="outline" onClick={() => setShowLogoutDialog(false)} disabled={isLoggingOut}>
                Cancel
              </Button>
              <Button 
                variant="destructive" 
                onClick={() => handleLogout(() => setShowLogoutDialog(false))} 
                disabled={isLoggingOut}
              >
                {isLoggingOut ? "Logging out..." : "Logout"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <main className="flex flex-col h-screen w-full overflow-y-auto md:overflow-hidden">
          <div className="sticky top-0 w-full z-10 bg-white">
            <div className="my-2 w-full p-2 bg-background border flex items-center rounded-[0.5rem] shadow-md">
              <SidebarTrigger className="h-10 w-10" />
              <h2 className="pl-4 text-lg">Hi, {userDetails.username}</h2>
            </div>
          </div>
          <div className="flex-1">
            <Outlet />
          </div>
        </main>
      </SidebarProvider>
    </UsersContext.Provider>
  );
}
