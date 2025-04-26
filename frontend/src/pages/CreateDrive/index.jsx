import { Link } from "react-router-dom";
import logo from "../../assets/images/Landguard_logo.png";
import DriveCreationForm from "@/components/SocialModule/DriveCreationForm";

const CreateDrive = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-green-50 to-white">
      {/* Navbar */}
        <nav className="fixed top-0 left-0 right-0 z-50 w-full py-3 flex items-center">
          <Link to="/">
            <img src={logo} alt="Logo" className="w-40 sm:w-44" />
          </Link>
        </nav>

      {/* Main Content */}
      <div className="flex flex-1 flex-col items-center justify-center pt-28 px-6">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8 md:p-10">
          <h1 className="text-2xl md:text-3xl font-bold text-center text-green-700 mb-6">
            Start a New Plantation Drive
          </h1>
          <p className="text-center text-gray-500 mb-8">
            Fill in the details below to organize your drive and invite people to join!
          </p>
          <DriveCreationForm />
        </div>
      </div>
    </div>
  );
};

export default CreateDrive;
