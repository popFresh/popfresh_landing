import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createOrder,verifyPayment } from "../../api/checkout.api.js";
import { toast } from "react-toastify";

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

  pricing,
  pricingLoading,

  appliedCoupon,

  clearCart,
} = useCart();

  const [loadingPincode, setLoadingPincode] =
    useState(false);

  const [pincodeError, setPincodeError] =
    useState("");

  const [deliveryAvailable, setDeliveryAvailable] =
    useState(false);

const [availablePostOffices, setAvailablePostOffices] = 
    useState([]);

    const [paymentLoading, setPaymentLoading] =
  useState(false);

  const [processingPayment, setProcessingPayment] =
  useState(false);

  const [form, setForm] = useState({
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
});

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

  if (newValue.length < 6) {

    setAvailablePostOffices([]);

    setDeliveryAvailable(false);

    setPincodeError("");

    setForm(prev => ({

      ...prev,

      pincode: newValue,

      postOffice: "",

      district: "",

      city: "",

      state: "",

    }));

    return;

  }

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

  const loadRazorpayScript = () => {

  return new Promise((resolve) => {

    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");

    script.src =
      "https://checkout.razorpay.com/v1/checkout.js";

    script.onload = () => resolve(true);

    script.onerror = () => resolve(false);

    document.body.appendChild(script);

  });

};


const handlePayment = async () => {
    setPaymentLoading(true);


    
        // -----------------------------
  // Validate Shipping
  // -----------------------------

  if (!validatePhone(form.phone)) {

    toast.error("Please enter a valid phone number.");

    setPaymentLoading(false);

    return;

  }

  if (!validateEmail(form.email)) {

    toast.error("Please enter a valid email.");

    setPaymentLoading(false);

    return;

  }

  if (
    form.pincode.length !== 6 ||
    !deliveryAvailable
  ) {

    toast.error("Please enter a valid pincode.");

    setPaymentLoading(false);

    return;

  }

  // -----------------------------
  // Load Razorpay JS
  // -----------------------------

  const loaded =
    await loadRazorpayScript();

  if (!loaded) {

    toast.error("Unable to load Razorpay.");

    setPaymentLoading(false);

    return;

  }

  // -----------------------------
  // Create Razorpay Order
  // -----------------------------
let order;
try{
    

    order = await createOrder({

  currency: "INR",

  cartItems: cart,

  couponCode: appliedCoupon,

});

    }

  
catch (err) {

    toast.error(

      err.response?.data?.message ||

      "Something went wrong."

    );

    setPaymentLoading(false);

    return;

}

  // console.log(order);

  // -----------------------------
  // Razorpay Checkout
  // -----------------------------

  const options = {

    key:
      import.meta.env.VITE_RAZORPAY_KEY_ID,

    amount:
      order.razorpayOrder.amount,

    currency:
      order.razorpayOrder.currency,

    order_id:
      order.razorpayOrder.id,

    name:
      "POPFRESH",

    description:
      "Healthy Snacks",

    image:
      "https://res.cloudinary.com/diksf0ddl/image/upload/v1782548064/pop_logo_color_sxqhil.png",

    prefill: {

      name:
        form.fullName,

      email:
        form.email,

      contact:
        form.phone,

    },

    notes: {

      address:
        form.address,

    },

    theme: {

      color:
        "#174C35",

    },

// handler: async (response) => {

//    const verify = await verifyPayment(response);

// console.log(verify);

//     console.log(verify.data);

// },

handler: async (response) => {

  const payload = {

  ...response,

  customer: {

    name: form.fullName,

    email: form.email,

    phone: form.phone,

  },

  address: {

  fullName: form.fullName,

  phone: form.phone,

  addressLine1: form.address,

  addressLine2: form.address2 || "",

  landmark: form.landmark || "",

  postOffice: form.postOffice,

  district: form.district,

  city: form.city,

  state: form.state,

  pincode: form.pincode,

},

  cartItems: cart,

  couponCode: appliedCoupon,

};

setProcessingPayment(true);

try {

  const result = await verifyPayment(payload);

  setPaymentLoading(false);

  clearCart();

  navigate("/order-success", {
    state: result,
    replace: true,
  });

} catch (err) {

  setProcessingPayment(false);
  setPaymentLoading(false);

  console.error(err);

  toast.error(
    err.response?.data?.message ||
    "Payment verification failed."
  );

}


},

  
    modal: {

      ondismiss() {
        setProcessingPayment(false)
        setPaymentLoading(false);

        // console.log(
        //   "Payment Cancelled"
        // );

      },

    },

  };

  try{
     const razorpay =
    new window.Razorpay(options);

  razorpay.open();

  }catch (err) {

  setPaymentLoading(false);

  toast.error("Unable to open payment gateway.");

}
 
  };



