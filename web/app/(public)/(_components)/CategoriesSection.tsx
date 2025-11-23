"use client";

// Categories Section
export const CategoriesSection = () => {
  const categories = [
    {
      name: "Politics",
      icon: "🏛️",
      color: "from-red-500 to-pink-500",
      count: 1234,
    },
    {
      name: "Technology",
      icon: "💻",
      color: "from-blue-500 to-cyan-500",
      count: 2341,
    },
    {
      name: "Sports",
      icon: "⚽",
      color: "from-green-500 to-emerald-500",
      count: 1876,
    },
    {
      name: "Business",
      icon: "💼",
      color: "from-purple-500 to-indigo-500",
      count: 1543,
    },
    {
      name: "Entertainment",
      icon: "🎬",
      color: "from-yellow-500 to-orange-500",
      count: 2109,
    },
    {
      name: "Health",
      icon: "🏥",
      color: "from-teal-500 to-cyan-500",
      count: 987,
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Explore by Category
          </h2>
          <p className="text-xl text-gray-600">
            Discover news that matters to you
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-2xl bg-linear-to-br p-0.5 hover:scale-105 transition-transform duration-300">
                <div
                  className={`absolute inset-0 bg-linear-to-br ${category.color}`}
                />
                <div className="relative bg-white rounded-2xl p-6 h-full flex flex-col items-center justify-center text-center space-y-3">
                  <div className="text-4xl">{category.icon}</div>
                  <h3 className="font-bold text-gray-900">{category.name}</h3>
                  <p className="text-sm text-gray-500">
                    {category.count} articles
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
