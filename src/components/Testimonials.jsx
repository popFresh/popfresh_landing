import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "Peri Peri is dangerously addictive.",
    name: "Priya M.",
    city: "Delhi",
  },
  {
    quote: "Finally a healthy snack that tastes amazing.",
    name: "Vikram J.",
    city: "Pune",
  },
  {
    quote: "Light, crunchy, perfect with chai.",
    name: "Sara D.",
    city: "Hyderabad",
  },
  {
    quote: "Pudina hits different. My new bag staple now.",
    name: "Arjun N.",
    city: "Chennai",
  },
  {
    quote: "Way better than chips and actually filling.",
    name: "Rohan K.",
    city: "Bangalore",
  },
  {
    quote: "Love the clean ingredients and premium taste.",
    name: "Ananya P.",
    city: "Mumbai",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-[#F6F3EC] py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Badge */}

        <div className="flex justify-center">
          <div
            className="
              inline-flex
              items-center
              gap-2
              px-5
              py-2
              rounded-full
              bg-[#E9E6DE]
              text-[#1B5A3A]
              text-sm
              font-medium
            "
          >
            <Star size={14} />
            LOVED BY SNACKERS
          </div>
        </div>

        {/* Heading */}

        <h2
          className="
            text-center
            mt-8
            text-[#165233]
            text-5xl
            md:text-6xl
            leading-none
          "
          style={{ fontFamily: "serif" }}
        >
          6,000+ happy crunches
        </h2>
      </div>

      {/* Marquee */}

      <div className="mt-16 relative">
        <div className="flex marquee-track">
          {[...testimonials, ...testimonials].map((item, index) => (
            <div
              key={index}
              className="
                flex-shrink-0
                w-[470px]
                mx-4
                bg-[#FBFAF7]
                border
                border-[#E5DED3]
                rounded-[34px]
                p-8
                hover:-translate-y-1
                transition-all
                duration-300
              "
            >
              {/* Stars */}

              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill="#D9A52D" color="#D9A52D" />
                ))}
              </div>

              {/* Quote */}

              <h3
                className="
                  mt-8
                  text-[2rem]
                  leading-tight
                  text-[#232323]
                "
                style={{ fontFamily: "serif" }}
              >
                "{item.quote}"
              </h3>

              {/* User */}

              <div className="flex items-center gap-4 mt-10">
                <div
                  className="
                    w-14
                    h-14
                    rounded-full
                    bg-[#165233]
                    text-white
                    flex
                    items-center
                    justify-center
                    font-semibold
                    text-lg
                  "
                >
                  {item.name[0]}
                </div>

                <div>
                  <p className="text-[#222] font-medium">{item.name}</p>

                  <p className="text-[#6B7280] text-sm">{item.city}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CSS */}

      <style jsx>{`
        .marquee-track {
          width: max-content;
          animation: marquee 28s linear infinite;
        }

        .marquee-track:hover {
          animation-play-state: paused;
        }

        @keyframes marquee {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}
