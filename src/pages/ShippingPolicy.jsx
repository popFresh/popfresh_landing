import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ShippingPolicy() {
return (
<> <Navbar alwaysCapsule />


  <main className="bg-[#F6F3EC] min-h-screen pt-36 pb-24">
    <div className="max-w-4xl mx-auto px-6">
      <div className="bg-white rounded-[32px] shadow-sm p-8 md:p-12">
        <span className="inline-flex px-4 py-2 rounded-full bg-[#E9E3D8] text-[#184C35] text-xs tracking-[0.15em] font-medium">
          SHIPPING
        </span>

        <h1
          className="mt-6 text-[#184C35] text-4xl md:text-5xl leading-tight"
          style={{ fontFamily: "serif" }}
        >
          Shipping Policy
        </h1>

        <p className="mt-4 text-[#667085]">
          Last updated: June 2026
        </p>

        <div className="mt-10 space-y-10 text-[#475467] leading-8">
          <section>
            <p>
              At POPFRESH, we strive to deliver your favorite snacks
              quickly, safely, and efficiently. This Shipping Policy
              outlines our shipping process, delivery timelines, and
              related information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-[#184C35] mb-4 font-semibold">
              Order Processing
            </h2>

            <ul className="list-disc pl-6 space-y-2">
              <li>
                All orders are processed within 1–2 business days after
                payment confirmation.
              </li>

              <li>
                Orders placed on weekends or public holidays will be
                processed on the next business day.
              </li>

              <li>
                Once your order has been dispatched, you will receive a
                shipping confirmation along with tracking details.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl text-[#184C35] mb-4 font-semibold">
              Shipping Coverage
            </h2>

            <p>
              We currently ship across most locations in India.
            </p>

            <p className="mt-4">
              If your location is not serviceable by our courier partners,
              we will notify you and issue a full refund for your order.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-[#184C35] mb-4 font-semibold">
              Delivery Timelines
            </h2>

            <p className="mb-4">
              Estimated delivery timelines are as follows:
            </p>

            <div className="bg-[#F6F3EC] rounded-2xl p-6">
              <ul className="space-y-3">
                <li>
                  <span className="font-semibold text-[#184C35]">
                    Metro Cities:
                  </span>{" "}
                  2–5 business days
                </li>

                <li>
                  <span className="font-semibold text-[#184C35]">
                    Tier 2 & Tier 3 Cities:
                  </span>{" "}
                  3–7 business days
                </li>

                <li>
                  <span className="font-semibold text-[#184C35]">
                    Remote Locations:
                  </span>{" "}
                  5–10 business days
                </li>
              </ul>
            </div>

            <p className="mt-6">
              Please note that delivery timelines are estimates and may
              vary due to factors beyond our control, including weather
              conditions, public holidays, courier delays, or unforeseen
              logistical issues.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-[#184C35] mb-4 font-semibold">
              Shipping Charges
            </h2>

            <p>
              Shipping charges, if applicable, will be displayed at
              checkout before payment.
            </p>

            <p className="mt-4">
              We may offer free shipping on select orders, promotions, or
              minimum order values as announced on our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-[#184C35] mb-4 font-semibold">
              Delays Beyond Our Control
            </h2>

            <p className="mb-4">
              While we make every effort to ensure timely delivery,
              POPFRESH shall not be held liable for delays caused by:
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li>Natural disasters</li>
              <li>Extreme weather conditions</li>
              <li>Government restrictions</li>
              <li>Strikes or transportation disruptions</li>
              <li>Courier partner delays</li>
              <li>
                Other unforeseen circumstances beyond our reasonable
                control
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl text-[#184C35] mb-4 font-semibold">
              Contact Us
            </h2>

            <div className="bg-[#F6F3EC] rounded-2xl p-6">
              <p className="font-semibold text-[#184C35]">
                POPFRESH Customer Support
              </p>

              <p className="mt-2">
                Email: hello@popfresh.in
              </p>

              <p>
                Phone: +91 7353129759
              </p>
            </div>
          </section>

          <section>
            <p className="text-sm text-[#667085]">
              POPFRESH reserves the right to review and update this policy
              at any time without prior notice.
            </p>
          </section>
        </div>
      </div>
    </div>
  </main>

  <Footer />
</>


);
}
