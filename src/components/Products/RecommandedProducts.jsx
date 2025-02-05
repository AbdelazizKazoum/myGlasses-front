import { useRef, useState } from "react";
import ProductCard from "../ProductCard";

export const RecommandedProducts = ({ products }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
      setScrollPosition(scrollRef.current.scrollLeft);
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
      setScrollPosition(scrollRef.current.scrollLeft);
    }
  };

  return (
    <div className=" mt-4 ">
      {products.length > 0 && (
        <div className="mt-4">
          <h4 className="text-md font-semibold">Vous pourriez aussi aimer :</h4>
          <div className="relative flex items-center">
            <button
              className="absolute left-0 z-10 bg-gray-200 p-2 rounded-full"
              onClick={scrollLeft}
            >
              &#8592;
            </button>
            <div
              className="overflow-hidden w-full flex gap-4 mt-4"
              ref={scrollRef}
              style={{
                scrollBehavior: "smooth",
                overflowX: "auto",
                whiteSpace: "nowrap",
              }}
            >
              {products.map((product) => (
                <div key={product.id} className="inline-block ">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
            <button
              className="absolute right-0 z-10 bg-gray-200 p-2 rounded-full"
              onClick={scrollRight}
            >
              &#8594;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
