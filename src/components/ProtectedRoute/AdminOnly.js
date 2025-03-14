import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminOnly = (props) => {
  const { user } = useSelector((state) => state.auth);

  if (user?.role !== "admin") {
    return <Navigate to="/login" />;
  }

  return props.children;
};

export default AdminOnly;
