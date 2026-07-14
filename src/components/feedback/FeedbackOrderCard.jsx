import { Calendar, MessageSquare, CheckCircle } from "lucide-react";
import { formatDateTime } from "../../utils/date";

const STATUS_COLORS = {
  PENDING: "bg-yellow-100 text-yellow-800",
  PROCESSING: "bg-blue-100 text-blue-800",
  PACKED: "bg-indigo-100 text-indigo-800",
  SHIPPED: "bg-purple-100 text-purple-800",
  OUT_FOR_DELIVERY: "bg-orange-100 text-orange-800",
  DELIVERED: "bg-green-100 text-green-800",
  CANCELLED: "bg-red-100 text-red-800",
  RETURNED: "bg-gray-100 text-gray-800",
};

const FeedbackOrderCard = ({
  order,
  onOpenFeedback,
}) => {
  return (
    <div
      className="
        rounded-[32px]
        bg-white
        p-8
        shadow-sm
        transition-all
        duration-300
        hover:shadow-lg
      "
    >
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        {/* Left */}

        <div>
          <p className="text-sm text-[#667085]">
            Order Number
          </p>

          <h3 className="mt-2 break-all text-2xl font-semibold text-[#184C35]">
            {order.receipt}
          </h3>

          <div className="mt-5 flex items-center gap-2 text-[#667085]">
            <Calendar size={18} />

            <span className="text-sm">
              {formatDateTime(order.createdAt)}
            </span>
          </div>
        </div>

        {/* Right */}

        <div className="flex flex-col items-start gap-5 lg:items-end">
          <span
            className={`
              inline-flex
              rounded-full
              px-5
              py-2
              text-sm
              font-medium
              ${
                STATUS_COLORS[order.status] ??
                "bg-gray-100 text-gray-700"
              }
            `}
          >
            {order.statusLabel}
          </span>

          {/* Feedback Status */}

          {order.feedbackSubmitted ? (
            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-green-50
                px-5
                py-3
                text-green-700
                font-medium
              "
            >
              <CheckCircle size={18} />
              Feedback Submitted
            </div>
          ) : order.canGiveFeedback ? (
            <button
              onClick={() =>
                onOpenFeedback(order)
              }
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-[#184C35]
                px-6
                py-3
                font-medium
                text-white
                transition-all
                duration-300
                hover:bg-[#123A29]
              "
            >
              <MessageSquare size={18} />
              Share Feedback
            </button>
          ) : (
            <div
              className="
                rounded-full
                bg-gray-100
                px-5
                py-3
                text-sm
                text-gray-600
              "
            >
              Feedback available after delivery
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeedbackOrderCard;