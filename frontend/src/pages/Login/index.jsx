import LoginForm from "@/components/LoginForm";
import { LogoNavbar } from "@/components/Navbar";

const Login = () => {
  return (
    <div className="min-h-svh flex flex-col">
      <LogoNavbar />
      <div className="flex flex-1 flex-col items-center justify-center bg-white pt-6 md:pt-14 px-6 md:px-10">
        <div className="w-full max-w-sm md:max-w-3xl">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
