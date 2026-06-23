import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function TermsOfService() {
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
          Terms of Service
        </h1>

        <p className="mt-4 text-[#667085]">
          Last Updated: June 2026
        </p>

        <div className="mt-10 space-y-10 text-[#475467] leading-8">
          <section>
            <p>
              Welcome to POPFRESH. These Terms of Service ("Terms")
              govern your use of our website and the purchase of products
              through our platform. By accessing our website or placing an
              order, you agree to be bound by these Terms.
            </p>

            <p className="mt-4">
              If you do not agree with any part of these Terms, please
              refrain from using our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-[#184C35] mb-4 font-semibold">
              1. About POPFRESH
            </h2>

            <p>
              POPFRESH is an online food and snack brand offering
              flavoured makhanas and related products for purchase
              through our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-[#184C35] mb-4 font-semibold">
              2. Ordering Products
            </h2>

            <p>
              Customers can place orders directly through our website
              without creating an account or registering.
            </p>

            <p className="mt-4">
              To process and deliver your order, we may collect certain
              information including:
            </p>

            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Name</li>
              <li>Mobile Number</li>
              <li>Shipping Address</li>
              <li>City, State, and PIN Code</li>
              <li>Email Address (if provided)</li>
            </ul>

            <p className="mt-4">
              You are responsible for ensuring that all information
              provided during checkout is accurate and complete.
            </p>

            <p className="mt-4">
              POPFRESH shall not be responsible for delays, failed
              deliveries, or additional costs resulting from incorrect
              customer information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-[#184C35] mb-4 font-semibold">
              3. Order Confirmation
            </h2>

            <p>
              Once an order is placed, you will receive an order
              confirmation through the contact details provided during
              checkout.
            </p>

            <p className="mt-4">
              Receipt of an order confirmation does not guarantee
              acceptance of the order.
            </p>

            <p className="mt-4">
              POPFRESH reserves the right to cancel or refuse any order
              due to:
            </p>

            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Product unavailability</li>
              <li>Pricing errors</li>
              <li>Suspected fraudulent activity</li>
              <li>Delivery limitations</li>
              <li>Any other unforeseen circumstances</li>
            </ul>

            <p className="mt-4">
              In such cases, any eligible refund will be processed in
              accordance with our Return & Refund Policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-[#184C35] mb-4 font-semibold">
              4. Pricing and Payments
            </h2>

            <ul className="list-disc pl-6 space-y-2">
              <li>All prices displayed on the website are in INR.</li>
              <li>Prices are subject to change without prior notice.</li>
              <li>
                Applicable taxes, shipping charges, and promotional
                discounts will be displayed during checkout.
              </li>
              <li>
                Payment must be successfully completed before an order
                is processed.
              </li>
            </ul>

            <p className="mt-4">
              Payments are securely processed through trusted
              third-party payment providers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-[#184C35] mb-4 font-semibold">
              5. Shipping and Delivery
            </h2>

            <p>
              POPFRESH will make reasonable efforts to deliver products
              within the estimated delivery timelines.
            </p>

            <p className="mt-4">
              However, delivery dates are estimates only and may be
              affected by:
            </p>

            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Courier delays</li>
              <li>Weather conditions</li>
              <li>Public holidays</li>
              <li>Operational disruptions</li>
              <li>Events beyond our reasonable control</li>
            </ul>

            <p className="mt-4">
              Ownership and risk of the products pass to the customer
              upon successful delivery.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-[#184C35] mb-4 font-semibold">
              6. Order Tracking
            </h2>

            <p>
              Customers may track their orders using:
            </p>

            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Order ID</li>
              <li>Mobile Number used during purchase</li>
            </ul>

            <p className="mt-4">
              This information is used solely for providing order
              status and shipment updates.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-[#184C35] mb-4 font-semibold">
              7. Cancellations, Returns, and Refunds
            </h2>

            <p>
              Food products are generally non-returnable due to hygiene
              and safety considerations.
            </p>

            <p className="mt-4">
              Returns, replacements, and refunds will be handled in
              accordance with our Return & Refund Policy.
            </p>

            <p className="mt-4">
              Customers should inspect their order upon delivery and
              report any issues within the timeframe specified in our
              policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-[#184C35] mb-4 font-semibold">
              8. Product Information
            </h2>

            <p>
              We strive to ensure that all product descriptions,
              images, ingredients, nutritional information, and pricing
              are accurate.
            </p>

            <p className="mt-4">However:</p>

            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>
                Product packaging may vary from website images.
              </li>
              <li>
                Minor variations in appearance, flavour, or packaging
                may occur.
              </li>
              <li>
                Information on the website should not be considered
                medical, nutritional, or dietary advice.
              </li>
            </ul>

            <p className="mt-4">
              Customers with allergies or dietary restrictions should
              carefully review ingredient information before
              consumption.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-[#184C35] mb-4 font-semibold">
              9. Website Usage
            </h2>

            <p>You agree not to:</p>

            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Use the website for unlawful purposes.</li>
              <li>
                Interfere with website functionality or security.
              </li>
              <li>
                Attempt unauthorized access to our systems.
              </li>
              <li>
                Introduce viruses, malware, or harmful code.
              </li>
              <li>
                Use automated tools to access or scrape website
                content without permission.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl text-[#184C35] mb-4 font-semibold">
              10. Privacy and Data Protection
            </h2>

            <p>
              To fulfill orders and provide customer support,
              POPFRESH collects limited customer information such as
              name, phone number, address, and related order details.
            </p>

            <p className="mt-4">
              We maintain reasonable security measures and
              industry-standard safeguards to protect customer
              information from unauthorized access, misuse, or
              disclosure.
            </p>

            <p className="mt-4">
              For additional details regarding how information is
              collected, used, and protected, please refer to our
              Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-[#184C35] mb-4 font-semibold">
              11. Intellectual Property
            </h2>

            <p>
              All content on the POPFRESH website, including but not
              limited to:
            </p>

            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Brand name</li>
              <li>Logos</li>
              <li>Product names</li>
              <li>Product images</li>
              <li>Website content</li>
              <li>Packaging designs</li>
              <li>Graphics and visual assets</li>
            </ul>

            <p className="mt-4">
              is the property of POPFRESH and is protected by
              applicable intellectual property laws.
            </p>

            <p className="mt-4">
              No content may be copied, reproduced, distributed, or
              used without prior written consent.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-[#184C35] mb-4 font-semibold">
              12. Limitation of Liability
            </h2>

            <p>
              To the maximum extent permitted by law, POPFRESH shall
              not be liable for:
            </p>

            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Indirect or consequential damages</li>
              <li>Loss of profits or business opportunities</li>
              <li>
                Delays caused by third-party logistics providers
              </li>
              <li>
                Technical interruptions beyond our control
              </li>
              <li>Customer misuse of products</li>
            </ul>

            <p className="mt-4">
              Our total liability in relation to any order shall not
              exceed the amount paid by the customer for that specific
              order.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-[#184C35] mb-4 font-semibold">
              13. Force Majeure
            </h2>

            <p>
              POPFRESH shall not be held responsible for any failure
              or delay in performance resulting from events beyond its
              reasonable control, including natural disasters,
              strikes, government actions, pandemics, internet
              outages, transportation disruptions, or similar events.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-[#184C35] mb-4 font-semibold">
              14. Changes to These Terms
            </h2>

            <p>
              We reserve the right to update or modify these Terms at
              any time.
            </p>

            <p className="mt-4">
              Any changes will become effective upon publication on
              this page. Continued use of the website after such
              changes constitutes acceptance of the revised Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-[#184C35] mb-4 font-semibold">
              15. Governing Law and Jurisdiction
            </h2>

            <p>
              These Terms shall be governed by and interpreted in
              accordance with the laws of India.
            </p>

            <p className="mt-4">
              Any disputes arising out of or relating to these Terms
              or the use of the website shall be subject to the
              exclusive jurisdiction of the courts located in
              Kolkata, West Bengal, India.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-[#184C35] mb-4 font-semibold">
              16. Contact Us
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
                Address: SNS Glorinaa, Vesu, Surat
              </p>
            </div>
          </section>

          <section>
            <p className="text-sm text-[#667085]">
              By using our website and placing an order, you
              acknowledge that you have read, understood, and agreed
              to these Terms of Service.
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
