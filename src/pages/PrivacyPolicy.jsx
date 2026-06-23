import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function PrivacyPolicy() {
return (
<> <Navbar alwaysCapsule />


  <main className="bg-[#F6F3EC] min-h-screen pt-36 pb-24">
    <div className="max-w-4xl mx-auto px-6">
      <div className="bg-white rounded-[32px] shadow-sm p-8 md:p-12">
        <span className="inline-flex px-4 py-2 rounded-full bg-[#E9E3D8] text-[#184C35] text-xs tracking-[0.15em] font-medium">
          PRIVACY
        </span>

        <h1
          className="mt-6 text-[#184C35] text-4xl md:text-5xl leading-tight"
          style={{ fontFamily: "serif" }}
        >
          Privacy Policy
        </h1>

        <p className="mt-4 text-[#667085]">
          Last updated: June 2026
        </p>

        <div className="mt-10 space-y-10 text-[#475467] leading-8">
          <section>
            <p>
              At POPFRESH, we value your privacy and are committed to
              protecting your personal information. This Privacy Policy
              explains what information we collect, why we collect it,
              how we use it, and the measures we take to keep it secure.
            </p>

            <p className="mt-4">
              By using our website and placing an order, you agree to the
              terms outlined in this Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-[#184C35] mb-4 font-semibold">
              Information We Collect
            </h2>

            <p>
              To process and deliver your orders, we collect only the
              information necessary to fulfill your purchase, including:
            </p>

            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Full Name</li>
              <li>Mobile Phone Number</li>
              <li>Shipping Address</li>
              <li>City, State, and PIN Code</li>
              <li>Email Address (if provided)</li>
              <li>Order Information</li>
            </ul>

            <p className="mt-4">
              We do not require users to create an account, sign up, or
              log in to place an order on our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-[#184C35] mb-4 font-semibold">
              Why We Collect This Information
            </h2>

            <p>
              The information collected is used solely for:
            </p>

            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Processing and confirming your order</li>
              <li>Shipping products to your specified address</li>
              <li>Providing order updates and delivery notifications</li>
              <li>Customer support and issue resolution</li>
              <li>Order tracking through Order ID or Phone Number</li>
              <li>
                Compliance with applicable legal and regulatory
                requirements
              </li>
            </ul>

            <p className="mt-4">
              We only collect information that is necessary for these
              purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-[#184C35] mb-4 font-semibold">
              Order Tracking
            </h2>

            <p>
              To make the shopping experience simple and convenient,
              customers may track their orders using either:
            </p>

            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Their Order ID</li>
              <li>
                The Mobile Number used while placing the order
              </li>
            </ul>

            <p className="mt-4">
              This information is used only for retrieving order status
              and related delivery details.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-[#184C35] mb-4 font-semibold">
              Data Security
            </h2>

            <p>
              We take the security of your information seriously.
            </p>

            <p className="mt-4">
              All customer information is stored and processed using
              industry-standard security measures and appropriate
              technical safeguards designed to protect against
              unauthorized access, misuse, alteration, or disclosure.
            </p>

            <p className="mt-4">
              We work with trusted service providers and follow
              reasonable security practices to ensure your personal
              information remains protected.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-[#184C35] mb-4 font-semibold">
              Information Sharing
            </h2>

            <p>
              POPFRESH does not sell, rent, or trade your personal
              information to third parties.
            </p>

            <p className="mt-4">
              Your information may only be shared with:
            </p>

            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>
                Delivery and logistics partners for order fulfillment
              </li>
              <li>
                Payment processing partners for secure transaction
                handling
              </li>
              <li>
                Service providers who assist in operating our website
                and business operations
              </li>
            </ul>

            <p className="mt-4">
              These parties are permitted to use your information only
              to perform the services required to fulfill your order.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-[#184C35] mb-4 font-semibold">
              Payment Information
            </h2>

            <p>
              Payments made through our website are processed by secure
              third-party payment providers.
            </p>

            <p className="mt-4">
              POPFRESH does not store your complete credit card, debit
              card, UPI, net banking, or other sensitive payment
              credentials on its servers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-[#184C35] mb-4 font-semibold">
              Cookies and Website Analytics
            </h2>

            <p>
              Our website may use cookies and basic analytics tools to
              improve website functionality, understand user behavior,
              and enhance the overall shopping experience.
            </p>

            <p className="mt-4">
              These technologies do not collect sensitive personal
              information and are used solely to improve our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-[#184C35] mb-4 font-semibold">
              Data Retention
            </h2>

            <p>
              We retain customer information only for as long as
              necessary to:
            </p>

            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Fulfill orders</li>
              <li>Provide customer support</li>
              <li>Maintain business records</li>
              <li>
                Comply with legal, tax, and regulatory obligations
              </li>
            </ul>

            <p className="mt-4">
              Once the information is no longer required, it is
              securely deleted or anonymized where applicable.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-[#184C35] mb-4 font-semibold">
              Your Rights
            </h2>

            <p>
              You may contact us at any time to:
            </p>

            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>
                Request access to your personal information
              </li>
              <li>Correct inaccurate information</li>
              <li>
                Request deletion of information where legally
                permissible
              </li>
              <li>
                Ask questions regarding how your data is handled
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl text-[#184C35] mb-4 font-semibold">
              Changes to This Policy
            </h2>

            <p>
              POPFRESH reserves the right to update or modify this
              Privacy Policy from time to time. Any changes will be
              posted on this page along with the revised effective
              date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-[#184C35] mb-4 font-semibold">
              Contact Us
            </h2>

            <div className="bg-[#F6F3EC] rounded-2xl p-6">
              <p className="font-semibold text-[#184C35]">
                POPFRESH
              </p>

              <p className="mt-3">
                Email: hello@popfresh.in
              </p>

              <p>
                Phone: +91 7353129759
              </p>

              <p className="mt-2">
                Address: SNS Glorinaa, Vesu, Surat - 395007
              </p>
            </div>
          </section>

          <section>
            <p className="text-sm text-[#667085]">
              We are committed to maintaining your trust and ensuring
              that your personal information remains safe, secure, and
              protected.
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
