import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";
import Layout from "@/components/Layout";
import AdminLayout from "@/pages/Admin";
import UpdateNDVI from "@/pages/Admin/pages/UpdateNDVI";
import GreeneryDashboard from "@/pages/GreeneryDashboard";
import Login from "@/pages/Login";
import SignUp from "@/pages/SignUp";
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
      { path: "login", element: <Login /> },
      { path: "signup", element: <SignUp /> },
      { path: "admin", 
        element: <AdminLayout />,
        children: [
          {path: "updateNDVI", element: <UpdateNDVI />}
        ]
      },
    ],
  },
  { path: "*", element: <NotFound /> }, // 404 Page
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
