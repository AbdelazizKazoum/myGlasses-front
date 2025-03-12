import "./index.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCategory, initializeCategory } from "../../store/filtersSlice";
import { getImageUrl } from "../../utils/getImageUrl";

const CategoryCard = (props) => {
  const { displayText, imageUrl } = props.categoryDetails;
  console.log("🚀 ~ CategoryCard ~ imageUrl:", imageUrl);
  const dispatch = useDispatch();

  return (
    <div className="col-12 col-md-4 mb-4">
      <Link
        to="products"
        className="link-item relative"
        onClick={() => {
          dispatch(initializeCategory());

          dispatch(addCategory(displayText));
        }}
      >
        <div
          className="category-card"
          style={{ backgroundImage: `url(${getImageUrl(imageUrl)})` }}
        >
          <p className=" text-xl md:text-2xl lg:text-3xl font-semibold text-white text-center px-2 break-words truncate">
            {displayText}
          </p>{" "}
        </div>
      </Link>
    </div>
  );
};

export default CategoryCard;
