import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const faqSections = [
{
title: "Orders & Payments",
faqs: [
{
question: "How do I place an order?",
answer:
"Simply browse our products, add your favorite snacks to the cart, and proceed to checkout. Follow the payment instructions to complete your purchase.",
},
{
question: "What payment methods do you accept?",
answer:
"We accept major debit cards, credit cards, UPI, net banking, and other payment methods available at checkout.",
},
{
question: "Can I cancel my order?",
answer:
"Yes, orders can be cancelled before they are dispatched from our warehouse. Once shipped, orders cannot be cancelled.",
},
{
question: "Will I receive an order confirmation?",
answer:
"Yes, you will receive an order confirmation via email, SMS, or WhatsApp after your order is successfully placed.",
},
],
},

{
title: "Shipping & Delivery",
faqs: [
{
question: "Where do you ship?",
answer:
"We currently ship to most locations across India.",
},
{
question: "How long does delivery take?",
answer:
"Metro Cities: 2–5 business days. Tier 2 & Tier 3 Cities: 3–7 business days. Remote Locations: 5–10 business days. Delivery times may vary due to courier operations, weather conditions, public holidays, or other unforeseen circumstances.",
},
{
question: "How can I track my order?",
answer:
"Once your order is shipped, you will receive tracking details via email, SMS, or WhatsApp. You can use these details to track your shipment.",
},
{
question: "What if my area is not serviceable?",
answer:
"If your location is not serviceable by our courier partners, we will notify you and issue a full refund.",
},
],
},

{
title: "Products",
faqs: [
{
question: "What are POPFRESH Makhanas?",
answer:
"POPFRESH offers delicious roasted and flavored makhanas (fox nuts) made using quality ingredients for a healthy and satisfying snacking experience.",
},
{
question: "Are your products vegetarian?",
answer:
"Yes, our makhana products are vegetarian. Please refer to individual product packaging for detailed ingredient information.",
},
{
question: "How should I store my makhanas?",
answer:
"Store the product in a cool, dry place away from direct sunlight. Once opened, keep the pack tightly sealed and consume within a reasonable period for the best taste and freshness.",
},
{
question: "Do your products contain allergens?",
answer:
"Some products may contain ingredients that could trigger allergies. Please carefully review the ingredient list and allergen information on the product packaging before consumption.",
},
{
question: "Are POPFRESH Makhanas roasted or fried?",
answer:
"POPFRESH Makhanas are roasted to deliver a light, crunchy, and satisfying snacking experience.",
},
{
question: "What is the shelf life of POPFRESH products?",
answer:
"Shelf life information is clearly mentioned on the product packaging. We recommend consuming the product before the stated expiry date.",
},
],
},

{
title: "Returns & Refunds",
faqs: [
{
question: "Can I return a product?",
answer:
"Due to the consumable nature of our products, returns are generally not accepted after delivery.",
},
{
question: "When am I eligible for a refund or replacement?",
answer:
"You may be eligible if the product received is damaged or defective, expired, incorrect, or if the package was tampered with before delivery.",
},
{
question: "How do I report a damaged or incorrect product?",
answer:
"Please contact us within 24 hours of delivery at [support@popfresh.in](mailto:support@popfresh.in) with your Order Number, Contact Details, photographs of the product and packaging, and a brief description of the issue.",
},
{
question: "How long does it take to receive a refund?",
answer:
"Approved refunds are typically processed within 5–7 business days. The exact timeline may vary depending on your bank or payment provider.",
},
],
},

{
title: "General Questions",
faqs: [
{
question: "Do you offer free shipping?",
answer:
"We may offer free shipping on select orders, promotions, or minimum order values. Any applicable offers will be displayed at checkout.",
},
{
question: "How can I contact POPFRESH?",
answer:
"For any questions or assistance, please contact POPFRESH Customer Support at [support@popfresh.in](mailto:support@popfresh.in) or call +91 7353129759.",
},
],
},
];

function FAQItem({ question, answer }) {
const [open, setOpen] = useState(false);

return ( <div className="border-b border-[#E5E7EB] last:border-0">
<button
onClick={() => setOpen(!open)}
className="
w-full
flex
items-center
justify-between
gap-4
py-6
text-left
"
> <span className="text-[#184C35] font-medium text-lg">
{question} </span>


    <ChevronDown
      size={20}
      className={`
        transition-transform
        duration-300
        ${open ? "rotate-180" : ""}
      `}
    />
  </button>

  <div
    className={`
      overflow-hidden
      transition-all
      duration-300
      ${open ? "max-h-96 pb-6" : "max-h-0"}
    `}
  >
    <p className="text-[#667085] leading-8 pr-8">
      {answer}
    </p>
  </div>
</div>


);
}

export default function FAQs() {
return (
<> <Navbar alwaysCapsule />


  <main className="bg-[#F6F3EC] min-h-screen pt-36 pb-24">
    <div className="max-w-5xl mx-auto px-6">
      <div className="text-center mb-16">
        <span className="inline-flex px-4 py-2 rounded-full bg-[#E9E3D8] text-[#184C35] text-xs tracking-[0.15em] font-medium">
          HELP CENTER
        </span>

        <h1
          className="mt-6 text-[#184C35] text-4xl md:text-5xl"
          style={{ fontFamily: "serif" }}
        >
          Frequently Asked Questions
        </h1>

        <p className="mt-5 text-[#667085] max-w-2xl mx-auto">
          Find answers to common questions about POPFRESH products,
          orders, shipping, refunds, and more.
        </p>
      </div>

      <div className="space-y-8">
        {faqSections.map((section) => (
          <div
            key={section.title}
            className="
              bg-white
              rounded-[28px]
              shadow-sm
              p-6
              md:p-8
            "
          >
            <h2
              className="text-2xl text-[#184C35] mb-4"
              style={{ fontFamily: "serif" }}
            >
              {section.title}
            </h2>

            <div>
              {section.faqs.map((faq) => (
                <FAQItem
                  key={faq.question}
                  question={faq.question}
                  answer={faq.answer}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 bg-white rounded-[28px] shadow-sm p-8 text-center">
        <h3
          className="text-2xl text-[#184C35]"
          style={{ fontFamily: "serif" }}
        >
          Still have questions?
        </h3>

        <p className="mt-4 text-[#667085]">
          Our team is happy to help.
        </p>

        <div className="mt-6 space-y-2">
          <p className="font-medium text-[#184C35]">
            hello@popfresh.in
          </p>

          <p className="font-medium text-[#184C35]">
            +91 7353129759
          </p>
        </div>
      </div>
    </div>
  </main>

  <Footer />
</>


);
}
