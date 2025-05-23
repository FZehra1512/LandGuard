import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Home from "@/pages/Home";
import SocialPostsPage from "@/pages/Social";
import NotFound from "@/pages/NotFound";
import Layout from "@/components/Layout";
import AdminLayout from "@/pages/Admin";
import GreeneryDashboard from "@/pages/GreeneryDashboard";
import CreatePost from "@/pages/CreatePost";
import DrivesPage from "@/pages/Drives";
import CreateDrive from "@/pages/CreateDrive";
import StoryPage from "@/pages/Story";
import Login from "@/pages/Login";
import SignUp from "@/pages/SignUp";
import AddLocation from "@/pages/Admin/pages/AddLocation";
import ManageLocations from "@/pages/Admin/pages/ManageLocations";
import AdminHome from "@/pages/Admin/pages/Home";
import UserLayout from "@/pages/User";
import UserProfile from "@/pages/User/pages/Profile";
import UserDrives from "@/pages/User/pages/UserDrives";
import ContactPage from "@/pages/Contact";
import ProtectedRoute from "./protectedRoutes";
import ManageUsers from "@/pages/Admin/pages/AllUsers";
import UserPosts from "@/pages/User/pages/UserPosts";

// TODO:Implement lazy loading and loader component 

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, [pathname]);

  return null;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <ScrollToTop />
        <Layout />
      </>
    ),
    children: [
      { index: true, element: <Home /> }, // Default route
      { path: "greeneryDashboard", element: <GreeneryDashboard /> },
      { path: "social", element: <SocialPostsPage /> },
      { path: "drives", element: <DrivesPage /> },
      { path: "create-drive", element: <CreateDrive /> },
      { path: "story", element: <StoryPage /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <SignUp /> },
      { path: "create-post", element: <CreatePost /> },
      { path: "contact", element: <ContactPage /> },
      { 
        path: "admin",
        element: <ProtectedRoute allowedRole="admin" />,
        children: [
          { 
            element: <AdminLayout />,
            children: [
              { index: true, element: <AdminHome /> },
              { path: "managelocations", element: <ManageLocations /> },
              { path: "addlocation", element: <AddLocation /> },
              { path: "users", element: <ManageUsers /> }
            ]
          }
        ]
      },
      { 
        path: "user",
        element: <ProtectedRoute allowedRole="user" />,
        children: [
          {
            element: <UserLayout />,
            children: [
              { index: true, element: <UserProfile /> },
              { path: "drives", element: <UserDrives /> },
              { path: "posts", element: <UserPosts /> }
            ]
          }
        ]
      },
    ],
  },
  { path: "*", element: <NotFound /> }, // 404 Page
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
