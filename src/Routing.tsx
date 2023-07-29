import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeSection from "./components/HomeSection";

const Routing = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <HomeSection />
      ),
    },
  ]);
  return <RouterProvider router={router} />;
};

export default Routing;
