import { Link } from "react-router-dom";
import "./index.css";

const NotFound = ({ message }) => (
  <div className="error-container">
    <img
      src="https://res.cloudinary.com/ddaimmqrr/image/upload/v1691572277/Eyesome/404-error.da861bcb12b024818a5b_vq8nhm.gif"
      alt="errorCard"
    />
    <h1>Not Found!</h1>
    <p>{message}</p>
    <Link to="/products" className="link-item m-4">
      <button type="button" className="empty-wishlist-button">
        Explore
      </button>
    </Link>
  </div>
);

export default NotFound;
