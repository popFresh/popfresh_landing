import { useState } from "react";
import {
  Calendar,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

import { formatDateTime } from "../../utils/date";
import OrderTimeline from "./OrderTimeline";

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

const OrderCard = ({ order }) => {
  const [expanded, setExpanded] = useState(false);

  const previewTimeline = order.timeline.slice(-2);

const remainingUpdates =
  order.timeline.length - previewTimeline.length;

  return (
    <div
      className="
        overflow-hidden
        rounded-[32px]
        bg-white
        p-8
        shadow-sm
        transition-all
        duration-300
        hover:shadow-lg
      "
    >
      {/* Header */}

      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        {/* Left */}

        <div>
          <p className="text-sm text-[#667085]">
            Order Number
          </p>

          <h3 className="mt-2 text-2xl font-semibold text-[#184C35] break-all">
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

{/* Timeline Preview */}

<div className="mt-8">

  <p className="text-sm font-medium text-[#667085]">
    Timeline Preview
  </p>

  <div className="mt-4 space-y-3">

    {previewTimeline.map((step, index) => (
      <div
        key={index}
        className="flex items-center gap-3"
      >
        <div className="h-2.5 w-2.5 rounded-full bg-green-600" />

        <span className="text-[#184C35]">
          {step.label}
        </span>
      </div>
    ))}

    {remainingUpdates > 0 && (
      <p className="ml-5 text-sm text-[#667085]">
        +{remainingUpdates} more update
        {remainingUpdates > 1 ? "s" : ""}
      </p>
    )}

  </div>

</div>
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

          <button
            onClick={() =>
              setExpanded((prev) => !prev)
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
            {expanded
              ? "Hide Timeline"
              : "View Full Timeline"}

            {expanded ? (
              <ChevronUp size={18} />
            ) : (
              <ChevronDown size={18} />
            )}
          </button>
        </div>
      </div>

      {/* Timeline */}

      <div
        className={`
          overflow-hidden
          transition-all
          duration-500
          ease-in-out
          ${
            expanded
              ? "mt-10 max-h-[1200px] opacity-100"
              : "max-h-0 opacity-0"
          }
        `}
      >
        <OrderTimeline timeline={order.timeline} />
      </div>
    </div>
  );
};

export default OrderCard;