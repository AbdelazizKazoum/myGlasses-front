import { AlignRightSimple } from "phosphor-react";
import { AiFillStar } from "react-icons/ai";
import { BiRightArrowCircle, BiRightIndent } from "react-icons/bi";

export const RatingSection = () => {
  const totalReviews = 126;
  const averageRating = 4.8;

  const reviews = [
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

  return (
    <div className="my-4 border-t border-gray-200 pt-4">
      <h2 className="text-3xl font-bold mb-3">Reviews</h2>
      <h2 className="text-xl font-bold mb-3">Rating</h2>

      <div className="flex items-center gap-2 mb-1">
        <span className="text-4xl text-primary-800 m-0 p-0">
          {averageRating}
        </span>
        <div className="flex text-primary-800 text-2xl">
          {Array.from({ length: 5 }).map((_, i) => (
            <AiFillStar
              key={i}
              className={`${
                i < Math.round(averageRating)
                  ? "text-yellow-500"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      <span className="text-sm text-gray-400">({totalReviews} reviews)</span>

      <div className="mt-6 space-y-4">
        <div className="flex justify-between">
          <h2 className="text-xl font-bold mb-3">Reviews</h2>
          <span className=" text-decoration-underline text-lg text-primary-800 cursor-pointer ">
            {" "}
            Read all reviews &gt;
          </span>
        </div>

        {reviews.map((review) => (
          <div
            key={review.id}
            className="border rounded-lg p-4 shadow-sm bg-black/[0.075] "
          >
            <div className="flex items-center justify-between mb-1">
              <div className="flex  gap-3">
                <h3 className="text-lg font-semibold">{review.name}</h3>
                <p className=" m-0 text-gray-600  mb-1">
                  Reviewed on: {new Date(review.date).toLocaleDateString()}
                </p>
              </div>
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <AiFillStar
                    key={i}
                    className={`${
                      i < review.rating ? "text-yellow-500" : "text-gray-300"
                    } text-lg`}
                  />
                ))}
              </div>
            </div>

            <p className="text-base text-gray-800">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
