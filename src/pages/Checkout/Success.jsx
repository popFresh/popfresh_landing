import { Link, useLocation } from "react-router-dom";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function OrderSuccess() {

  const { state } = useLocation();

  const order = state;

  return (

    <>

      <Navbar alwaysCapsule />

      <main className="min-h-screen bg-[#F6F3EC] flex items-center justify-center px-6">

        <div className="max-w-xl w-full rounded-[36px] bg-white p-12 text-center shadow-lg">

          <div className="text-6xl">

            🎉

          </div>

          <h1
            className="mt-6 text-5xl text-[#184C35]"
            style={{
              fontFamily:"Fraunces, serif"
            }}
          >

            Order Confirmed

          </h1>

          <p className="mt-6 text-[#667085] leading-8">

            Thank you for shopping with POPFRESH.

            Your order has been placed successfully.

          </p>

          <div className="mt-8 rounded-2xl bg-[#F8F6F1] p-6">

            <p className="text-sm text-gray-500">

              Receipt

            </p>

            <h2 className="mt-2 text-xl font-semibold text-[#184C35]">

              {order.receipt}

            </h2>

          </div>

          <Link

            to="/products"

            className="mt-10 inline-flex rounded-full bg-[#184C35] px-8 py-4 text-white font-semibold"

          >

            Continue Shopping

          </Link>

        </div>

      </main>

      <Footer />

    </>

  );

}