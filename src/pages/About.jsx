import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import InstagramCTA from "../components/InstagramCTA";
import CTA from "../components/CTA";
import { Leaf, ShieldCheck, Award } from "lucide-react";

export default function About() {
  return (
    <>
      <Navbar alwaysCapsule />

      <main className="bg-[#F6F3EC] pt-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <span className="px-5 py-2 rounded-full bg-[#E9E3D8] text-[#184C35] text-xs tracking-[0.15em]">
              ABOUT POP FRESH
            </span>

            <h1
              className="mt-6 text-[#184C35] text-5xl md:text-7xl"
              style={{ fontFamily: "serif" }}
            >
              Crafted For Better Snacking
            </h1>

            <p className="mt-6 max-w-3xl mx-auto text-[#667085] text-lg leading-8">
              We believe healthy snacks should never feel boring. Pop Fresh
              combines premium makhana, bold flavours, and mindful ingredients
              to create snacks you'll genuinely crave.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-24">
            <div className="bg-white rounded-[28px] p-8">
              <Leaf className="text-[#184C35]" />
              <h3 className="mt-5 text-xl font-semibold">
                Premium Ingredients
              </h3>
              <p className="mt-3 text-[#667085]">
                Carefully sourced fox nuts and clean ingredients.
              </p>
            </div>

            <div className="bg-white rounded-[28px] p-8">
              <ShieldCheck className="text-[#184C35]" />
              <h3 className="mt-5 text-xl font-semibold">Never Fried</h3>
              <p className="mt-3 text-[#667085]">
                Slow roasted for flavour and crunch.
              </p>
            </div>

            <div className="bg-white rounded-[28px] p-8">
              <Award className="text-[#184C35]" />
              <h3 className="mt-5 text-xl font-semibold">Quality Assured</h3>
              <p className="mt-3 text-[#667085]">
                Produced under strict quality standards.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-[36px] p-10 mt-16">
            <h2
              className="text-[#184C35] text-4xl"
              style={{ fontFamily: "serif" }}
            >
              Certifications & Compliance
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div>
                <p className="text-[#667085]">FSSAI License</p>
                <p className="font-semibold">10725997000559</p>
              </div>

              <div>
                <p className="text-[#667085]">Country</p>
                <p className="font-semibold">India 🇮🇳</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <InstagramCTA />
      <Footer />
    </>
  );
}
