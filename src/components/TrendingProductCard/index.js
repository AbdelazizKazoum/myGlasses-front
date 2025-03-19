import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TbSquareRoundedPlusFilled } from "react-icons/tb";
import "./index.css";
import { getImageUrl } from "../../utils/getImageUrl";

const TrendingProductCard = ({ product }) => {
  const { id, name, image, price, category, detail = [] } = product;

  const [selectedImage, setSelectedImage] = useState(getImageUrl(image));
  const [selectedColorIndex, setSelectedColorIndex] = useState(null);

  useEffect(() => {
    if (detail.length > 0 && detail[0].images.length > 0) {
      setSelectedImage(getImageUrl(detail[0].images[0].image));
      setSelectedColorIndex(0);
    }
  }, [detail]);

  return (
    <div className="col-12 col-sm-6 col-lg-4 col-xl-3 mb-4">
      <Link to={`product/${id}`} className="link-item group">
        <div className="bg-white rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col justify-between">
          {/* Image Section */}
          <div className="relative w-full h-36 aspect-[4/3] bg-black/[0.065] flex justify-center items-center">
            <img
              src={selectedImage}
              alt={name}
              className="w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <TbSquareRoundedPlusFilled className="text-[#A16207] text-2xl" />
            </div>
          </div>

          {/* Info Section */}
          <div className="px-4 py-3 text-center">
            <h3 className="text-[16px] font-semibold text-gray-800 mb-1 truncate">
              {name}
            </h3>
            <div className="flex justify-center items-center gap-1 text-[#333]">
              <span className="text-[16px] text-primary-800 font-semibold ">
                {price} MAD
              </span>
            </div>
            <div className="text-sm text-gray-500 mt-1">{category}</div>

            {/* Color Section */}
            {detail.length > 0 && (
              <div className="flex justify-center items-center gap-2 mt-2">
                {detail.map((item, index) => (
                  <button
                    key={index}
                    className={`w-5 h-5 rounded-full border border-gray-300 hover:scale-110 transition-transform ${
                      selectedColorIndex === index
                        ? "outline-none ring-offset-2  ring-1 ring-primary-500"
                        : ""
                    }`}
                    style={{ backgroundColor: item.color }}
                    onMouseEnter={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (item.images.length > 0) {
                        setSelectedImage(getImageUrl(item.images[0].image));
                      }
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (item.images.length > 0) {
                        setSelectedImage(getImageUrl(item.images[0].image));
                        setSelectedColorIndex(index);
                      }
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default TrendingProductCard;
