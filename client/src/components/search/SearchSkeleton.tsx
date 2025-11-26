
const SearchSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden animate-pulse">
      {/* Header Skeleton */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <div className="h-6 bg-gray-200 rounded w-48"></div>
          <div className="h-4 bg-gray-200 rounded w-24"></div>
        </div>
      </div>

      {/* Grid Skeleton */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              {/* Candidate Header */}
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-5 bg-gray-300 rounded w-32 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-24"></div>
                </div>
              </div>

              {/* Skills */}
              <div className="mb-4">
                <div className="h-4 bg-gray-300 rounded w-20 mb-2"></div>
                <div className="flex flex-wrap gap-1">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-6 bg-gray-300 rounded w-16"></div>
                  ))}
                </div>
              </div>

              {/* Match Percentage */}
              <div className="h-4 bg-gray-300 rounded w-24 mb-4"></div>

              {/* Action Buttons */}
              <div className="flex justify-between">
                <div className="h-8 bg-gray-300 rounded w-8"></div>
                <div className="h-8 bg-gray-300 rounded w-8"></div>
                <div className="h-8 bg-gray-300 rounded w-8"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchSkeleton;