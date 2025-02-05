import { useRef, useState } from "react";
import SuggestedProductCard from "../ProductCard/SuggestedProductCard";

export const RecommandedProducts = ({ products, allowDetails }) => {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Button Scroll
  const scrollLeftHandler = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRightHandler = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  // Mouse Drag Scroll
  const handleMouseDown = (e) => {
    if (scrollRef.current) {
      setIsDragging(false);
      setStartX(e.pageX - scrollRef.current.offsetLeft);
      setScrollLeft(scrollRef.current.scrollLeft);
      document.body.style.userSelect = "none"; // Prevents text selection
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Adjust speed
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    document.body.style.userSelect = "auto"; // Restore text selection
  };

  return (
    <>
      {products.length > 0 && (
        <div className="relative flex items-center">
          {/* Left Scroll Button */}
          <button
            className="absolute left-0 z-10 bg-gray-200 p-2 rounded-full"
            onClick={scrollLeftHandler}
          >
            &#8592;
          </button>

          {/* Scrollable Container */}
          <div
            className="overflow-hidden w-full flex gap-4 mt-4 cursor-grab active:cursor-grabbing select-none"
            ref={scrollRef}
            style={{
              scrollBehavior: "smooth",
              overflowX: "auto",
              whiteSpace: "nowrap",
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseUp}
            onMouseUp={handleMouseUp}
          >
            {products.map((product) => (
              <div key={product.id} className="inline-block">
                <SuggestedProductCard
                  product={product}
                  allowDetails={allowDetails}
                  onDragStart={(e) => e.preventDefault()} // Prevents dragging images
                />
              </div>
            ))}
          </div>

          {/* Right Scroll Button */}
          <button
            className="absolute right-0 z-10 bg-gray-200 p-2 rounded-full"
            onClick={scrollRightHandler}
          >
            &#8594;
          </button>
        </div>
      )}
    </>
  );
};
