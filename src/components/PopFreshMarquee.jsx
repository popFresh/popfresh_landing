import React from "react";

export default function PopFreshMarquee() {
  const content = (
    <>
      <span>🌿 PREMIUM ROASTED MAKHANA</span>

      <span className="text-[#D4B56A]">✦</span>

      <span>💪 HIGH PROTEIN</span>

      <span className="text-[#D4B56A]">✦</span>

      <span>🔥 NEVER FRIED</span>

      <span className="text-[#D4B56A]">✦</span>

      <span>🌱 100% VEG</span>

      <span className="text-[#D4B56A]">✦</span>

      <span>⭐ 4.9 RATED BY 1,200+ CUSTOMERS</span>

      <span className="text-[#D4B56A]">✦</span>

      <span>🛡️ FSSAI CERTIFIED</span>

      <span className="text-[#D4B56A]">✦</span>

      <span>🚚 BLAZING FAST DELIVERY</span>

      <span className="text-[#D4B56A]">✦</span>

      <span>🥗 GUILT-FREE SNACKING</span>

      <span className="text-[#D4B56A]">✦</span>

      <span>🏆 BEST SELLER FLAVOURS</span>
    </>
  );

  return (
    <section className="bg-[#032F23] overflow-hidden border-y border-[#D4B56A]/20">
      <div
        className="
          flex
          w-max
          items-center
          gap-14
          py-8
          px-6
          text-[#F5F1E8]
          font-medium
          tracking-[0.15em]
          text-xs
          md:text-sm
          animate-[marquee_28s_linear_infinite]
        "
      >
        {content}
        {content}
      </div>
    </section>
  );
}
