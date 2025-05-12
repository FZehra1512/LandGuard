import LoginForm from "@/components/LoginForm";
import { Link } from "react-router-dom";
import logo from "@/assets/images/Landguard_logo.png";

const Login = () => {
  return (
    <div className="min-h-svh flex flex-col">
      <nav className="fixed top-0 left-0 right-0 z-50 w-full py-3 flex items-center">
        <Link to="/">
          <img src={logo} alt="Logo" className="w-40 sm:w-44" />
        </Link>
      </nav>
      <div className="flex flex-1 flex-col items-center justify-center bg-white pt-6 md:pt-10 px-6 md:px-10">
        <div className="w-full max-w-sm md:max-w-3xl">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
