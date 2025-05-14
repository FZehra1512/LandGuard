import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { logoutUser } from "@/api/authEndpoints";
import { useState } from "react";

export const useLogout = () => {
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async (onSuccessCallback) => {
    try {
      setIsLoggingOut(true);
      const response = await logoutUser();
      console.log(response);

      const shouldRedirect = [200, 205, 400, 401].includes(response.code);

      if (shouldRedirect) {
        localStorage.removeItem("landGuardtoken");
        localStorage.removeItem("landGuardRefreshtoken");

        if (response.code === 400 && response.data?.detail) {
          toast({
            variant: "warning",
            title: "Warning",
            description: response.data.detail,
          });
        } else {
          toast({
            variant: "success",
            title: "Success",
            description: "Logged out successfully.",
          });
        }

        onSuccessCallback?.();
        setTimeout(() => {
          navigate("/login");
        }, 500);
      } else {
        toast({
          variant: "warning",
          title: "Error",
          description: "Failed to logout. Please try again.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An error occurred while logging out. Please try again.",
      });
    } finally {
      setIsLoggingOut(false);
    }
  };

  return { handleLogout, isLoggingOut };
};
