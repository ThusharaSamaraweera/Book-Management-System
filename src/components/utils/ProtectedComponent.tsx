import { useAppSelector } from "../../store";

interface ProtectedComponentProps {
    children: React.ReactNode;
    privilegeUserId: string;
}

const ProtectedComponent: React.FC<ProtectedComponentProps> = ({ children, privilegeUserId }) => {
  const loggedUser = useAppSelector((state) => state.global.user);
    // console.log(loggedUser?.id, privilegeUserId);
  if (!loggedUser || loggedUser.id !== privilegeUserId) {
    return null;
  }

  return <div>{children}</div>;
};

export default ProtectedComponent;
