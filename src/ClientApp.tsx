import { Outlet } from "react-router-dom";
import NavBar from "./components/modules/NavBar";

const ClientApp = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default ClientApp;
