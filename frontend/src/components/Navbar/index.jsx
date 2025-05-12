import React, { useState, useEffect } from "react";
import logo from "../../assets/images/Landguard_logo.png";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react"; // Import icons
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    <div className={`fixed z-50 w-full flex items-center justify-between transition-colors duration-300 ${
      isScrolled || isMenuOpen? "bg-white shadow-md" : "bg-transparent"
    }`}>
      <nav
        className={`w-full relative z-50 flex items-center justify-between py-3 ${
          isScrolled || isMenuOpen? "shadow-md" : ""
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
          <li><a href="#features">Features</a></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>

        {/* Desktop Buttons */}
        <div className="hidden lg:block space-x-8">
          <Link to="/login">
            <Button size="lg">Login</Button>
          </Link>
          <Link to="/signup">
            <Button variant="outline" size="lg">Sign Up</Button>
          </Link>
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
        className={`fixed left-0 z-40 py-6 w-full bg-white transform ${
          isMenuOpen ? "shadow-md top-14 translate-y-0" : "-translate-y-full"
        } transition-transform duration-500 ease-in lg:hidden`}
      >
        <ul className="flex flex-col items-center space-y-4 py-5 text-lg font-medium">
          <li><a href="#home" onClick={() => setIsMenuOpen(false)}>Home</a></li>
          <li><a href="#alerts" onClick={() => setIsMenuOpen(false)}>Alerts</a></li>
          <li><a href="#features" onClick={() => setIsMenuOpen(false)}>Features</a></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>

        {/* Mobile Buttons */}
        <div className="flex flex-col items-center space-y-4 py-4">
          <Link to="/login" className="w-2/3">
            <Button size="lg" className="w-full">Login</Button>
          </Link>
          <Link to="/signup" className="w-2/3">
            <Button variant="outline" size="lg" className="w-full">Sign Up</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
