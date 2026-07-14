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

const OrderSummary = ({ order }) => {
  return (
    <div className="rounded-xl bg-white p-6 shadow">

      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>
          <p className="text-sm text-gray-500">
            Receipt Number
          </p>

          <h2 className="text-2xl font-bold">
            {order.receipt}
          </h2>
        </div>

        <span
          className={`inline-flex w-fit rounded-full px-4 py-2 text-sm font-semibold ${
            STATUS_COLORS[order.status]
          }`}
        >
          {order.statusLabel}
        </span>

      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

        <div>
          <p className="text-sm text-gray-500">
            Customer
          </p>

          <p className="mt-1 font-semibold">
            {order.customer.name}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Order Date
          </p>

          <p className="mt-1 font-semibold">
            {formatDateTime(order.createdAt)}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Total Amount
          </p>

          <p className="mt-1 font-semibold">
            ₹{order.total}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Payment Status
          </p>

          <p className="mt-1 font-semibold">
            {order.payment?.status ?? "-"}
          </p>
        </div>

      </div>

    </div>
  );
};

export default OrderSummary;