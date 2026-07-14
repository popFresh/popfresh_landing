const OrderCardSkeleton = () => {
  return (
    <div className="space-y-8">
      {[1, 2].map((item) => (
        <div
          key={item}
          className="
            overflow-hidden
            rounded-[32px]
            bg-white
            p-8
            shadow-sm
            animate-pulse
          "
        >
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            {/* Left */}

            <div className="flex-1">
              <div className="h-4 w-28 rounded bg-[#E9E3D8]" />

              <div className="mt-4 h-8 w-72 rounded bg-[#E9E3D8]" />

              <div className="mt-6 h-4 w-48 rounded bg-[#E9E3D8]" />
            </div>

            {/* Right */}

            <div className="flex flex-col items-start gap-5 lg:items-end">
              <div className="h-10 w-32 rounded-full bg-[#E9E3D8]" />

              <div className="h-12 w-48 rounded-full bg-[#E9E3D8]" />
            </div>
          </div>

          {/* Preview */}

          <div className="mt-10 border-t border-[#F2F4F7] pt-8">
            <div className="h-4 w-40 rounded bg-[#E9E3D8]" />

            <div className="mt-6 space-y-5">
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-[#E9E3D8]" />

                <div className="h-4 w-52 rounded bg-[#E9E3D8]" />
              </div>

              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-[#E9E3D8]" />

                <div className="h-4 w-44 rounded bg-[#E9E3D8]" />
              </div>

              <div className="h-4 w-28 rounded bg-[#E9E3D8]" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderCardSkeleton;