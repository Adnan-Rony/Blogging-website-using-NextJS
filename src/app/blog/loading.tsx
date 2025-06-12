"use client"
export default function Loading() {
  return (
    <div className="max-w-screen-xl mx-auto py-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-4 px-4 space-y-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-xl shadow-md p-4 animate-pulse overflow-hidden lg:h-[510px]"
        >
          <div className="bg-gray-300 rounded-xl w-full lg:h-56 mb-4"></div>
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              <div className="bg-blue-200 rounded-full h-6 w-16"></div>
              <div className="bg-blue-200 rounded-full h-6 w-12"></div>
              <div className="bg-blue-200 rounded-full h-6 w-20"></div>
            </div>
            <div className="h-6 bg-gray-300 rounded w-3/4"></div>
            <div className="flex gap-4 text-sm text-gray-400">
              <div className="h-4 bg-gray-300 rounded w-16"></div>
              <div className="h-4 bg-gray-300 rounded w-10"></div>
            </div>
            <div className="h-12 bg-gray-300 rounded w-full"></div>
            <div className="h-8 w-28 border border-blue-200 rounded-3xl"></div>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
}
