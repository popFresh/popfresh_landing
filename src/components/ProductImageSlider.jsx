import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
export default function ProductImageSlider({ images, title }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!images?.length) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images]);

  return (
    <div
  className="
    relative
    overflow-hidden
    rounded-[24px]
    bg-white/40
    h-[280px]
  "
>
  <AnimatePresence mode="wait">
    <motion.img
      key={current}
      src={images[current]}
      alt={title}
      initial={{ x: 40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -40, opacity: 0 }}
      transition={{
        duration: 0.5,
        ease: "easeInOut",
      }}
      className="
        absolute
        inset-0
        w-full
        h-full
        object-cover
      "
    />
  </AnimatePresence>

  {/* Dots */}
  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
    {images.map((_, index) => (
      <div
        key={index}
        className={`
          h-2 rounded-full transition-all duration-300
          ${
            index === current
              ? "w-6 bg-white"
              : "w-2 bg-white/60"
          }
        `}
      />
    ))}
  </div>
</div>
  );
}
