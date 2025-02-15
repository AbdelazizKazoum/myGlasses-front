import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = (props) => {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return <Navigate to="/login" />;
  }
  return props.children;
};

export default ProtectedRoute;
