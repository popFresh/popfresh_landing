import { useState } from "react";
import { X, Star } from "lucide-react";
import { submitFeedback } from "../../api/feedback.api";

const FeedbackModal = ({
  order,
  open,
  onClose,
  onSubmitted,
}) => {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!open || !order) return null;

  const handleSubmit = async () => {
    setError("");

    if (rating === 0) {
      return setError("Please select a rating.");
    }

    try {
      setLoading(true);

      await submitFeedback({
        orderId: order.id,
        rating,
        message: message.trim(),
      });

      onSubmitted();

      setRating(0);
      setMessage("");
      setHovered(0);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to submit feedback."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/50
        p-6
      "
    >
      <div
        className="
          w-full
          max-w-2xl
          rounded-[32px]
          bg-white
          p-8
          shadow-2xl
        "
      >
        {/* Header */}

        <div className="flex items-start justify-between">
          <div>
            <h2
              className="text-3xl text-[#184C35]"
              style={{
                fontFamily: "Fraunces, serif",
              }}
            >
              Share Your Feedback
            </h2>

            <p className="mt-3 text-[#667085]">
              Order #{order.receipt}
            </p>
          </div>

          <button
            onClick={onClose}
            className="
              rounded-full
              p-2
              transition
              hover:bg-gray-100
            "
          >
            <X size={22} />
          </button>
        </div>

        {/* Rating */}

        <div className="mt-10">
          <p className="font-medium text-[#184C35]">
            How would you rate your experience?
          </p>

          <div className="mt-5 flex gap-3">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setRating(value)}
                onMouseEnter={() =>
                  setHovered(value)
                }
                onMouseLeave={() =>
                  setHovered(0)
                }
              >
                <Star
                  size={34}
                  fill={
                    value <=
                    (hovered || rating)
                      ? "#FBBF24"
                      : "transparent"
                  }
                  className="text-yellow-400 transition"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Feedback */}

        <div className="mt-10">
          <label className="font-medium text-[#184C35]">
            Tell us more (optional)
          </label>

          <textarea
            rows={6}
            maxLength={1000}
            value={message}
            onChange={(e) =>
              setMessage(e.target.value)
            }
            placeholder="We'd love to hear about your experience..."
            className="
              mt-4
              w-full
              resize-none
              rounded-2xl
              border
              border-[#E4E7EC]
              p-5
              outline-none
              transition
              focus:border-[#184C35]
            "
          />

          <div className="mt-2 text-right text-sm text-[#98A2B3]">
            {message.length}/1000
          </div>
        </div>

        {/* Error */}

        {error && (
          <div
            className="
              mt-6
              rounded-xl
              border
              border-red-200
              bg-red-50
              p-4
              text-red-700
            "
          >
            {error}
          </div>
        )}

        {/* Actions */}

        <div className="mt-10 flex justify-end gap-4">
          <button
            onClick={onClose}
            disabled={loading}
            className="
              rounded-full
              border
              px-7
              py-3
              font-medium
              transition
              hover:bg-gray-100
            "
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="
              rounded-full
              bg-[#184C35]
              px-8
              py-3
              font-medium
              text-white
              transition
              hover:bg-[#123A29]
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            {loading
              ? "Submitting..."
              : "Submit Feedback"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;