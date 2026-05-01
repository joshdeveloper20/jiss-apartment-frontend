// filepath: client/src/components/skeletons/RoomDetailSkeleton.jsx

const Skeleton = ({ className = "" }) => (
  <div className={`skeleton ${className}`} />
);

export default function RoomDetailSkeleton() {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Hero image grid */}
        <div className="py-4 sm:py-6">
          {/* Mobile: single image */}
          <Skeleton className="w-full h-56 rounded-2xl sm:hidden" />

          {/* sm+: main + thumbnails */}
          <div className="hidden sm:flex gap-2 h-72 md:h-96 lg:h-[420px]">
            <Skeleton className="flex-[2] rounded-2xl" />
            <div className="flex flex-col gap-2 flex-1">
              <Skeleton className="flex-1 rounded-2xl" />
              <Skeleton className="flex-1 rounded-2xl" />
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-col lg:flex-row gap-8 py-6 sm:py-8">
          {/* Left: Detail content */}
          <div className="flex-1 space-y-8">
            {/* Title & description */}
            <div>
              <Skeleton className="h-7 sm:h-8 w-56 sm:w-64 mb-4" />
              <div className="space-y-2 mb-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
              <Skeleton className="h-4 w-24" />
            </div>

            {/* Stats: 2-col on mobile, 4-col on sm+ */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 py-6 border-y border-gray-100">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <Skeleton className="h-6 w-6 rounded-full" />
                  <Skeleton className="h-3 w-14" />
                  <Skeleton className="h-4 w-20" />
                </div>
              ))}
            </div>

            {/* Amenities: 1-col on mobile, 2-col on sm, 3-col on md+ */}
            <div>
              <Skeleton className="h-6 w-32 mb-5" />
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-4">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Skeleton className="h-4 w-4 shrink-0 rounded-sm" />
                    <Skeleton className="h-4 w-28" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Booking widget */}
          <div className="w-full lg:w-72 lg:shrink-0">
            <div className="border border-gray-200 rounded-2xl p-5 sm:p-6 space-y-5 lg:sticky lg:top-8">
              {/* Price + badge */}
              <div className="flex items-center justify-between">
                <Skeleton className="h-7 sm:h-8 w-32 sm:w-36" />
                <Skeleton className="h-5 w-20 rounded-full" />
              </div>

              {/* Check-in / Check-out */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                <div>
                  <Skeleton className="h-3 w-16 mb-2" />
                  <Skeleton className="h-11 w-full rounded-xl" />
                </div>
                <div>
                  <Skeleton className="h-3 w-20 mb-2" />
                  <Skeleton className="h-11 w-full rounded-xl" />
                </div>
              </div>

              {/* Guests */}
              <div>
                <Skeleton className="h-3 w-14 mb-2" />
                <Skeleton className="h-11 w-full rounded-xl" />
              </div>

              {/* Price breakdown */}
              <div className="space-y-3 pt-2 border-t border-gray-100">
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-8" />
                </div>
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-8" />
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-100">
                  <Skeleton className="h-5 w-12" />
                  <Skeleton className="h-5 w-24" />
                </div>
              </div>

              {/* CTA */}
              <Skeleton className="h-12 w-full rounded-xl" />

              {/* Fine print */}
              <Skeleton className="h-3 w-48 mx-auto" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
