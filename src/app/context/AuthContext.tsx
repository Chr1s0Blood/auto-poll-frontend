import { useAuthStore } from "../store/useAuthStore";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

export default function AuthContext({ children }: Props) {
  const navigate = useNavigate();

  const location = useLocation()

  const { userCode } = useAuthStore();

  if (!userCode && location.pathname !== "/login") {
    navigate("/login");
  }

  return (
    <>
        {children}
    </>
  );
}
