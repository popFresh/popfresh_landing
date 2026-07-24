import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import InstagramCTA from "../components/InstagramCTA";
import {
  Leaf,
  ShieldCheck,
  Award,
  Sparkles,
} from "lucide-react";

import aboutImage from "../assets/about-story.png";

export default function About() {
  return (
    <>
      <Navbar alwaysCapsule />

      <main className="bg-[#F6F3EC] pt-40">
        <div className="mx-auto max-w-7xl px-6">
        <div className="flex justify-center mb-16">
  <span className="px-5 py-2 rounded-full bg-[#E9E3D8] text-[#184C35] text-xs tracking-[0.15em]">
    ABOUT POP FRESH
  </span>

</div>

          {/* Story */}

          <section className="grid items-center gap-10 lg:grid-cols-[0.92fr_1.08fr]">

            {/* Left */}

            <div className="max-w-xl">

              <div className="inline-flex items-center gap-2 rounded-full bg-[#E9E3D8] px-4 py-2 text-sm font-medium text-[#184C35]">
                <Sparkles size={16} />
                Our Story
              </div>

              <h1
                className="mt-4 text-4xl leading-[1.08] text-[#184C35] md:text-6xl"
                style={{ fontFamily: "serif" }}
              >
                Two sisters.
                <br />
                One kitchen.
                <br />
                A whole lot of crunch.
              </h1>

              <div className="mt-6 space-y-4 text-[17px] leading-8 text-[#667085]">

                <p>
                  That's how <strong>PopFresh</strong> popped into life — born
                  out of midnight munchies, endless laughter, and a shared love
                  for guilt-free snacking.
                </p>

                <p>
                  We took the good old <strong>makhana</strong>, gave it a
                  modern twist, and turned it into the hero of snack time.
                  Light, tasty, and always fresh — just the way snacking should
                  be.
                </p>

                <p>
                  So go ahead — open, pop, and crunch your way into something
                  deliciously healthy. Because at <strong>PopFresh</strong>,
                  snacking isn't just a habit...

                </p>

                <p className="pt-1 text-2xl font-semibold italic text-[#184C35]">
                  It's a vibe.
                </p>

                <p className="text-2xl font-bold text-[#184C35]">
                  Pop it, Love it 💚
                </p>

              </div>

            </div>

            {/* Right */}

            <div className="relative flex items-center justify-center">

              <div className="absolute h-[420px] w-[420px] rounded-full bg-[#E7D7B7]/50 blur-[120px]" />

              <img
                src={aboutImage}
                alt="The story behind PopFresh"
                className="relative z-10 w-full max-w-[900px] object-contain"
              />

            </div>

          </section>
          {/* Why PopFresh */}

<section className="mt-24">

  <div className="text-center">
    <span className="text-sm font-semibold uppercase tracking-[0.18em] text-[#184C35]">
      WHY PEOPLE LOVE US
    </span>

    <h2
      className="mt-3 text-4xl text-[#184C35] md:text-5xl"
      style={{ fontFamily: "serif" }}
    >
      Goodness In Every Crunch
    </h2>

    <p className="mx-auto mt-5 max-w-2xl leading-8 text-[#667085]">
      Thoughtfully crafted snacks made with premium ingredients, clean
      recipes, and uncompromising quality.
    </p>
  </div>

  <div className="mt-14 grid gap-7 md:grid-cols-3">

    {/* Card 1 */}

    <div className="group rounded-[32px] border border-[#ECE6DA] bg-white p-9 transition-all duration-300 hover:-translate-y-2 hover:border-[#DCCFB9] hover:shadow-xl">

      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EDF7F1] transition-transform duration-300 group-hover:scale-110">
        <Leaf size={30} className="text-[#184C35]" />
      </div>

      <h3 className="mt-7 text-2xl font-semibold text-[#184C35]">
        Premium Ingredients
      </h3>

      <p className="mt-4 leading-8 text-[#667085]">
        Every PopFresh pack begins with carefully sourced premium makhana
        and thoughtfully selected ingredients to deliver exceptional
        freshness, flavour, and quality.
      </p>

    </div>

    {/* Card 2 */}

    <div className="group rounded-[32px] border border-[#ECE6DA] bg-white p-9 transition-all duration-300 hover:-translate-y-2 hover:border-[#DCCFB9] hover:shadow-xl">

      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EDF7F1] transition-transform duration-300 group-hover:scale-110">
        <ShieldCheck size={30} className="text-[#184C35]" />
      </div>

      <h3 className="mt-7 text-2xl font-semibold text-[#184C35]">
        Never Fried
      </h3>

      <p className="mt-4 leading-8 text-[#667085]">
        We gently roast our makhana instead of frying it, giving every
        bite a naturally light texture with the perfect balance of
        crunch and flavour.
      </p>

    </div>

    {/* Card 3 */}

    <div className="group rounded-[32px] border border-[#ECE6DA] bg-white p-9 transition-all duration-300 hover:-translate-y-2 hover:border-[#DCCFB9] hover:shadow-xl">

      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EDF7F1] transition-transform duration-300 group-hover:scale-110">
        <Award size={30} className="text-[#184C35]" />
      </div>

      <h3 className="mt-7 text-2xl font-semibold text-[#184C35]">
        Quality Assured
      </h3>

      <p className="mt-4 leading-8 text-[#667085]">
        Every batch goes through strict quality checks so that every
        pack you open is fresh, safe, and consistently delicious.
      </p>

    </div>

  </div>

</section>
{/* Certifications */}

<section className="mt-28 mb-24">

  <div className="overflow-hidden rounded-[40px] border border-[#E7DED2] bg-white">

    <div className="grid lg:grid-cols-[1.1fr_0.9fr]">

      {/* Left */}

      <div className="p-10 md:p-14">

        <span className="text-sm font-semibold uppercase tracking-[0.18em] text-[#184C35]">
          TRUST & COMPLIANCE
        </span>

        <h2
          className="mt-4 text-4xl leading-tight text-[#184C35] md:text-5xl"
          style={{ fontFamily: "serif" }}
        >
          Crafted With Care.
          <br />
          Backed By Quality.
        </h2>

        <p className="mt-6 max-w-lg text-[17px] leading-8 text-[#667085]">
          Every PopFresh pack is prepared with carefully selected
          ingredients and manufactured following strict quality
          standards, ensuring every bite is fresh, safe and
          consistently delicious.
        </p>

      </div>

      {/* Right */}

      <div className="flex flex-col justify-center gap-6 bg-white p-10 md:p-14">

        <div className="rounded-3xl border border-[#ECE6DA] bg-white p-7 transition duration-300 hover:shadow-lg">

          <p className="text-sm font-medium uppercase tracking-[0.15em] text-[#8A8A8A]">
            FSSAI License
          </p>

          <h3 className="mt-3 text-3xl font-bold text-[#184C35]">
            10725997000559
          </h3>

        </div>

        <div className="rounded-3xl border border-[#ECE6DA] bg-white p-7 transition duration-300 hover:shadow-lg">

          <p className="text-sm font-medium uppercase tracking-[0.15em] text-[#8A8A8A]">
            Manufactured In
          </p>

          <h3 className="mt-3 text-3xl font-bold text-[#184C35]">
            India 🇮🇳
          </h3>

        </div>

      </div>

    </div>

  </div>

</section>
<InstagramCTA />
 </div>
      </main>

      

      <Footer />
    </>
  );
}