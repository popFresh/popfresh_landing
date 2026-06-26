import amazonLogo from "../assets/marketplaceLogos/amazon.png";
import flipkartLogo from "../assets/marketplaceLogos/flipkart.png";

export default function MarketplaceCTA() {
  return (
    <section className="py-20">
      <div className="max-w-5xl mx-auto px-6">
        <div
          className="
            rounded-[36px]
            bg-[#FBF9F3]
            border
            border-[#ECE7DB]
            shadow-sm
            py-14
            px-8
            text-center
          "
        >
          {/* Heading */}

          <span
            className="
              inline-flex
              rounded-full
              bg-[#F7F0DD]
              px-5
              py-2
              text-xs
              tracking-[0.22em]
              font-semibold
              text-[#B78A28]
            "
          >
            AVAILABLE ON
          </span>

          <h2
            className="
              mt-6
              text-4xl
              md:text-5xl
              text-[#174C35]
            "
            style={{
              fontFamily: "Fraunces, serif",
            }}
          >
            Also Available On
          </h2>

          <p className="mt-4 text-[#667085] text-lg">
            Choose your favourite marketplace.
          </p>

          <div
            className="
              mt-14
              flex
              flex-col
              md:flex-row
              items-center
              justify-center
              gap-16
            "
          >
            {/* Amazon */}

            <a
              href="https://www.amazon.in/l/27943762031?ie=UTF8&marketplaceID=A21TJRUUN4KGV&product=B0FRS9FQTL&me=A2FT9DZQC0APJG"
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex
                flex-col
                items-center
                transition-transform
                duration-300
                hover:scale-105
              "
            >
              <img
                src={amazonLogo}
                alt="Amazon"
                className="
                  h-16
                  md:h-16
                  object-contain
                "
              />
            </a>

            {/* Divider */}

            <div className="hidden md:block w-px h-20 bg-[#ECE7DB]" />

            {/* Flipkart */}

            <div
              className="
                flex
                flex-col
                items-center
                transition-transform
                duration-300
                hover:scale-105
              "
            >
              <img
                src={flipkartLogo}
                alt="Flipkart"
                className="
                  h-16
                  md:h-22
                  object-contain
                "
              />

              <span
                className="
                  mt-5
                  rounded-full
                  bg-[#F7F0DD]
                  px-4
                  py-2
                  text-[11px]
                  tracking-[0.16em]
                  font-semibold
                  uppercase
                  text-[#B78A28]
                "
              >
                Launching Soon
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}