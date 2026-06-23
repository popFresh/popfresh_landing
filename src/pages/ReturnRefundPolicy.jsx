import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ReturnRefundPolicy() {
return (
<> <Navbar alwaysCapsule />


  <main className="bg-[#F6F3EC] min-h-screen pt-36 pb-24">
    <div className="max-w-4xl mx-auto px-6">
      <div className="bg-white rounded-[32px] shadow-sm p-8 md:p-12">
        <span className="inline-flex px-4 py-2 rounded-full bg-[#E9E3D8] text-[#184C35] text-xs tracking-[0.15em] font-medium">
          LEGAL
        </span>

        <h1
          className="mt-6 text-[#184C35] text-4xl md:text-5xl leading-tight"
          style={{ fontFamily: "serif" }}
        >
          Return & Refund Policy
        </h1>

        <p className="mt-4 text-[#667085]">
          Last updated: June 2026
        </p>

        <div className="mt-10 space-y-10 text-[#475467] leading-8">
          <section>
            <p>
              At POPFRESH, we are committed to delivering fresh,
              high-quality products to our customers. Due to the
              consumable nature of our food products, we maintain a limited
              return and refund policy to ensure food safety and hygiene
              standards.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-[#184C35] mb-4 font-semibold">
              Returns
            </h2>

            <p>
              As our products are food items, we do not accept returns once
              the product has been delivered.
            </p>

            <p className="mt-4">
              However, returns, replacements, or refunds may be considered
              under the following circumstances:
            </p>

            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>The product received is damaged or leaking.</li>
              <li>The product received is expired.</li>
              <li>The product received is incorrect.</li>
              <li>The package appears tampered with upon delivery.</li>
              <li>
                The product is defective or unfit for consumption.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl text-[#184C35] mb-4 font-semibold">
              Reporting an Issue
            </h2>

            <p>
              If you receive a damaged, defective, or incorrect product,
              please contact us within 24 hours of delivery.
            </p>

            <p className="mt-4">
              To process your request, please email us at
              <span className="font-medium"> hello@popfresh.in </span>
              with:
            </p>

            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Order Number</li>
              <li>Contact Details</li>
              <li>Clear photographs of the product</li>
              <li>Photographs of the outer packaging</li>
              <li>A brief description of the issue</li>
            </ul>

            <p className="mt-4">
              Requests received after 24 hours of delivery may not be
              eligible for review.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-[#184C35] mb-4 font-semibold">
              Refunds
            </h2>

            <p>
              Once your claim has been reviewed and approved, we will
              initiate a refund to your original payment method.
            </p>

            <p className="mt-4">
              Refunds are generally processed within 5–7 business days after
              approval. The time taken for the amount to reflect in your
              account may vary depending on your bank or payment provider.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-[#184C35] mb-4 font-semibold">
              Replacements
            </h2>

            <p>
              In certain cases, POPFRESH may offer a replacement instead of
              a refund. The decision to provide a replacement or refund will
              be made after reviewing the claim.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-[#184C35] mb-4 font-semibold">
              Order Cancellation
            </h2>

            <ul className="list-disc pl-6 space-y-2">
              <li>
                Orders can be cancelled only before they are dispatched
                from our warehouse.
              </li>
              <li>
                Once an order has been shipped, it cannot be cancelled.
              </li>
              <li>
                If POPFRESH is unable to fulfill your order for any reason,
                a full refund will be issued.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl text-[#184C35] mb-4 font-semibold">
              Non-Refundable Situations
            </h2>

            <p>
              Refunds or replacements will not be provided for:
            </p>

            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Change of mind after purchase.</li>
              <li>Personal taste preferences.</li>
              <li>
                Products that have been opened or partially consumed.
              </li>
              <li>
                Improper storage of products after delivery.
              </li>
              <li>
                Incorrect shipping details provided by the customer.
              </li>
              <li>
                Delivery delays caused by courier partners or
                circumstances beyond our control.
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
