import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import serviceAuth from "services/auth";

const RequiredAuth = () => {
  const refresh = useSelector((state) => state.auth.refresh);

  if (serviceAuth.isAuthed(refresh)) {
    return <Outlet />
  }

  return <Navigate to="/" />;
};

export default RequiredAuth;
