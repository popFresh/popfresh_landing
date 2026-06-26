import { BrowserRouter, Routes, Route } from "react-router-dom";

import ScrollToTop from "./components/ScrollToTop";
import ScrollToTopButton from "./components/ScrollToTopButton";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ReturnRefundPolicy from "./pages/ReturnRefundPolicy";
import ShippingPolicy from "./pages/ShippingPolicy";
import FAQs from "./pages/Faq";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/products" element={<Products />} />

        <Route path="/products/:slug" element={<ProductDetails />} />

        <Route path="/about" element={<About />} />

        <Route path="/contact" element={<Contact />} />

        <Route path="/return-refund-policy" element={<ReturnRefundPolicy />} />

        <Route path="/shipping-policy" element={<ShippingPolicy />} />

        <Route path="/faq" element={<FAQs />} />

        <Route path="/privacy-policy" element={<PrivacyPolicy />} />

        <Route path="/terms-of-service" element={<TermsOfService />} />

      </Routes>

       <ScrollToTopButton />

    </BrowserRouter>
  );
}
