import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import WhyChoose from "../components/WhyChoose";
import Flavours from "../components/Flavours";
import Comparison from "../components/Comparison";
import Testimonials from "../components/Testimonials";
import CTA from "../components/CTA";
import InstagramCTA from "../components/InstagramCTA";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Flavours />
      <WhyChoose />
      <Comparison />
      <Testimonials />
      <CTA />
      <Footer />
    </>
  );
}
