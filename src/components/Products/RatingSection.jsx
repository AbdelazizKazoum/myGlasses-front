import { useState, useEffect } from "react";
import { AiFillStar } from "react-icons/ai";
import api from "../../lib/api";
import { toast } from "react-toastify";
import ReviewModal from "../modals/ReviewModal";

// You can use Tailwind classes or a separate Skeleton component library if needed.
const SkeletonBar = () => (
  <div className="flex items-center mb-2 text-sm text-gray-700 animate-pulse">
    <span className="w-12 h-4 bg-gray-200 rounded"></span>
    <div className="flex-1 h-3 mx-2 bg-gray-200 rounded-full overflow-hidden">
      <div className="h-full bg-gray-300 w-[60%]" />
    </div>
    <span className="w-10 h-4 bg-gray-200 rounded"></span>
  </div>
);

const SkeletonReviewCard = () => (
  <div className="bg-white border rounded-lg p-4 shadow-sm animate-pulse space-y-2">
    <div className="flex justify-between items-center">
      <div className="space-y-1">
        <div className="w-24 h-4 bg-gray-200 rounded"></div>
        <div className="w-16 h-3 bg-gray-200 rounded"></div>
      </div>
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="w-4 h-4 bg-gray-200 rounded"></div>
        ))}
      </div>
    </div>
    <div className="w-full h-4 bg-gray-200 rounded"></div>
    <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
  </div>
);

export const RatingSection = ({ productId, rating, reviewCount }) => {
  //   const reviewCount = 126;
  //   const rating = 4.8;
  const [reviews, setReviews] = useState([]);
  console.log("🚀 ~ RatingSection ~ reviews:", reviews);
  const [ratingDistribution, setRatingDistribution] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const res = await api.get(`review/product/${productId}`);
      setReviews(res.data.reviews || []);
      setRatingDistribution(res.data.ratingDistribution || {});
    } catch (error) {
      toast.error("Failed to fetch reviews");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const handleWriteReview = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="my-6 border-t border-gray-200 pt-6">
      <h2 className="text-2xl font-bold mb-4">Customer Ratings & Reviews</h2>

      {/* Average Rating */}
      <div className="flex flex-col md:flex-row md:items-center justify-center md:gap-20 mb-6">
        <div className="text-center md:text-left">
          <div className="text-5xl font-bold text-primary-800">
            {rating.toFixed(1)}
          </div>
          <div className="flex justify-center md:justify-start my-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <AiFillStar
                key={i}
                className={`text-2xl ${
                  i < Math.round(rating) ? "text-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <div className="text-sm text-gray-600">
            Based on {reviewCount} reviews
          </div>
          <button
            onClick={handleWriteReview}
            className="mt-4 px-6 py-2 bg-primary-800 text-white text-sm rounded-lg hover:bg-primary-500 transition-colors"
          >
            Write a Review
          </button>
        </div>

        {/* Rating Distribution Bars */}
        <div className="flex-1 w-full max-w-md mt-4 md:mt-0">
          {loading || !ratingDistribution ? (
            <>
              {Array.from({ length: 5 }).map((_, i) => (
                <SkeletonBar key={i} />
              ))}
            </>
          ) : (
            Object.entries(ratingDistribution)
              .sort((a, b) => b[0] - a[0])
              .map(([star, count]) => {
                const percent = Math.round((count / reviewCount) * 100);
                return (
                  <div
                    key={star}
                    className="flex items-center mb-2 text-sm text-gray-700"
                  >
                    <span className="w-12">{star} star</span>
                    <div className="flex-1 h-3 mx-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-400"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <span className="w-10 text-right">{count}</span>
                  </div>
                );
              })
          )}
        </div>
      </div>

      {/* Review List */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">User Reviews</h3>
        <span className="text-primary-500 hover:text-primary-800 underline text-base cursor-pointer">
          Read all reviews &gt;
        </span>
      </div>

      <div className="space-y-4">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => (
              <SkeletonReviewCard key={i} />
            ))
          : reviews.map((review) => (
              <div
                key={review.id}
                className="rounded-lg p-4 shadow-sm border-gray-300 bg-black/[0.065] "
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex  gap-3">
                    <h3 className="text-lg font-semibold">
                      {review?.user?.prenom} {review?.user?.nom}
                    </h3>
                    <p className=" m-0 text-gray-600  mb-1">
                      Reviewed on:{" "}
                      {new Date(review?.reviewDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <AiFillStar
                        key={i}
                        className={`${
                          i < review.rating
                            ? "text-yellow-500"
                            : "text-gray-300"
                        } text-lg`}
                      />
                    ))}
                  </div>
                </div>
                <span className=" font-bold text-lg text-primary-800 ">
                  {review?.title}
                </span>
                <p className="text-base text-gray-800">{review?.comment}</p>
              </div>
            ))}
      </div>

      {isModalOpen && (
        <ReviewModal
          productId={productId}
          onClose={handleCloseModal}
          refreshReviews={fetchReviews}
        />
      )}
    </div>
  );
};
