import { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { writeReview } from "../../store/productDetailsSlice";

const ratingLabels = ["Terrible", "Poor", "Average", "Good", "Excellent"];

const ReviewModal = ({ productId, onClose, user, refreshReviews }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = async () => {
    if (rating === 0 || !comment || !title) {
      toast.error("Please provide a rating, title, and comment.");
      return;
    }

    setLoading(true);
    const response = await dispatch(
      writeReview({ productId, rating, comment, title })
    );
    console.log("🚀 ~ handleSubmit ~ response:", response);
    if (response.payload?.comment) {
      toast.success("Review submitted successfully!");
      onClose();
      refreshReviews();
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md animate-fadeIn">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">
          Write a Review
        </h3>

        {/* User info preview (optional) */}
        {user && (
          <div className="mb-4 flex items-center gap-3">
            <img
              src={user.avatarUrl}
              alt="avatar"
              className="w-10 h-10 rounded-full"
            />
            <span className="font-medium">{user.name}</span>
          </div>
        )}

        {/* Rating Stars */}
        <div className="flex items-center mb-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <span
              key={index}
              onMouseEnter={() => setHoverRating(index + 1)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => setRating(index + 1)}
              className="cursor-pointer text-3xl transition"
            >
              {index < (hoverRating || rating) ? (
                <AiFillStar className="text-yellow-400" />
              ) : (
                <AiOutlineStar className="text-gray-300" />
              )}
            </span>
          ))}
          {rating > 0 && (
            <span className="ml-3 text-sm text-gray-600">
              {ratingLabels[rating - 1]}
            </span>
          )}
        </div>

        {/* Title Input */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Review Title (e.g. Amazing Product!)"
          className="w-full mb-3 p-2 border border-gray-300 rounded-lg"
        />

        {/* Comment Box */}
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your detailed review..."
          className="w-full h-28 p-2 border border-gray-300 rounded-lg mb-1"
        />
        <div className="text-sm text-gray-500 text-right mb-3">
          {comment.length}/500 characters
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 bg-primary-800 text-white rounded-lg hover:bg-primary-500 disabled:bg-gray-400 transition"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