//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!validatePhone(form.phone)) {
//       alert(
//         "Please enter a valid 10-digit phone number."
//       );

//       return;
//     }

//     if (!validateEmail(form.email)) {
//       alert(
//         "Please enter a valid email."
//       );

//       return;
//     }

//     if (
//       form.pincode.length !== 6 ||
//       !deliveryAvailable
//     ) {
//       alert(
//         "Please enter a valid pincode."
//       );

//       return;
//     }

//     navigate("/checkout/payment");
//   };
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
                    placeholder="Enter your name"
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
                    placeholder="Enter your phone"
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
    value={form.postOffice}

onChange={(e) => {

  const office =
    availablePostOffices.find(
      (item) => item.Name === e.target.value
    );

  setForm((prev) => ({
    ...prev,

    postOffice: office.Name,

    district: office.District,

    city: office.Block || office.District,

    state: office.State,

  }));

}}
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
                      src={item.images?.[0] || "/placeholder.png"}
                      alt={item.name}
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
                    ₹{Number(item.sellingPrice) * item.quantity}
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
                  ₹{pricing.subtotal}
                </span>

              </div>

      <div className="flex justify-between">
  <span className="text-[#667085]">
    Shipping
  </span>

  <span
    className={`font-semibold ${
      !pricingLoading && pricing.shipping === 0
        ? "text-green-600"
        : "text-[#174C35]"
    }`}
  >
    {pricingLoading
      ? "Calculating..."
      : pricing.shipping === 0
      ? "FREE"
      : `₹${pricing.shipping}`}
  </span>
</div>

{!pricingLoading && pricing.discount > 0 && (

<div className="flex justify-between">

  <span className="text-[#667085]">
    Discount
  </span>

  <span className="font-semibold text-green-600">
    -₹{pricing.discount}
  </span>

</div>

)}
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

  {pricingLoading ? (

    <div
      className="
        h-8
        w-24
        rounded
        animate-pulse
        bg-[#E8E2D6]
      "
    />

  ) : (

    `₹${pricing.total}`

  )}

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
                type="button"
                disabled={paymentLoading || pricingLoading}
                //onClick={handleSubmit}
                onClick={handlePayment}
                className={`
                  flex
                  w-full

                  items-center
                  justify-center
                  gap-3

                  rounded-full

                  

                  py-4

                  font-semibold

                  text-white

                  transition-all
                  duration-300
                 ${
  paymentLoading || pricingLoading
    ? "bg-[#174C35]/70 cursor-not-allowed"
    : "bg-[#174C35] hover:bg-[#123A2B]"
}
`}

                  
                
              >
                {paymentLoading ? (

  <>

    <div
      className="
        h-5
        w-5
        rounded-full
        border-2
        border-white/30
        border-t-white
        animate-spin
      "
    />

    Processing Payment ...

  </>

) : (

  <>

    Proceed to Pay

    <ArrowRight size={18} />

  </>

)}

               
              </button>

            </div>

          </div>

        </div>

      </div>

    </main>

    <Footer />

    {processingPayment && (
  <div
    className="
      fixed
      inset-0
      z-[9999]
      bg-black/50
      backdrop-blur-sm
      flex
      items-center
      justify-center
    "
  >
    <div
      className="
        w-[360px]
        rounded-3xl
        bg-white
        p-10
        text-center
        shadow-2xl
      "
    >
      <div
        className="
          mx-auto
          h-14
          w-14
          rounded-full
          border-4
          border-[#DDE8E2]
          border-t-[#174C35]
          animate-spin
        "
      />

      <h3
        className="mt-6 text-2xl text-[#174C35]"
        style={{ fontFamily: "Fraunces, serif" }}
      >
        Processing Payment
      </h3>

      <p className="mt-3 text-[#667085] leading-7">
        Please don't close this window.
        <br />
        We're confirming your payment and creating your order.
      </p>
    </div>
  </div>
)}

  </>
);
}