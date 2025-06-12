"use client"

const loading = () => {
  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8 animate-pulse">
        <main className="bg-white lg:col-span-2 px-4 py-8 rounded-xl shadow-sm">
          <div className="space-y-3 mb-6">
            <div className="h-8 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-1/3" />
          </div>

          <div className="h-64 bg-gray-300 rounded mb-6" />

          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-5/6" />
            <div className="h-4 bg-gray-200 rounded w-4/6" />
            <div className="h-4 bg-gray-200 rounded w-2/3" />
          </div>

          <hr className="my-10 border-gray-200" />

          <div className="h-8 bg-gray-200 rounded w-1/2" />
        </main>

        <aside className="lg:col-span-1">
          <div className="sticky top-8 space-y-6">
            <div className="bg-white p-4 rounded-lg shadow-md space-y-4">
              <div className="h-5 bg-gray-200 rounded w-2/3" />
              <ul className="space-y-3">
                <li className="h-3 bg-gray-200 rounded w-full" />
                <li className="h-3 bg-gray-200 rounded w-5/6" />
                <li className="h-3 bg-gray-200 rounded w-3/4" />
                <li className="h-3 bg-gray-200 rounded w-2/3" />
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default loading;
