import Routing from "./Routing";
import NavBar from "./components/modules/NavBar";

const ClientApp = () => {
  return (
    <>
      <NavBar />
      <Routing />
      <div>footer</div>
    </>
  );
};

export default ClientApp;
