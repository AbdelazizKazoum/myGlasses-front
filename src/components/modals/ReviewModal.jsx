import { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { toast } from "react-toastify";
import api from "../../lib/api";

const ReviewModal = ({ productId, userId, onClose }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleSubmit = async () => {
    if (rating === 0 || !comment) {
      toast.error("Please provide a rating and comment.");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("/review", {
        productId,
        userId,
        rating,
        comment,
      });

      if (response.status === 201) {
        toast.success("Review submitted successfully!");
        onClose(); // Close the modal after successful submission
      }
    } catch (error) {
      toast.error("Failed to submit review.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h3 className="text-xl font-semibold mb-4">Write a Review</h3>

        {/* Rating stars */}
        <div className="flex mb-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <AiFillStar
              key={index}
              className={`text-3xl cursor-pointer ${
                index < rating ? "text-yellow-400" : "text-gray-300"
              }`}
              onClick={() => handleRatingChange(index + 1)}
            />
          ))}
        </div>

        {/* Review comment */}
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your review here..."
          className="w-full h-32 p-2 border border-gray-300 rounded-lg mb-4"
        />

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-6 py-2 text-gray-600 border rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-6 py-2 bg-primary-800 text-white rounded-lg disabled:bg-gray-400"
          >
            {loading ? "Submitting..." : "Submit Review"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
