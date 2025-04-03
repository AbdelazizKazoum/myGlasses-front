import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const GuestOnly = (props) => {
  const { user } = useSelector((state) => state.auth);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const redirectPath = params.get("redirect");

  if (user) {
    if (user.role === "admin") {
      if (redirectPath) {
        return <Navigate to={redirectPath} />;
      }
      return <Navigate to="/admin" />;
    } else {
      if (redirectPath) {
        return <Navigate to={redirectPath} />;
      }
      return <Navigate to="/" />;
    }
  }
  return props.children;
};

export default GuestOnly;
