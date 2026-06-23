import { useState } from "react";
import { CheckCircle } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import InstagramCTA from "../components/InstagramCTA";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmitted(true);

    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });

    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  return (
    <>
      <Navbar alwaysCapsule />

      <main className="bg-[#F6F3EC] pt-40 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}

          <div className="text-center">
            <span className="px-5 py-2 rounded-full bg-[#E9E3D8] text-[#184C35] text-xs tracking-[0.15em]">
              CONTACT US
            </span>

            <h1
              className="
                mt-6
                text-[#184C35]
                text-4xl
                sm:text-5xl
                md:text-7xl
              "
              style={{ fontFamily: "Fraunces, serif" }}
            >
              Let's Talk
            </h1>

            <p className="mt-6 text-[#667085] max-w-2xl mx-auto">
              We'd love to hear from you.
            </p>
          </div>

          {/* Content */}

          <div className="grid lg:grid-cols-[40%_60%] gap-10 mt-20">
            {/* Contact Info */}

            <div className="bg-white rounded-[32px] p-8">
              <h3 className="text-2xl font-semibold text-[#184C35]">
                Contact Information
              </h3>

              <div className="space-y-6 mt-8">
                <div>
                  <p className="text-[#667085]">Email</p>
                  <p className="font-medium">
                    info@popfresh.in
                  </p>
                </div>

                <div>
                  <p className="text-[#667085]">Phone</p>
                  <p className="font-medium">
                    +91 73531 39759
                  </p>
                </div>

                <div>
                  <p className="text-[#667085]">
                    Corporate Address
                  </p>

                  <p className="font-medium">
                    Pop Fresh, SNS Glorinaa World, Vesu
                    <br />
                    Surat - 395007
                    <br />
                    Gujarat, India
                  </p>
                </div>

                <div>
                  <p className="text-[#667085]">
                    FSSAI License
                  </p>

                  <p className="font-medium">
                    10725997000559
                  </p>
                </div>
              </div>
            </div>

            {/* Form */}

            <div className="bg-white rounded-[32px] p-8">
              <h3 className="text-2xl font-semibold text-[#184C35]">
                Send Us A Message
              </h3>

              {submitted && (
                <div
                  className="
                    mt-6
                    mb-4
                    rounded-2xl
                    border
                    border-green-200
                    bg-green-50
                    p-5
                    flex
                    gap-4
                    items-start
                  "
                >
                  <CheckCircle
                    size={28}
                    className="text-green-600 shrink-0"
                  />

                  <div>
                    <h4 className="font-semibold text-green-800">
                      Message Received Successfully
                    </h4>

                    <p className="mt-1 text-green-700 text-sm leading-6">
                      Thank you for contacting Pop Fresh.
                      Your message has been received and our
                      team will get back to you shortly.
                    </p>
                  </div>
                </div>
              )}

              <form
                onSubmit={handleSubmit}
                className="space-y-5 mt-8"
              >
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="
                    w-full
                    border
                    rounded-xl
                    px-4
                    py-4
                    outline-none
                    focus:border-[#184C35]
                  "
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="
                    w-full
                    border
                    rounded-xl
                    px-4
                    py-4
                    outline-none
                    focus:border-[#184C35]
                  "
                />

                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="
                    w-full
                    border
                    rounded-xl
                    px-4
                    py-4
                    outline-none
                    focus:border-[#184C35]
                  "
                />

                <textarea
                  rows="6"
                  name="message"
                  placeholder="Message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="
                    w-full
                    border
                    rounded-xl
                    px-4
                    py-4
                    resize-none
                    outline-none
                    focus:border-[#184C35]
                  "
                />

                <p className="text-sm text-[#667085]">
                  * All fields are required.
                </p>

                <button
                  type="submit"
                  disabled={submitted}
                  className={`
                    px-8
                    py-4
                    rounded-full
                    text-white
                    font-medium
                    transition-all
                    duration-300
                    ${
                      submitted
                        ? "bg-green-600 cursor-not-allowed"
                        : "bg-[#184C35] hover:bg-[#123A29]"
                    }
                  `}
                >
                  {submitted
                    ? "Message Received ✓"
                    : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <InstagramCTA />
      <Footer />
    </>
  );
}