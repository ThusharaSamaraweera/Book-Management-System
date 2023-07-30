import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/pages/Login";
import LandingPage from "./components/pages/LandingPage";
import AddBook from "./components/pages/AddBook";

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
    {
      path: "/add-book",
      element: <AddBook />,
    }
  ]);
  return <RouterProvider router={router} />;
};

export default Routing;
