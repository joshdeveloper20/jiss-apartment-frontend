// filepath: client/src/components/skeletons/RoomCardSkeleton.jsx

const Skeleton = ({ className = "" }) => (
  <div className={`skeleton ${className}`} />
);

export function RoomCardSkeleton() {
  return (
    <article className="w-full bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col sm:flex-row">
      {/* Thumbnail */}
      <Skeleton className="w-full h-48 sm:w-56 sm:h-auto sm:shrink-0 rounded-none" />

      {/* Content */}
      <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between gap-4">
        {/* Title + rating */}
        <div className="flex items-start justify-between gap-3">
          <Skeleton className="h-6 w-36 sm:w-44" />
          <Skeleton className="h-5 w-12 rounded-full shrink-0" />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-2/3" />
        </div>

        {/* Meta: bed / guests / sqm */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded-sm shrink-0" />
            <Skeleton className="h-4 w-16" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded-sm shrink-0" />
            <Skeleton className="h-4 w-20" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded-sm shrink-0" />
            <Skeleton className="h-4 w-14" />
          </div>
        </div>

        {/* Price + CTA buttons */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <Skeleton className="h-3 w-24 mb-2" />
            <Skeleton className="h-7 w-32" />
          </div>
          <div className="flex flex-col xs:flex-row sm:flex-row gap-3">
            <Skeleton className="h-10 w-full xs:w-32 sm:w-32 rounded-full" />
            <Skeleton className="h-10 w-full xs:w-40 sm:w-40 rounded-full" />
          </div>
        </div>
      </div>
    </article>
  );
}

export default function RoomCardSkeletonList({ count = 3 }) {
  return (
    <div className="max-w-4xl mx-auto space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <RoomCardSkeleton key={index} />
      ))}
    </div>
  );
}
