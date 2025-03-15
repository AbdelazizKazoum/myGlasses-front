import { useState, useEffect } from "react";
import { AiFillStar } from "react-icons/ai";
import api from "../../lib/api";
import { toast } from "react-toastify";

const reviewsTest = [
  {
    id: 1,
    name: "John Doe",
    rating: 5,
    comment: "Absolutely love this product! Highly recommended.",
    date: "2025-03-10",
  },
  {
    id: 2,
    name: "Jane Smith",
    rating: 4,
    comment: "Good quality, but shipping took a bit longer.",
    date: "2025-03-08",
  },
  {
    id: 3,
    name: "Ali Hassan",
    rating: 3,
    comment: "Decent product but could be improved.",
    date: "2025-03-06",
  },
];

export const RatingSection = ({ productId }) => {
  const totalReviews = 126;
  const averageRating = 4.8;
  const [reviews, setReviews] = useState(reviewsTest);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [newReview, setNewReview] = useState({
    rating: 0,
    comment: "",
  });

  const ratingDistribution = {
    5: 80,
    4: 25,
    3: 15,
    2: 4,
    1: 2,
  };

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await api.get(`review/product/${productId}`);
        setReviews(res.data);
      } catch (error) {
        toast.error("Failed to fetch reviews");
      } finally {
        setLoading(false);
      }
    })();
  }, [productId]);

  // Function to handle review writing (This opens the modal)
  const handleWriteReview = () => {
    setIsModalOpen(true); // Open the modal when the button is clicked
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  // Function to handle review submission
  const handleSubmitReview = async () => {
    if (newReview.rating === 0 || !newReview.comment) {
      toast.error("Please provide a rating and comment.");
      return;
    }
    try {
      // Submit the review (this could be an API call)
      await api.post(`review/product/${productId}`, newReview);
      setReviews([
        ...reviews,
        {
          ...newReview,
          id: Date.now(),
          name: "You",
          date: new Date().toISOString(),
        },
      ]);
      toast.success("Review submitted successfully!");
      setIsModalOpen(false); // Close the modal after submitting
      setNewReview({ rating: 0, comment: "" }); // Reset the form
    } catch (error) {
      toast.error("Failed to submit review.");
    }
  };

  return (
    <div className="my-6 border-t border-gray-200 pt-6">
      <h2 className="text-2xl font-bold mb-4">Customer Ratings & Reviews</h2>

      {/* Average Rating */}
      <div className="flex flex-col md:flex-row md:items-center justify-center md:gap-20 mb-6">
        <div className="text-center md:text-left">
          <div className="text-5xl font-bold text-primary-800">
            {averageRating.toFixed(1)}
          </div>
          <div className="flex justify-center md:justify-start my-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <AiFillStar
                key={i}
                className={`text-2xl ${
                  i < Math.round(averageRating)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <div className="text-sm text-gray-600">
            Based on {totalReviews} reviews
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
          {Object.entries(ratingDistribution)
            .sort((a, b) => b[0] - a[0])
            .map(([star, count]) => {
              const percent = Math.round((count / totalReviews) * 100);
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
            })}
        </div>
      </div>

      {/* Review List */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">User Reviews</h3>
        <span className="text-blue-600 hover:underline text-sm cursor-pointer">
          Read all reviews &gt;
        </span>
      </div>

      <div className="space-y-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-white border rounded-lg p-4 shadow-sm"
          >
            <div className="flex justify-between items-center mb-2">
              <div>
                <p className="text-sm font-semibold text-gray-800">
                  {review.name}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(review.date).toLocaleDateString()}
                </p>
              </div>
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <AiFillStar
                    key={i}
                    className={`text-sm ${
                      i < review.rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-gray-700 text-sm">{review.comment}</p>
          </div>
        ))}
      </div>

      {/* Modal for Writing a Review */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Write a Review</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Rating
              </label>
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <AiFillStar
                    key={i}
                    className={`text-2xl ${
                      i < newReview.rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                    onClick={() =>
                      setNewReview({ ...newReview, rating: i + 1 })
                    }
                  />
                ))}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Comment
              </label>
              <textarea
                className="w-full p-2 border border-gray-300 rounded-md"
                value={newReview.comment}
                onChange={(e) =>
                  setNewReview({ ...newReview, comment: e.target.value })
                }
                rows="4"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 bg-gray-300 text-sm rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitReview}
                className="px-4 py-2 bg-primary-800 text-white text-sm rounded-lg hover:bg-primary-500"
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
