import { createContext, useContext, useState, useEffect } from "react";
import { validateUser } from "@/api/authEndpoints";
import { toast } from "@/hooks/use-toast";

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isUser, setIsUser] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userDetails, setUserDetails] = useState({
    email: "",
    username: "",
    userType: ""
  });

  const checkAuthStatus = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("landGuardtoken");
      const refreshToken = localStorage.getItem("landGuardRefreshtoken");

      if (!token && !refreshToken) {
        setIsUser(false);
        return;
      }

      const response = await validateUser();
      
      if (response.code === 200) {
        const { email, username, userType } = response.data.user;
        setUserDetails({
          email,
          username,
          userType
        });
        setIsUser(true);
      } else {
        // Token is invalid or expired
        localStorage.removeItem("landGuardtoken");
        localStorage.removeItem("landGuardRefreshtoken");
        setIsUser(false);
        setUserDetails({
          email: "",
          username: "",
          userType: ""
        });
        toast({
          title: "Session expired",
          description: "Please login again",
          variant: "warning"
        });
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      setIsUser(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const updateUserDetails = (details) => {
    setUserDetails(prev => ({
      ...prev,
      ...details
    }));
  };

  return (
    <AuthContext.Provider 
      value={{ 
        isUser, 
        setIsUser,
        userDetails,
        updateUserDetails,
        setUserDetails,
        isLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
