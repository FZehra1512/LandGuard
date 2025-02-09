import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div>
        {/* <Navbar />, Footer, Scroll to top */}
      <div>
        <Outlet /> {/* This renders child routes */}
      </div>
    </div>
  );
}
