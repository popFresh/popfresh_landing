import {
  Leaf,
  Award,
  Flame,
  Sprout,
  HeartPulse,
  Clock3,
  ShieldCheck,
} from "lucide-react";

const features = [
  {
    icon: Leaf,
    title: "Healthy Ingredients",
    description: "Clean labels. Real food. No nasties.",
  },
  {
    icon: Award,
    title: "Premium Quality",
    description: "Hand-picked, sorted and roasted to perfection.",
  },
  {
    icon: Flame,
    title: "Roasted Not Fried",
    description: "Slow roasted for the perfect crunch.",
  },
  {
    icon: Sprout,
    title: "Farm Fresh Sourcing",
    description: "Direct from trusted Bihar farms.",
  },
  {
    icon: HeartPulse,
    title: "Balanced Nutrition",
    description: "Protein, fibre and antioxidants in every bite.",
  },
  {
    icon: Clock3,
    title: "Everyday Snacking",
    description: "Office, gym, travel — wherever cravings strike.",
  },
];

export default function WhyChoose() {
  return (
    <section className="bg-[#F6F3EC] py-24 px-6">
      <div className="max-w-6xl mx-auto">
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
            <ShieldCheck size={15} />
            OUR PROMISE
          </div>
        </div>

        {/* Heading */}

        <div className="text-center mt-7">
          <h2
            className="
              text-[#165233]
              text-4xl
              md:text-5xl
              leading-tight
            "
            style={{ fontFamily: "serif" }}
          >
            Why Choose Pop Fresh?
          </h2>

          <p className="mt-4 text-[#6B7280] text-base max-w-xl mx-auto">
            We obsess over every detail so you can snack without
            second-guessing.
          </p>
        </div>

        {/* Cards */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-16">
          {features.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="
                  group
                  bg-[#FBFAF7]
                  border
                  border-[#E3DDD3]
                  rounded-[30px]
                  p-8
                  min-h-[190px]
                  transition-all
                  duration-300
                  hover:-translate-y-1.5
                  hover:border-[#D3C8B6]
                  hover:shadow-[0_15px_30px_rgba(0,0,0,0.04)]
                "
              >
                {/* Icon */}

                <div
                  className="
                    w-14
                    h-14
                    rounded-full
                    bg-[#E5ECE5]
                    text-[#165233]
                    flex
                    items-center
                    justify-center
                    mb-7
                    transition-all
                    duration-300
                    group-hover:bg-[#165233]
                    group-hover:text-white
                  "
                >
                  <Icon size={24} strokeWidth={1.8} />
                </div>

                {/* Title */}

                <h3
                  className="
                    text-[#1E1E1E]
                    text-[2rem]
                    leading-tight
                  "
                  style={{ fontFamily: "serif" }}
                >
                  {item.title}
                </h3>

                {/* Description */}

                <p className="mt-4 text-[#6B7280] text-base leading-7">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
