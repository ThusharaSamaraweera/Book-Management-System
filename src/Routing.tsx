import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/pages/Login";
import LandingPage from "./components/pages/LandingPage";

const Routing = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default Routing;
