import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeSection from "./components/HomeSection";
import Login from "./components/Login";

const Routing = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <HomeSection />
      ),
    },
    {
      path: "/login",
      element: (
        <Login />
      )
    }
  ]);
  return <RouterProvider router={router} />;
};

export default Routing;
