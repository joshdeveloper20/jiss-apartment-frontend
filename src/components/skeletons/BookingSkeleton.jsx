// filepath: client/src/components/skeletons/BookingSkeleton.jsx

const Skeleton = ({ className = "" }) => (
  <div className={`skeleton ${className}`} />
);

export default function BookingSkeleton() {
  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between mb-6 sm:mb-8">
          <div className="space-y-2">
            <Skeleton className="h-7 w-40 sm:h-9 sm:w-56" />
            <Skeleton className="h-3 w-64 sm:h-4 sm:w-96" />
          </div>
          <Skeleton className="h-10 w-32 rounded-full self-start sm:shrink-0" />
        </div>

        {/* Body */}
        <div className="flex flex-col lg:flex-row gap-5 lg:gap-6">
          {/* Form card */}
          <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-8 space-y-5 sm:space-y-6">
            {/* Select room */}
            <div>
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-11 w-full rounded-xl" />
            </div>

            {/* Check-in / Check-out */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Skeleton className="h-4 w-20 mb-2" />
                <Skeleton className="h-11 w-full rounded-xl" />
              </div>
              <div>
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-11 w-full rounded-xl" />
              </div>
            </div>

            {/* Guest name */}
            <div>
              <Skeleton className="h-4 w-28 mb-2" />
              <Skeleton className="h-11 w-full rounded-xl" />
            </div>

            {/* Email / Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Skeleton className="h-4 w-14 mb-2" />
                <Skeleton className="h-11 w-full rounded-xl" />
              </div>
              <div>
                <Skeleton className="h-4 w-16 mb-2" />
                <Skeleton className="h-11 w-full rounded-xl" />
              </div>
            </div>

            {/* Payment method */}
            <div>
              <Skeleton className="h-4 w-36 mb-2" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Skeleton className="h-11 w-full rounded-xl" />
                <Skeleton className="h-11 w-full rounded-xl" />
              </div>
            </div>

            {/* Special requests */}
            <div>
              <Skeleton className="h-4 w-32 mb-2" />
              <Skeleton className="h-28 w-full rounded-xl" />
            </div>

            {/* CTA */}
            <Skeleton className="h-12 w-full rounded-full" />
          </div>

          {/* Summary sidebar */}
          <div className="w-full lg:w-80 lg:shrink-0 space-y-4">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6">
              <Skeleton className="h-6 w-48 mb-2" />
              <Skeleton className="h-4 w-full mb-5" />

              {/* Selected room / dates / nights / payment */}
              <div className="space-y-3 border border-gray-100 rounded-xl p-4 mb-4">
                <div className="flex justify-between items-center">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-4 w-12" />
                </div>
                <div className="flex justify-between items-center">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <div className="flex justify-between items-center">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <div className="flex justify-between items-center">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-6" />
                </div>
                <div className="flex justify-between items-center">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>

              {/* Totals */}
              <div className="space-y-3 border border-gray-100 rounded-xl p-4">
                <div className="flex justify-between items-center">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-10" />
                </div>
                <div className="flex justify-between items-center">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-10" />
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                  <Skeleton className="h-5 w-12" />
                  <Skeleton className="h-5 w-10" />
                </div>
              </div>
            </div>

            {/* Booked dates */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6">
              <Skeleton className="h-5 w-32 mb-3" />
              <Skeleton className="h-4 w-56" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
