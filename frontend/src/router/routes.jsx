import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";
import Layout from "@/components/Layout";
import AdminLayout from "@/pages/Admin";
import UpdateNDVI from "@/pages/Admin/pages/UpdateNDVI";
// Implement lazy loading and loader component 
// /admin should be a protected route, with only admin login 
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Wrap pages in a common layout
    children: [
      { index: true, element: <Home /> }, // Default route
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
