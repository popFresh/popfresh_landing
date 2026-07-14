import { Truck, ExternalLink } from "lucide-react";
import { formatDate } from "../../utils/date";

const ShipmentCard = ({ shipment }) => {
  if (!shipment) return null;

  return (
    <div className="mt-8 rounded-xl bg-white p-6 shadow">
      <div className="mb-6 flex items-center gap-2">
        <Truck className="text-green-600" size={22} />

        <h2 className="text-xl font-semibold">
          Shipment Details
        </h2>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

        <div>
          <p className="text-sm text-gray-500">
            Shipping Provider
          </p>

          <p className="mt-1 font-semibold">
            {shipment.provider}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Shipment Status
          </p>

          <p className="mt-1 font-semibold">
            {shipment.status}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Courier Partner
          </p>

          <p className="mt-1 font-semibold">
            {shipment.courierName || "-"}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Tracking Number
          </p>

          <p className="mt-1 font-semibold break-all">
            {shipment.trackingNumber || "-"}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            AWB Number
          </p>

          <p className="mt-1 font-semibold break-all">
            {shipment.awbCode || "-"}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Estimated Delivery
          </p>

          <p className="mt-1 font-semibold">
            {shipment.estimatedDeliveryDate
              ? formatDate(shipment.estimatedDeliveryDate)
              : "-"}
          </p>
        </div>

      </div>

      {shipment.trackingUrl && (
        <div className="mt-6">

          <a
            href={shipment.trackingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-5 py-3 font-medium text-white transition hover:bg-green-700"
          >
            Track Shipment

            <ExternalLink size={18} />
          </a>

        </div>
      )}
    </div>
  );
};

export default ShipmentCard;