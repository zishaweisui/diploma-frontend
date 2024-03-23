import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import serviceAuth from "services/auth";

const RequiredAnonymous = () => {
  const refresh = useSelector((state) => state.auth.refresh);

  if (serviceAuth.isAuthed(refresh)) {
    return <Navigate to="/cabinet" />;
  }

  return <Outlet />;
};

export default RequiredAnonymous;
