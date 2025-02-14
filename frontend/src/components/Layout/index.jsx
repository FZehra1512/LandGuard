import { Outlet } from "react-router-dom";
import { Toaster } from "../ui/toaster";

export default function Layout() {
  return (
    <div>
      {/* <Navbar />, Footer, Scroll to top */}
      <Toaster />
      <div>
        <Outlet /> {/* This renders child routes */}
      </div>
    </div>
  );
}
