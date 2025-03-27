import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCategory, initializeCategory } from "../../store/filtersSlice";
import { getImageUrl } from "../../utils/getImageUrl";

const CategoryCard = ({ categoryDetails }) => {
  const { displayText, imageUrl } = categoryDetails;
  const dispatch = useDispatch();

  return (
    <div className="w-full sm:w-1/2 md:w-1/3 p-2">
      <Link
        to="/products"
        className="block"
        onClick={() => {
          dispatch(initializeCategory());
          dispatch(addCategory(displayText));
        }}
      >
        <div
          className="relative h-48 rounded-lg overflow-hidden bg-cover bg-center shadow-md hover:shadow-lg transition-shadow"
          style={{ backgroundImage: `url(${getImageUrl(imageUrl)})` }}
        >
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <p className="text-white text-lg md:text-2xl font-semibold text-center px-4 truncate">
              {displayText}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CategoryCard;
