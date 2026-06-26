import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  MapPin,
  Truck,
  ChevronDown
} from "lucide-react";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import { useCart } from "../../context/CartContext";

export default function Shipping() {
  const navigate = useNavigate();

  const {
    cart,
    subtotal,
    shipping,
    total,
  } = useCart();

  const [loadingPincode, setLoadingPincode] =
    useState(false);

  const [pincodeError, setPincodeError] =
    useState("");

  const [deliveryAvailable, setDeliveryAvailable] =
    useState(false);

const [availablePostOffices, setAvailablePostOffices] = 
    useState([]);

  const [form, setForm] = useState(() => {
    const saved = localStorage.getItem(
      "popfresh-shipping"
    );

    return saved
      ? JSON.parse(saved)
      : {
  fullName: "",
  phone: "",
  email: "",
  address: "",
  landmark: "",

  postOffice: "",
  district: "",

  city: "",
  state: "",

  pincode: "",
}
  });

  useEffect(() => {
    localStorage.setItem(
      "popfresh-shipping",
      JSON.stringify(form)
    );
  }, [form]);

  const validatePhone = (value) => {
    return /^[6-9]\d{9}$/.test(value);
  };

  const validateEmail = (value) => {
    return /\S+@\S+\.\S+/.test(value);
  };

  const fetchPincode = async (pin) => {
    if (pin.length !== 6) return;

    setLoadingPincode(true);

    setPincodeError("");

    setDeliveryAvailable(false);

    try {
      const res = await fetch(
        `https://api.postalpincode.in/pincode/${pin}`
      );

      const data = await res.json();

      if (
        data[0].Status === "Success" &&
        data[0].PostOffice.length > 0
      ) {
        const offices = data[0].PostOffice;

const office = offices[0];

setAvailablePostOffices(offices);

setForm((prev) => ({
  ...prev,

  postOffice: office.Name,

  district: office.District,

  city: office.Block || office.District,

  state: office.State,
}));

        setDeliveryAvailable(true);
      } else {
        setPincodeError(
          "Invalid Pincode"
        );
      }
    } catch (err) {
      setPincodeError(
        "Unable to validate pincode."
      );
    }

    setLoadingPincode(false);
  };

  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    let newValue = value;

    if (name === "phone") {
      newValue = value
        .replace(/\D/g, "")
        .slice(0, 10);
    }

    if (name === "pincode") {
      newValue = value
        .replace(/\D/g, "")
        .slice(0, 6);
    }

    setForm((prev) => ({
      ...prev,

      [name]: newValue,
    }));

    if (
      name === "pincode" &&
      newValue.length === 6
    ) {
      fetchPincode(newValue);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validatePhone(form.phone)) {
      alert(
        "Please enter a valid 10-digit phone number."
      );

      return;
    }

    if (!validateEmail(form.email)) {
      alert(
        "Please enter a valid email."
      );

      return;
    }

    if (
      form.pincode.length !== 6 ||
      !deliveryAvailable
    ) {
      alert(
        "Please enter a valid pincode."
      );

      return;
    }

    navigate("/checkout/payment");
  };
  return (
  <>
    <Navbar alwaysCapsule />

    <main className="min-h-screen bg-[#F6F3EC] pt-36 pb-24">

      <div className="max-w-7xl mx-auto px-5">

        {/* Header */}

        <div className="text-center">

          <span
            className="
              inline-flex

              rounded-full

              bg-[#E9E3D8]

              px-5
              py-2

              text-xs

              tracking-[0.18em]

              font-medium

              text-[#174C35]
            "
          >
            SECURE CHECKOUT
          </span>

          <h1
            className="
              mt-6

              text-[#174C35]

              text-5xl

              md:text-6xl
            "
            style={{
              fontFamily: "Fraunces, serif",
            }}
          >
            Shipping Details
          </h1>

          <p
            className="
              mt-5

              max-w-2xl

              mx-auto

              text-[#667085]

              leading-8
            "
          >
            Enter your delivery details below. We'll use this
            address for shipping your PopFresh order.
          </p>

        </div>

        
        {/* Main Grid */}

        <div
          className="
            mt-14

            grid

            gap-10

            lg:grid-cols-[1.6fr_0.8fr]
          "
        >

          {/* LEFT */}

          <div
            className="
              rounded-[36px]

              bg-white

              border
              border-[#ECE7DB]

              shadow-sm

              p-8
              md:p-10
            "
          >
                        <form
              onSubmit={handleSubmit}
              className="space-y-8"
            >
              {/* Personal Details */}

              <div>

                <h2
                  className="text-2xl text-[#174C35]"
                  style={{
                    fontFamily: "Fraunces, serif",
                  }}
                >
                  Personal Information
                </h2>

                <p className="mt-2 text-[#667085]">
                  We'll use these details to contact you regarding your order.
                </p>

              </div>

              <div className="grid md:grid-cols-2 gap-6">

                {/* Name */}

                <div>

                  <label className="block mb-2 font-medium text-[#174C35]">
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    required
                    placeholder="Mohit Agarwal"
                    className="
                      w-full

                      rounded-2xl

                      border
                      border-[#D9D5CC]

                      bg-[#FCFBF8]

                      px-5
                      py-4

                      outline-none

                      transition-all

                      focus:border-[#174C35]
                      focus:ring-4
                      focus:ring-[#174C35]/10
                    "
                  />

                </div>

                {/* Phone */}

                <div>

                  <label className="block mb-2 font-medium text-[#174C35]">
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="9876543210"
                    required
                    className="
                      w-full

                      rounded-2xl

                      border
                      border-[#D9D5CC]

                      bg-[#FCFBF8]

                      px-5
                      py-4

                      outline-none

                      transition-all

                      focus:border-[#174C35]
                      focus:ring-4
                      focus:ring-[#174C35]/10
                    "
                  />

                  {form.phone.length > 0 &&
                    !validatePhone(form.phone) && (

                      <p className="mt-2 text-sm text-red-500">
                        Enter a valid 10-digit mobile number.
                      </p>

                  )}

                </div>

              </div>

              {/* Email */}

              <div>

                <label className="block mb-2 font-medium text-[#174C35]">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                  className="
                    w-full

                    rounded-2xl

                    border
                    border-[#D9D5CC]

                    bg-[#FCFBF8]

                    px-5
                    py-4

                    outline-none

                    transition-all

                    focus:border-[#174C35]
                    focus:ring-4
                    focus:ring-[#174C35]/10
                  "
                />

                {form.email.length > 0 &&
                  !validateEmail(form.email) && (

                    <p className="mt-2 text-sm text-red-500">
                      Enter a valid email address.
                    </p>

                )}

              </div>

              {/* Shipping Address */}

              <div className="pt-4">

                <h2
                  className="text-2xl text-[#174C35]"
                  style={{
                    fontFamily: "Fraunces, serif",
                  }}
                >
                  Delivery Address
                </h2>

                <p className="mt-2 text-[#667085]">
                  Enter the complete address where you'd like your order delivered.
                </p>

              </div>

              {/* Address */}

              <div>

                <label className="block mb-2 font-medium text-[#174C35]">
                  Address
                </label>

                <textarea
                  rows={5}
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  required
                  placeholder="House No., Street, Area..."
                  className="
                    w-full

                    rounded-2xl

                    border
                    border-[#D9D5CC]

                    bg-[#FCFBF8]

                    px-5
                    py-4

                    outline-none

                    resize-none

                    transition-all

                    focus:border-[#174C35]
                    focus:ring-4
                    focus:ring-[#174C35]/10
                  "
                />

              </div>

              {/* Landmark */}

              <div>

                <label className="block mb-2 font-medium text-[#174C35]">
                  Landmark (Optional)
                </label>

                <input
                  name="landmark"
                  value={form.landmark}
                  onChange={handleChange}
                  placeholder="Near..."
                  className="
                    w-full

                    rounded-2xl

                    border
                    border-[#D9D5CC]

                    bg-[#FCFBF8]

                    px-5
                    py-4

                    outline-none

                    transition-all

                    focus:border-[#174C35]
                    focus:ring-4
                    focus:ring-[#174C35]/10
                  "
                />
                              </div>

              {/* City + State */}
                  {/* post office  */}
                  <div>

<label className="block mb-2 font-medium text-[#174C35]">
Post Office
</label>

<div className="relative">

  <select
    className="
      w-full

      appearance-none

      rounded-2xl

      border
      border-[#D9D5CC]

      bg-[#FCFBF8]

      px-5
      pr-14
      py-4

      outline-none

      focus:border-[#174C35]
      focus:ring-4
      focus:ring-[#174C35]/10
    "
  >

{availablePostOffices.map((office)=>(
    <option
        key={office.Name}
        value={office.Name}
    >
        {office.Name}
    </option>
))}

</select>
<ChevronDown
    size={20}
    className="
      pointer-events-none

      absolute

      right-5
      top-1/2

      -translate-y-1/2

      text-[#667085]
    "
  />

</div>

</div>
<div>

<label className="block mb-2 font-medium text-[#174C35]">
District
</label>

<input
    required
    name="district"
    value={form.district}
    onChange={handleChange}
    className="
        w-full
        rounded-2xl
        border
        border-[#D9D5CC]
        bg-[#FCFBF8]
        px-5
        py-4
        outline-none
        focus:border-[#174C35]
        focus:ring-4
        focus:ring-[#174C35]/10
    "
/>

</div>
              <div className="grid md:grid-cols-2 gap-6">

                {/* City */}

                <div>

                  <label className="block mb-2 font-medium text-[#174C35]">
                    City
                  </label>

                  <input
                    type="text"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    placeholder="City"
                    required
                    className="
                      w-full

                      rounded-2xl

                      border
                      border-[#D9D5CC]

                      bg-[#FCFBF8]

                      px-5
                      py-4

                      outline-none

                      transition-all

                      focus:border-[#174C35]
                      focus:ring-4
                      focus:ring-[#174C35]/10
                    "
                  />

                </div>

                {/* State */}

                <div>

                  <label className="block mb-2 font-medium text-[#174C35]">
                    State
                  </label>

                  <input
                    type="text"
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                    placeholder="State"
                    required
                    className="
                      w-full

                      rounded-2xl

                      border
                      border-[#D9D5CC]

                      bg-[#FCFBF8]

                      px-5
                      py-4

                      outline-none

                      transition-all

                      focus:border-[#174C35]
                      focus:ring-4
                      focus:ring-[#174C35]/10
                    "
                  />

                </div>

              </div>

              {/* Pincode */}

              <div>

                <label className="block mb-2 font-medium text-[#174C35]">
                  Pincode
                </label>

                <div className="relative">

                  <MapPin
                    size={18}
                    className="
                      absolute
                      left-5
                      top-1/2
                      -translate-y-1/2
                      text-[#8B8B8B]
                    "
                  />

                  <input
                    type="text"
                    name="pincode"
                    value={form.pincode}
                    onChange={handleChange}
                    placeholder="Enter 6 digit pincode"
                    required
                    className="
                      w-full

                      rounded-2xl

                      border
                      border-[#D9D5CC]

                      bg-[#FCFBF8]

                      pl-14
                      pr-5
                      py-4

                      outline-none

                      transition-all

                      focus:border-[#174C35]
                      focus:ring-4
                      focus:ring-[#174C35]/10
                    "
                  />

                </div>

                {/* Loading */}

                {loadingPincode && (

                  <p className="mt-3 text-[#667085] text-sm">
                    Checking delivery availability...
                  </p>

                )}

                {/* Success */}

                {deliveryAvailable && (

                  <div
                    className="
                      mt-3

                      inline-flex

                      items-center

                      gap-2

                      rounded-full

                      bg-green-50

                      px-4
                      py-2

                      text-sm

                      text-green-700
                    "
                  >
                    <CheckCircle2 size={16} />

                    Delivery Available
                  </div>

                )}

                {/* Error */}

                {pincodeError && (

                  <p className="mt-3 text-red-500 text-sm">
                    {pincodeError}
                  </p>

                )}

              </div>

            </form>

          </div>

          {/* RIGHT COLUMN STARTS HERE */}

          <div
            className="
              h-fit

              sticky

              top-32

              rounded-[36px]

              bg-white

              border
              border-[#ECE7DB]

              shadow-sm

              p-8
            "
          >
           
                <span
              className="
                inline-flex

                rounded-full

                bg-[#E9E3D8]

                px-4
                py-2

                text-xs

                tracking-[0.18em]

                font-medium

                text-[#174C35]
              "
            >
              ORDER SUMMARY
            </span>

            <h2
              className="
                mt-5

                text-[#174C35]

                text-3xl
              "
              style={{
                fontFamily: "Fraunces, serif",
              }}
            >
              Your Order
            </h2>

            <p className="mt-2 text-[#667085]">
              Review your order before continuing.
            </p>

            {/* Products */}

            <div className="mt-8 space-y-5">

              {cart.map((item) => (

                <div
                  key={item.id}
                  className="
                    flex

                    items-center

                    gap-4
                  "
                >

                  <div
                    className="
                      h-16
                      w-16

                      rounded-2xl

                      bg-[#F8F6F1]

                      overflow-hidden

                      flex

                      items-center
                      justify-center
                    "
                  >
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="
                        h-12
                        w-12

                        object-contain
                      "
                    />
                  </div>

                  <div className="flex-1">

                    <h4 className="font-semibold text-[#174C35]">
                      {item.name}
                    </h4>

                    <p className="text-sm text-[#667085]">
                      Qty {item.quantity}
                    </p>

                  </div>

                  <span className="font-semibold text-[#174C35]">
                    ₹{item.sellingPrice * item.quantity}
                  </span>

                </div>

              ))}

            </div>

            {/* Divider */}

            <div className="my-8 border-t border-dashed border-[#E5E5E5]" />

            {/* Totals */}

            <div className="space-y-5">

              <div className="flex justify-between">

                <span className="text-[#667085]">
                  Subtotal
                </span>

                <span className="font-semibold text-[#174C35]">
                  ₹{subtotal}
                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-[#667085]">
                  Shipping
                </span>

                <span className="font-semibold text-[#174C35]">

                  {shipping === 0
                    ? "FREE"
                    : `₹${shipping}`}

                </span>

              </div>

              <div className="border-t border-[#ECE7DB] pt-5">

                <div className="flex justify-between items-center">

                  <span
                    className="text-2xl text-[#174C35]"
                    style={{
                      fontFamily: "Fraunces, serif",
                    }}
                  >
                    Total
                  </span>

                  <span className="text-3xl font-bold text-[#174C35]">
                    ₹{total}
                  </span>

                </div>

              </div>

            </div>

            {/* Secure Checkout */}

            <div
              className="
                mt-8

                rounded-[24px]

                bg-[#F8F6F1]

                border
                border-[#ECE7DB]

                p-5
              "
            >

              <div className="flex items-center gap-3">

                <CheckCircle2
                  size={22}
                  className="text-green-600"
                />

                <div>

                  <h4 className="font-semibold text-[#174C35]">
                    Secure Checkout
                  </h4>

                  <p className="text-sm text-[#667085]">
                    Your information is encrypted and protected.
                  </p>

                </div>

              </div>

            </div>
                        {/* Buttons */}

            <div className="mt-10 space-y-4">

              <Link
                to="/cart"
                className="
                  flex
                  w-full

                  items-center
                  justify-center
                  gap-3

                  rounded-full

                  border-2
                  border-[#174C35]

                  py-4

                  font-semibold

                  text-[#174C35]

                  transition-all
                  duration-300

                  hover:bg-[#174C35]
                  hover:text-white
                "
              >
                <ArrowLeft size={18} />

                Back to Cart
              </Link>

              <button
                type="submit"
                form=""
                onClick={handleSubmit}
                className="
                  flex
                  w-full

                  items-center
                  justify-center
                  gap-3

                  rounded-full

                  bg-[#174C35]

                  py-4

                  font-semibold

                  text-white

                  transition-all
                  duration-300

                  hover:bg-[#123A2B]
                "
              >
                Continue to Payment

                <ArrowRight size={18} />
              </button>

            </div>

          </div>

        </div>

      </div>

    </main>

    <Footer />

  </>
);
}