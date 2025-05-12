import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
// TODO: Google Auth k liye university id use ki hai
// TODO:Implement lazy loading and loader component 
// TODO:/admin should be a protected route, with only admin login 
// TODO: The app loads on each route idk why?
//TODO: Scroll to top
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Wrap pages in a common layout
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
      { path: "admin", 
        element: <AdminLayout />,
        children: [
          { index: true, element: <AdminHome /> },
          {path: "managelocations", element: <ManageLocations />},
          {path: "addlocation", element: <AddLocation />}
        ]
      },
      { path: "user", 
        element: <UserLayout />,
        children: [
          { index: true, element: <UserProfile /> },
          {path: "drives", element: <UserDrives />},
        ]
      },
    ],
  },
  { path: "*", element: <NotFound /> }, // 404 Page
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
