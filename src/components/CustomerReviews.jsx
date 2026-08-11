import { Star } from "lucide-react";

export default function CustomerReviews({
  reviews = [],
  label = "CUSTOMER LOVE",
  title = "Loved By Snackers",
  description = "Thousands of happy crunches across India.",
}) {
  if (!reviews.length) {
    return null;
  }

  return (
    <section
      className="
        mt-28
        relative
        left-1/2
        right-1/2
        -ml-[50vw]
        -mr-[50vw]
        w-screen
        overflow-hidden
      "
    >

      {/* Section Header */}

      <div className="text-center mb-12">

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
          {label}
        </span>

        <h2
          className="
            mt-5
            text-[#174C35]
            text-4xl
            md:text-5xl
          "
          style={{
            fontFamily: "Fraunces, serif",
          }}
        >
          {title}
        </h2>

        <p className="mt-4 text-[#667085]">
          {description}
        </p>

      </div>

      {/* Reviews Marquee */}

      <div
        className="
          flex
          gap-6
          animate-[marquee_30s_linear_infinite]
          w-max
          px-6
        "
      >

        {[...reviews, ...reviews].map(
          (review, index) => (
            <article
              key={`${review.name}-${index}`}
              className="
                w-[280px]
                md:w-[330px]
                rounded-[30px]
                bg-white
                p-8
                border
                border-[#ECE7DB]
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-2
                hover:shadow-xl
              "
            >

              {/* Stars */}

              <div
                className="
                  flex
                  gap-1
                  text-[#E4C06A]
                  mb-5
                "
              >
                {[...Array(5)].map(
                  (_, starIndex) => (
                    <Star
                      key={starIndex}
                      size={18}
                      fill="currentColor"
                    />
                  )
                )}
              </div>

              {/* Review */}

              <p
                className="
                  text-[#174C35]
                  text-lg
                  leading-8
                "
              >
                "{review.text}"
              </p>

              {/* Customer */}

              <div className="mt-8">

                <h4
                  className="
                    font-semibold
                    text-[#174C35]
                  "
                >
                  {review.name}
                </h4>

                <span
                  className="
                    text-[#667085]
                    text-sm
                  "
                >
                  {review.city}
                </span>

              </div>

            </article>
          )
        )}

      </div>

    </section>
  );
}