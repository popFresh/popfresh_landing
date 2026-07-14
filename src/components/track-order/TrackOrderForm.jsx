import { useState } from "react";
import { trackOrder } from "../../api/orderTracking.api";


const TrackOrderForm = ({ setOrder, setLoading }) => {
  const [receipt, setReceipt] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [type, setType] = useState("phone");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setOrder(null);

    if (!receipt.trim()) {
      return setError("Receipt number is required.");
    }

    if (!identifier.trim()) {
      return setError(
        `Please enter your ${type === "phone" ? "phone number" : "email"}.`
      );
    }

    try {
      setLoading(true);

      const params = {
        receipt: receipt.trim(),
      };

      if (type === "phone") {
        params.phone = identifier.trim();
      } else {
        params.email = identifier.trim();
      }

      const response = await trackOrder(params);

setOrder(response.data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to fetch order."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl bg-white p-8 shadow">

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        {/* Receipt */}

        <div>
          <label className="mb-2 block text-sm font-medium">
            Receipt Number
          </label>

          <input
            type="text"
            value={receipt}
            onChange={(e) => setReceipt(e.target.value)}
            placeholder="PF-123456789"
            className="w-full rounded-lg border p-3 outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Phone / Email */}

        <div>

          <label className="mb-2 block text-sm font-medium">
            Verify Using
          </label>

          <select
            value={type}
            onChange={(e) => {
              setType(e.target.value);
              setIdentifier("");
            }}
            className="mb-4 w-full rounded-lg border p-3"
          >
            <option value="phone">
              Phone Number
            </option>

            <option value="email">
              Email Address
            </option>
          </select>

          <input
            type={type === "phone" ? "tel" : "email"}
            value={identifier}
            onChange={(e) =>
              setIdentifier(e.target.value)
            }
            placeholder={
              type === "phone"
                ? "Enter phone number"
                : "Enter email address"
            }
            className="w-full rounded-lg border p-3 outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Error */}

        {error && (
          <p className="text-sm text-red-600">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full rounded-lg bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700"
        >
          Track Order
        </button>

      </form>

    </div>
  );
};

export default TrackOrderForm;