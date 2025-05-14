import { Link } from "react-router-dom";
import logo from "@/assets/images/Landguard_logo.png";
import { Facebook, Instagram, Mail } from "lucide-react";
//TODO: Add inta link
const Footer = () => {
  return (
    <footer className="bg-background border-t w-full">
      <div className="w-full">
        <div className="px-6 pt-12 sm:px-12 xl:px-32 flex flex-col justify-start md:flex-row md:justify-between gap-10">
          {/* Logo and Description */}
          <div className="space-y-4">
            <Link to="/">
              <img src={logo} alt="Logo" className="w-40 sm:w-44" />
            </Link>
            <p className="text-sm text-muted-foreground">
              Empowering communities through sustainable environmental initiatives and social engagement.
            </p>
            {/* Social Links */}
          <div>
            <h3 className="font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-8">
              <a
                href="https://www.facebook.com/share/19EyeaH4Dc/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="mailto:landguardinfo@gmail.com"
                className="text-muted-foreground hover:text-primary"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/story" className="text-sm text-muted-foreground hover:text-primary">
                  Our Story
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/greeneryDashboard" className="text-sm text-muted-foreground hover:text-primary">
                  Greenery Dashboard
                </Link>
              </li>
              <li>
                <Link to="/signup" className="text-sm text-muted-foreground hover:text-primary">
                  Create an account
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="font-semibold mb-4">Community</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/social" className="text-sm text-muted-foreground hover:text-primary">
                  Social Posts
                </Link>
              </li>
              <li>
                <Link to="/drives" className="text-sm text-muted-foreground hover:text-primary">
                  Drives
                </Link>
              </li>
              <li>
                <Link to="/create-drive" className="text-sm text-muted-foreground hover:text-primary">
                  Create Drive
                </Link>
              </li>
              <li>
                <Link to="/create-post" className="text-sm text-muted-foreground hover:text-primary">
                  Create Post
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="w-full border-t mt-8 pt-8 text-center py-8">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} LandGuard. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;