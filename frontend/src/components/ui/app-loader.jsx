import { cn } from "@/lib/utils";
import logo from "@/assets/images/Landguard_logo.png";

const AppLoader = ({ className }) => {
  return (
    <div className={cn("fixed inset-0 flex items-center justify-center bg-background", className)}>
      <div className="flex flex-col items-center gap-4">
        <img 
          src={logo} 
          alt="LandGuard Logo" 
          className="w-40 sm:w-56 animate-pulse"
        />
      </div>
    </div>
  );
};

export default AppLoader;
