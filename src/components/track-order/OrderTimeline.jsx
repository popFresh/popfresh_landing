import {
  CheckCircle2,
  Package,
  Truck,
  Home,
  XCircle,
  RotateCcw,
  Clock3,
} from "lucide-react";

import { formatDateTime } from "../../utils/date";

const STATUS_CONFIG = {
  PENDING: {
    label: "Order Placed",
    icon: Clock3,
    className: "bg-yellow-100 text-yellow-700",
  },

  PROCESSING: {
    label: "Processing",
    icon: Package,
    className: "bg-blue-100 text-blue-700",
  },

  PACKED: {
    label: "Packed",
    icon: Package,
    className: "bg-indigo-100 text-indigo-700",
  },

  SHIPPED: {
    label: "Shipped",
    icon: Truck,
    className: "bg-purple-100 text-purple-700",
  },

  OUT_FOR_DELIVERY: {
    label: "Out For Delivery",
    icon: Truck,
    className: "bg-orange-100 text-orange-700",
  },

  DELIVERED: {
    label: "Delivered",
    icon: Home,
    className: "bg-green-100 text-green-700",
  },

  CANCELLED: {
    label: "Cancelled",
    icon: XCircle,
    className: "bg-red-100 text-red-700",
  },

  RETURNED: {
    label: "Returned",
    icon: RotateCcw,
    className: "bg-gray-200 text-gray-700",
  },
};

const OrderTimeline = ({ timeline }) => {
  return (
    <div className="mt-10 border-t border-[#ECECEC] pt-10">
      <h4
        className="text-2xl text-[#184C35]"
        style={{
          fontFamily: "Fraunces, serif",
        }}
      >
        Order Timeline
      </h4>

      <div className="mt-10 space-y-8">
        {timeline.map((step, index) => {
          const last = index === timeline.length - 1;

          const config =
            STATUS_CONFIG[step.status] || {
              icon: CheckCircle2,
              className:
                "bg-green-100 text-green-700",
            };

          const Icon = config.icon;

          return (
            <div
              key={`${step.status}-${index}`}
              className="flex gap-5"
            >
              {/* Icon */}

              <div className="flex flex-col items-center">
                <div
                  className={`
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-full
                    ${config.className}
                  `}
                >
                  <Icon size={20} />
                </div>

                {!last && (
                  <div
                    className="
                      mt-2
                      w-[2px]
                      flex-1
                      bg-[#E5E7EB]
                    "
                  />
                )}
              </div>

              {/* Content */}

              <div className="pb-8">
                <h5 className="text-lg font-semibold text-[#184C35]">
                  {step.label}
                </h5>

                {step.note && (
                  <p className="mt-2 text-[#667085] leading-7">
                    {step.note}
                  </p>
                )}

                <p className="mt-3 text-sm text-[#98A2B3]">
                  {formatDateTime(step.createdAt)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderTimeline;