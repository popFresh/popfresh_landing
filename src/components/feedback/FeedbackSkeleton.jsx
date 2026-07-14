const FeedbackSkeleton = () => {
  return (
    <div
      className="
        animate-pulse
        rounded-[32px]
        bg-white
        p-8
        shadow-sm
      "
    >
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        {/* Left */}

        <div className="flex-1">
          <div className="h-4 w-28 rounded bg-gray-200" />

          <div className="mt-4 h-8 w-72 rounded bg-gray-200" />

          <div className="mt-6 h-4 w-48 rounded bg-gray-200" />
        </div>

        {/* Right */}

        <div className="flex flex-col items-start gap-5 lg:items-end">
          <div className="h-10 w-32 rounded-full bg-gray-200" />

          <div className="h-12 w-44 rounded-full bg-gray-200" />
        </div>
      </div>
    </div>
  );
};

export default FeedbackSkeleton;