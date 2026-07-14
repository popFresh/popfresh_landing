import { useState, useEffect } from "react";
import { Search, AlertCircle } from "lucide-react";
import { trackOrder } from "../../api/orderTracking.api";

const TrackSearch = ({
   initialQuery, 
  setOrders,
  setLoading,
  loading,
  setSearched,
}) => {
  
const [query, setQuery] = useState(initialQuery || "");
  const [error, setError] = useState("");

  const searchOrders = async (value) => {
  setError("");
  setOrders([]);
  setSearched(false);

  if (!value.trim()) {
    return setError(
      "Please enter your phone number, email address or order number."
    );
  }

  try {
    setLoading(true);

    const response = await trackOrder({
      query: value.trim(),
    });

    setOrders(response.data.orders);
    setSearched(true);
  } catch (err) {
    setOrders([]);
    setSearched(true);

    setError(
      err.response?.data?.message ||
        "Something went wrong. Please try again."
    );
  } finally {
    setLoading(false);
  }
};

const handleSubmit = (e) => {
  e.preventDefault();
  searchOrders(query);
};

useEffect(() => {
  if (initialQuery) {
    setQuery(initialQuery);
    searchOrders(initialQuery);
  }
}, [initialQuery]);

  return (
    <div
      className="
        bg-white
        rounded-[32px]
        p-8
        md:p-12
        shadow-sm
      "
    >
      <div className="max-w-3xl mx-auto">

        <div className="text-center">

          <h2
            className="text-3xl text-[#184C35]"
            style={{
              fontFamily: "Fraunces, serif",
            }}
          >
            Find Your Order
          </h2>

          <p className="mt-4 text-[#667085] leading-7">
            Enter the phone number, email address or
            order number used while placing your order.
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-10"
        >

          <div className="relative">

            <Search
              size={20}
              className="
                absolute
                left-5
                top-1/2
                -translate-y-1/2
                text-[#98A2B3]
              "
            />

            <input
              type="text"
              placeholder="Phone Number • Email • Order Number"
              value={query}
              onChange={(e) =>
                setQuery(e.target.value)
              }
              className="
                w-full
                rounded-2xl
                border
                border-[#E4E7EC]
                bg-white
                py-5
                pl-14
                pr-6
                text-lg
                outline-none
                transition-all
                focus:border-[#184C35]
              "
            />

          </div>

          {error && (
            <div
              className="
                mt-5
                rounded-2xl
                border
                border-red-200
                bg-red-50
                p-4
                flex
                gap-3
                items-start
              "
            >
              <AlertCircle
                size={22}
                className="text-red-500 shrink-0"
              />

              <p className="text-red-700">
                {error}
              </p>

            </div>
          )}

          <div className="mt-8 text-center">

            <button
              type="submit"
              disabled={loading}
              className={`
                inline-flex
                items-center
                justify-center
                rounded-full
                px-10
                py-4
                font-medium
                text-white
                transition-all
                duration-300
                ${
                  loading
                    ? "cursor-not-allowed bg-[#7BA08E]"
                    : "bg-[#184C35] hover:bg-[#123A29]"
                }
              `}
            >
              {loading
                ? "Searching..."
                : "Track Order"}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
};

export default TrackSearch;