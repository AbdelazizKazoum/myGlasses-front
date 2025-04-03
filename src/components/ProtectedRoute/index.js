import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = (props) => {
  const { user } = useSelector((state) => state.auth);

  const localtion = useLocation();

  if (!user) {
    return <Navigate to={`/login?redirect=${localtion.pathname}`} />;
  }
  return props.children;
};

export default ProtectedRoute;
