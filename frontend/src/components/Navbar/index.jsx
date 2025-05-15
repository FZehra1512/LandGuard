import React, { useState, useEffect } from "react";
import logo from "@/assets/images/Landguard_logo.png";
import { Button } from "@/components/ui/button";
import { Menu, X, User2 } from "lucide-react"; // Import icons
import { Link } from "react-router-dom";
import { useAuth } from "@/providers/AuthProvider";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isUser, userDetails } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="fixed z-50 w-full flex py-3 items-center justify-between">
      <nav
        className={`w-full relative  rounded-md md:rounded-lg mx-3 md:mx-6 px-3 sm:px-6 xl:px-[6.5rem] z-50 flex items-center justify-between py-2 transition-colors duration-300 ${
          isScrolled || isMenuOpen ? "bg-white shadow-md border border-slate-200" : "bg-transparent"
        }`}
      >
        {/* Logo Section */}
        <a href="/" className="flex items-center space-x-2 sm:space-x-4">
          <img src={logo} alt="Logo" className="w-40 sm:w-44" />
          {/* <p className="text-2xl sm:text-3xl font-extrabold text-primary drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)] sm:drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.5)]">
            <span className="text-secondary">Land</span>Guard
          </p> */}
        </a>

        {/* Desktop Links */}
        <ul className="hidden lg:flex w-1/3 justify-between text-xl font-medium">
          <li><a href="#home">Home</a></li>
          <li><a href="#alerts">Alerts</a></li>
          <li><Link to="/story">Our Story</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>

        {/* Desktop Buttons/Profile */}
        <div className="hidden lg:block space-x-8">
          {isUser && userDetails ? (
            <Link to={userDetails.userType === "admin" ? "/admin" : "/user"}>
              <Button
                size="icon"
                className="rounded-full w-11 h-11 text-xl text-background font-semibold"
              >
                {userDetails.username?.charAt(0).toUpperCase()}
              </Button>
            </Link>
          ) : (
            <>
              <Link to="/login">
                <Button size="lg">Login</Button>
              </Link>
              <Link to="/signup">
                <Button variant="outline" size="lg">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden z-50"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu (Sliding Down) */}
      <div
        className={`fixed left-0 z-40 px-3 w-full pt-9 transform ${
          isMenuOpen ? "shadow-md top-14 translate-y-0" : "-translate-y-full"
        } transition-transform duration-500 ease-in-out lg:hidden`}
      >
        <div className={`w-full bg-white rounded-md`}>
          <ul className="flex flex-col items-center space-y-4 py-5 text-lg font-medium">
            <li>
              <a href="#home" onClick={() => setIsMenuOpen(false)}>
                Home
              </a>
            </li>
            <li>
              <a href="#alerts" onClick={() => setIsMenuOpen(false)}>
                Alerts
              </a>
            </li>
            <li>
              <a href="/story" onClick={() => setIsMenuOpen(false)}>
                Our Story
              </a>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>

          {/* Mobile Buttons/Profile */}
          <div className="flex flex-col items-center space-y-4 py-4">
            {isUser && userDetails ? (
              <Link
                to={userDetails.role === "admin" ? "/admin" : "/user"}
                className="w-2/3"
              >
                <Button
                  size="lg"
                  className="w-full flex items-center justify-center gap-2"
                >
                  <User2 size={20} />
                  Profile
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/login" className="w-2/3">
                  <Button size="lg" className="w-full">
                    Login
                  </Button>
                </Link>
                <Link to="/signup" className="w-2/3">
                  <Button variant="outline" size="lg" className="w-full">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

export const LogoNavbar = () => {
  return (
    <div className="fixed z-50 w-full flex py-3 items-center justify-between">
      <nav className="w-full shadow-sm border border-slate-200 rounded-md md:rounded-lg mx-3 md:mx-6 px-3 sm:px-6 xl:px-[6.5rem] bg-white py-2 flex items-center">
        <Link to="/">
          <img src={logo} alt="Logo" className="w-40 sm:w-44" />
        </Link>
      </nav>
    </div>
  );
};
