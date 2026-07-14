import { useState } from "react";
import { Search, AlertCircle } from "lucide-react";
import { searchFeedbackOrders } from "../../api/feedback.api";

const FeedbackSearch = ({
  setOrders,
  setLoading,
  loading,
  setSearched,
}) => {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setOrders([]);
    setSearched(false);

    if (!query.trim()) {
      return setError(
        "Please enter your phone number, email or order number."
      );
    }

    try {
      setLoading(true);

      const response = await searchFeedbackOrders(
        query.trim()
      );

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

  return (
    <div
      className="
        rounded-[32px]
        bg-white
        p-8
        shadow-sm
        md:p-12
      "
    >
      <div className="mx-auto max-w-3xl">
        {/* Heading */}

        <div className="text-center">
          <h2
            className="text-3xl text-[#184C35]"
            style={{
              fontFamily: "Fraunces, serif",
            }}
          >
            Find Your Order
          </h2>

          <p className="mt-4 leading-7 text-[#667085]">
            Enter your phone number, email address or
            order number to find your delivered
            orders.
          </p>
        </div>

        {/* Search Form */}

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
              value={query}
              onChange={(e) =>
                setQuery(e.target.value)
              }
              placeholder="Phone • Email • Order Number"
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

          {/* Error */}

          {error && (
            <div
              className="
                mt-5
                flex
                items-start
                gap-3
                rounded-2xl
                border
                border-red-200
                bg-red-50
                p-4
              "
            >
              <AlertCircle
                size={22}
                className="shrink-0 text-red-500"
              />

              <p className="text-red-700">
                {error}
              </p>
            </div>
          )}

          {/* Button */}

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
                : "Find Orders"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackSearch;