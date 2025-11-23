"use client";
// Trending Topics Section
export const TrendingSection = () => {
  const trending = [
    { tag: "Climate Summit", count: "2.3K articles" },
    { tag: "AI Innovation", count: "1.8K articles" },
    { tag: "Olympic Games", count: "3.1K articles" },
    { tag: "Space Exploration", count: "1.2K articles" },
    { tag: "Cryptocurrency", count: "2.7K articles" },
    { tag: "Healthcare Reform", count: "1.5K articles" },
  ];

  return (
    <section className="py-20 bg-linear-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="flex items-center gap-2">
              <svg
                className="w-8 h-8 text-red-500 animate-pulse"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <h2 className="text-3xl font-bold text-gray-900">Trending Now</h2>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {trending.map((item, index) => (
              <button
                key={index}
                className="group bg-white hover:bg-blue-600 border-2 border-gray-200 hover:border-blue-600 rounded-full px-6 py-3 transition-all duration-300 shadow-sm hover:shadow-lg"
              >
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-900 group-hover:text-white transition-colors">
                    #{item.tag}
                  </span>
                  <span className="text-sm text-gray-500 group-hover:text-blue-100 transition-colors">
                    {item.count}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
