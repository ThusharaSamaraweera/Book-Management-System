import { useEffect } from "react";
import { useAppSelector } from "../store";
import { useNavigate } from "react-router-dom";

const RouterProtector = ({ children }) => {
  const loggedUser = useAppSelector((state) => state.global.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedUser) navigate("/login");
  }, []);

  return <div>{children}</div>;
};

export default RouterProtector;
