import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const GuestOnly = (props) => {
  const { user } = useSelector((state) => state.auth);

  if (user) {
    if (user.role === "admin") {
      return <Navigate to="/admin" />;
    } else {
      return <Navigate to="/" />;
    }
  }
  return props.children;
};

export default GuestOnly;
