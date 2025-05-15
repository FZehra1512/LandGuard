import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import { LogOut, MapPinCheck, Trees, User2, UsersRound } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState, useEffect, createContext, useContext } from "react";
import { useLogout } from "@/hooks/use-logout";
import { useAuth } from "@/providers/AuthProvider";
import { getUserDetails } from "@/api/userProfileEndpoints";

// Create UserProfileContext
export const UserProfileContext = createContext();

export const useUserProfile = () => {
  const context = useContext(UserProfileContext);
  if (!context) {
    throw new Error("useUserProfile must be used within a UserProfileProvider");
  }
  return context;
};

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
    url: "/user/posts",
    icon: MapPinCheck,
  },
  {
    title: "Logout",
    icon: LogOut,
    onClick: (openLogoutDialog) => openLogoutDialog(),
  },
]

export default function UserLayout() {
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { handleLogout, isLoggingOut } = useLogout();
  const { userDetails } = useAuth();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await getUserDetails();
        if (response.code === 200) {
          setUserProfile(response.data);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <UserProfileContext.Provider value={{ userProfile, isLoading, setUserProfile }}>
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
        <main className="flex flex-col h-screen w-full md:overflow-hidden">
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
    </UserProfileContext.Provider>
  );
}
