export default function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden animate-pulse">
      
      {/* IMAGE */}
      <div className="h-48 bg-gray-200"></div>

      {/* BODY */}
      <div className="p-4 space-y-3">
        
        {/* Title */}
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>

        {/* Description */}
        <div className="h-3 bg-gray-200 rounded w-full"></div>
        <div className="h-3 bg-gray-200 rounded w-5/6"></div>

        {/* Artisan */}
        <div className="flex items-center gap-2 mt-3">
          <div className="w-7 h-7 bg-gray-200 rounded-full"></div>
          <div className="space-y-1">
            <div className="h-3 bg-gray-200 rounded w-20"></div>
            <div className="h-2 bg-gray-200 rounded w-32"></div>
          </div>
        </div>

        {/* Price + Button */}
        <div className="flex justify-between items-center pt-3">
          <div className="h-4 bg-gray-200 rounded w-16"></div>
          <div className="h-6 bg-gray-200 rounded w-20"></div>
        </div>

      </div>
    </div>
  );
}