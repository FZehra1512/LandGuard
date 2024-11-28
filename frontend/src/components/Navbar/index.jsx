import React, {useState, useEffect} from "react";
import logo from "../../assets/images/Landguard_logo.png"

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY > 30) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      };

      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, [isScrolled]);

  return (
    <nav
      className={`fixed z-40 w-full flex items-center justify-between px-32 py-4 transition-colors duration-300 ${
        !isScrolled ? "bg-transparent" : "bg-white shadow-md"
      }`}
    >
      {/* Logo Section */}
      <a href="/" className="flex items-center space-x-4">
        <img src={logo} alt="Logo" className="w-10 h-10" />
        <p className="text-3xl font-extrabold text-gray-800">
          <span className="text-secColor">Land</span>Guard
        </p>
      </a>

      {/* Links Section */}
      <ul className="hidden md:flex w-1/3 justify-between text-xl font-medium">
        <li>
          <a href="#home">Home</a>
        </li>
        <li>
          <a href="#about">Alerts</a>
        </li>
        <li>
          <a href="#features">Features</a>
        </li>
        <li>
          <a href="#contact">Contact</a>
        </li>
      </ul>

      {/* Buttons Section */}
      <div className="space-x-8">
        <button className="btn-gradient text-lg py-2">Login</button>
        <button className="btn-outlined text-lg py-2 px-7">Sign Up</button>
      </div>
    </nav>
  );
};

export default Navbar;
