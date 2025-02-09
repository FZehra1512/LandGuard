import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "@/pages/Home";
import AdminDashboard from "@/pages/Admin";
import NotFound from "@/pages/NotFound";
import Layout from "@/components/Layout";
// Implement lazy loading and loader component 
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Wrap pages in a common layout
    children: [
      { index: true, element: <Home /> }, // Default route
      { path: "admin", element: <AdminDashboard /> },
    ],
  },
  { path: "*", element: <NotFound /> }, // 404 Page
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
