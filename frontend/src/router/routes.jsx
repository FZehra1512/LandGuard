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
// TODO: Google Auth k liye university id use ki hai
// TODO:Implement lazy loading and loader component 
// TODO:/admin should be a protected route, with only admin login 
// TODO: The app loads on each route idk why?
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
      { path: "admin", 
        element: <AdminLayout />,
        children: [
          {path: "managelocations", element: <ManageLocations />},
          {path: "addlocation", element: <AddLocation />}
        ]
      },
    ],
  },
  { path: "*", element: <NotFound /> }, // 404 Page
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
