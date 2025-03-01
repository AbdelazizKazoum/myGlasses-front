import { Link } from "react-router-dom";
import "./index.css";

const AdminError = ({ message }) => (
  <div className="error-container h-full w-full flex justify-center items-center">
    <img
      src="https://res.cloudinary.com/ddaimmqrr/image/upload/v1691572277/Eyesome/404-error.da861bcb12b024818a5b_vq8nhm.gif"
      alt="errorCard"
    />
    <h1>Something Went Wrong!</h1>
    <p>{message}</p>
    <Link to="/admin" className="link-item m-4">
      <button type="button" className="empty-wishlist-button">
        refresh
      </button>
    </Link>
  </div>
);

export default AdminError;
