import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import InstagramCTA from "../components/InstagramCTA";
import OrderCardSkeleton from "../components/track-order/OrderCardSkeleton";
import TrackSearch from "../components/track-order/TrackSearch";
import OrderCard from "../components/track-order/OrderCard";

const TrackOrder = () => {
  const [orders, setOrders] = useState([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const [searchParams] = useSearchParams();

const initialQuery = searchParams.get("query");

  return (
    <>
      <Navbar alwaysCapsule />

      <main className="bg-[#F6F3EC] pt-40 pb-24 min-h-screen">
        <div className="max-w-7xl mx-auto px-6">

          {/* Hero */}

          <section className="text-center">

            <span
              className="
                inline-flex
                px-5
                py-2
                rounded-full
                bg-[#E9E3D8]
                text-[#184C35]
                text-xs
                tracking-[0.18em]
              "
            >
              TRACK YOUR ORDER
            </span>

            <h1
              className="
                mt-6
                text-[#184C35]
                text-4xl
                sm:text-5xl
                md:text-7xl
                leading-tight
              "
              style={{
                fontFamily: "Fraunces, serif",
              }}
            >
              Track Your Snack Journey
            </h1>

            <p
              className="
                mt-6
                max-w-2xl
                mx-auto
                text-[#667085]
                text-lg
                leading-8
              "
            >
              Stay updated with every step of your PopFresh order —
              from confirmation to delivery, all in one place.
            </p>

          </section>

          {/* Search */}

          <section className="mt-20">

            <TrackSearch
              initialQuery={initialQuery}
              setOrders={setOrders}
              setLoading={setLoading}
              loading={loading}
              setSearched={setSearched}
            />

          </section>

          {/* Loading */}

          {loading && (
  <div className="mt-16">
    <OrderCardSkeleton />
  </div>
)}
          {/* Empty State */}

          {!loading &&
            searched &&
            orders.length === 0 && (
              <div
                className="
                  mt-16
                  bg-white
                  rounded-[32px]
                  p-12
                  text-center
                "
              >
                <h3 className="text-2xl font-semibold text-[#184C35]">
                  No Orders Found
                </h3>

                <p className="mt-4 text-[#667085] max-w-lg mx-auto">
                  We couldn't find any orders matching the
                  information you entered. Please double-check
                  your phone number, email address or order
                  number and try again.
                </p>
              </div>
            )}

          {/* Orders */}

          {!loading &&
            orders.length > 0 && (
              <section className="mt-20">

                <div className="mb-10">

                  <h2
                    className="text-4xl text-[#184C35]"
                    style={{
                      fontFamily: "Fraunces, serif",
                    }}
                  >
                    Your Orders
                  </h2>

                  <p className="mt-3 text-[#667085]">
                    We found{" "}
                    <span className="font-semibold text-[#184C35]">
                      {orders.length}
                    </span>{" "}
                    order{orders.length > 1 ? "s" : ""}.
                  </p>

                </div>

                <div className="space-y-8">

                  {orders.map((order) => (
                    <OrderCard
                      key={order.receipt}
                      order={order}
                    />
                  ))}

                </div>

              </section>
            )}

        </div>
      </main>

      <InstagramCTA />

      <Footer />
    </>
  );
};

export default TrackOrder;