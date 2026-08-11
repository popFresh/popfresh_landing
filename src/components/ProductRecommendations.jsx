import { Link } from "react-router-dom";
import ProductImageSlider from "./ProductImageSlider";

export default function ProductRecommendations({
  products = [],
  label = "YOU MAY ALSO LIKE",
  title = "Customers Also Bought",
  description = "Explore more delicious flavours from PopFresh.",
}) {
  if (!products.length) {
    return null;
  }

  return (
    <section className="max-w-7xl mx-auto px-5 lg:px-8">

      {/* Section Header */}

      <div className="mb-12 text-center">

        <span
          className="
            inline-flex
            rounded-full
            bg-[#E9E3D8]
            px-5
            py-2
            text-[#174C35]
            text-xs
            tracking-[0.18em]
            font-medium
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

      {/* Products */}

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

        {products.map((item) => {

          const outOfStock = item.stock <= 0;

          return (
            <Link
              key={item.id}
              to={
                !outOfStock
                  ? `/products/${item.slug}`
                  : "#"
              }
              onClick={(e) => {
                if (outOfStock) {
                  e.preventDefault();
                }
              }}
              className={`
                group
                flex
                flex-col
                overflow-hidden
                rounded-[32px]
                transition-all
                duration-300

                ${
                  !outOfStock
                    ? "hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]"
                    : "cursor-not-allowed opacity-90"
                }
              `}
              style={{
                background: item.theme.background,
              }}
            >

              {/* Badge */}

              <div className="p-6 pb-0">

                <span
                  className="
                    inline-flex
                    rounded-full
                    px-4
                    py-2
                    text-white
                    text-[11px]
                    tracking-[0.15em]
                    font-medium
                  "
                  style={{
                    background: item.theme.accent,
                  }}
                >
                  {item.badge || "POPFRESH"}
                </span>

              </div>

              {/* Image */}

              <div className="px-6 pt-6">

                <div
                  className="
                    overflow-hidden
                    rounded-[24px]
                    bg-white/40
                  "
                >

                  <div
                    className="
                      relative
                      overflow-hidden
                      rounded-[24px]
                      bg-white/40
                    "
                  >

                    <ProductImageSlider
                      images={item.images}
                      title={item.title}
                    />

                    {/* Out Of Stock Overlay */}

                    {outOfStock && (
                      <div
                        className="
                          absolute
                          inset-0
                          flex
                          items-center
                          justify-center
                          bg-black/45
                          backdrop-blur-sm
                        "
                      >
                        <span
                          className="
                            rounded-full
                            bg-red-600
                            px-5
                            py-2
                            text-sm
                            font-bold
                            text-white
                          "
                        >
                          OUT OF STOCK
                        </span>
                      </div>
                    )}

                  </div>

                </div>

              </div>

              {/* Content */}

              <div className="flex flex-col flex-1 p-6">

                <h3
                  className="
                    text-[#174C35]
                    text-2xl
                    leading-tight
                  "
                  style={{
                    fontFamily: "Fraunces, serif",
                  }}
                >
                  {item.title}
                </h3>

                <p
                  className="
                    mt-4
                    text-[#667085]
                    leading-7
                    flex-1
                  "
                >
                  {item.shortDescription}
                </p>

                {/* Highlights */}

                <div className="flex flex-wrap gap-2 mt-5">

                  {item.highlights
                    ?.slice(0, 3)
                    .map((tag) => (
                      <span
                        key={tag}
                        className="
                          rounded-full
                          bg-white
                          px-3
                          py-1
                          text-sm
                          text-[#174C35]
                        "
                      >
                        {tag}
                      </span>
                    ))}

                </div>

                {/* Price */}

                <div className="mt-6 flex items-center gap-3">

                  <span
                    className="text-3xl font-bold"
                    style={{
                      color: item.theme.text,
                    }}
                  >
                    ₹{item.sellingPrice}
                  </span>

                  <span
                    className="
                      text-lg
                      line-through
                      text-gray-400
                    "
                  >
                    ₹{item.mrp}
                  </span>

                </div>

                {/* CTA */}

                <button
                  disabled={outOfStock}
                  className={`
                    mt-7
                    w-full
                    rounded-full
                    py-4
                    font-semibold
                    transition-all
                    duration-300

                    ${
                      outOfStock
                        ? "bg-gray-400 text-white cursor-not-allowed"
                        : "text-white"
                    }
                  `}
                  style={
                    !outOfStock
                      ? {
                          background:
                            item.theme.accent,
                        }
                      : {}
                  }
                >
                  {outOfStock
                    ? "Out of Stock"
                    : "View Product"}
                </button>

              </div>

            </Link>
          );
        })}

      </div>

    </section>
  );
}