import { useState } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import InstagramCTA from "../components/InstagramCTA";

import FeedbackSearch from "../components/feedback/FeedbackSearch";
import FeedbackOrderCard from "../components/feedback/FeedbackOrderCard";
import FeedbackSkeleton from "../components/feedback/FeedbackSkeleton";
import FeedbackModal from "../components/feedback/FeedbackModal";

const ShareFeedback = () => {
  const [orders, setOrders] = useState([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const [selectedOrder, setSelectedOrder] =
    useState(null);

  const [showModal, setShowModal] =
    useState(false);

  // =====================================
  // Open Feedback Modal
  // =====================================

  const handleOpenFeedback = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  // =====================================
  // Close Feedback Modal
  // =====================================

  const handleCloseFeedback = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };

  // =====================================
  // Feedback Submitted
  // =====================================

  const handleFeedbackSubmitted = () => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === selectedOrder.id
          ? {
              ...order,
              feedbackSubmitted: true,
            }
          : order
      )
    );

    handleCloseFeedback();
  };

  return (
    <>
      <Navbar alwaysCapsule />

      <main className="min-h-screen bg-[#F6F3EC] pt-40 pb-24">
        <div className="mx-auto max-w-7xl px-6">
          {/* Hero */}

          <section className="text-center">
            <span
              className="
                inline-flex
                rounded-full
                bg-[#E9E3D8]
                px-5
                py-2
                text-xs
                tracking-[0.18em]
                text-[#184C35]
              "
            >
              SHARE FEEDBACK
            </span>

            <h1
              className="
                mt-6
                text-4xl
                leading-tight
                text-[#184C35]
                sm:text-5xl
                md:text-7xl
              "
              style={{
                fontFamily: "Fraunces, serif",
              }}
            >
              We'd Love Your Feedback
            </h1>

            <p
              className="
                mx-auto
                mt-6
                max-w-2xl
                text-lg
                leading-8
                text-[#667085]
              "
            >
              Tell us how your PopFresh experience
              was. Your feedback helps us improve
              every bite.
            </p>
          </section>

          {/* Search */}

          <section className="mt-20">
            <FeedbackSearch
              setOrders={setOrders}
              setLoading={setLoading}
              loading={loading}
              setSearched={setSearched}
            />
          </section>

          {/* Skeleton */}

          {loading && (
  <div className="mt-16 space-y-8">
    {[1, 2, 3].map((item) => (
      <FeedbackSkeleton key={item} />
    ))}
  </div>
)}

          {/* Empty State */}

          {!loading &&
            searched &&
            orders.length === 0 && (
              <div
                className="
                  mt-16
                  rounded-[32px]
                  bg-white
                  p-12
                  text-center
                "
              >
                <h3 className="text-2xl font-semibold text-[#184C35]">
                  No Orders Found
                </h3>

                <p className="mx-auto mt-4 max-w-lg text-[#667085]">
                  We couldn't find any matching
                  orders. Please verify your phone
                  number, email address or order
                  number.
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
                      fontFamily:
                        "Fraunces, serif",
                    }}
                  >
                    Your Orders
                  </h2>

                  <p className="mt-3 text-[#667085]">
                    We found{" "}
                    <span className="font-semibold text-[#184C35]">
                      {orders.length}
                    </span>{" "}
                    order
                    {orders.length > 1
                      ? "s"
                      : ""}
                    .
                  </p>
                </div>

                <div className="space-y-8">
                  {orders.map((order) => (
                    <FeedbackOrderCard
                      key={order.id}
                      order={order}
                      onOpenFeedback={
                        handleOpenFeedback
                      }
                    />
                  ))}
                </div>
              </section>
            )}
        </div>
      </main>

      {/* Feedback Modal */}

      <FeedbackModal
        open={showModal}
        order={selectedOrder}
        onClose={handleCloseFeedback}
        onSubmitted={
          handleFeedbackSubmitted
        }
      />

      <InstagramCTA />

      <Footer />
    </>
  );
};

export default ShareFeedback;