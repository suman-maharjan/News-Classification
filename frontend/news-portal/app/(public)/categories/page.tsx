import { Button } from "@/components/ui/button";

const CategoriesPage = () => {
  const categories = [
    {
      name: "Politics",
      description: "Political news, elections, and government updates",
      icon: "🏛️",
      color: "from-red-500 to-pink-600",
      bgColor: "bg-red-50",
      count: 1234,
      image:
        "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800",
    },
    {
      name: "Technology",
      description: "Latest in tech, AI, gadgets, and innovation",
      icon: "💻",
      color: "from-blue-500 to-cyan-600",
      bgColor: "bg-blue-50",
      count: 2341,
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800",
    },
    {
      name: "Sports",
      description: "Sports news, scores, and athlete updates",
      icon: "⚽",
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-green-50",
      count: 1876,
      image:
        "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800",
    },
    {
      name: "Business",
      description: "Markets, economy, and business insights",
      icon: "💼",
      color: "from-purple-500 to-indigo-600",
      bgColor: "bg-purple-50",
      count: 1543,
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800",
    },
    {
      name: "Entertainment",
      description: "Movies, music, celebrities, and pop culture",
      icon: "🎬",
      color: "from-yellow-500 to-orange-600",
      bgColor: "bg-yellow-50",
      count: 2109,
      image:
        "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      {/* Hero Header */}
      <div className="bg-linear-to-br from-slate-900 via-blue-900 to-indigo-900 text-white py-20 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full mb-4">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold">
              Browse by Category
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Explore news topics that interest you most. From politics to
              entertainment, find stories that matter.
            </p>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-2xl bg-white border-2 border-gray-100 hover:border-transparent hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                {/* Gradient Border on Hover */}
                <div
                  className={`absolute inset-0 bg-linear-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl`}
                />

                {/* Image Header */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />

                  {/* Icon Badge */}
                  <div className="absolute top-4 left-4">
                    <div
                      className={`w-14 h-14 ${category.bgColor} rounded-full flex items-center justify-center text-2xl shadow-lg`}
                    >
                      {category.icon}
                    </div>
                  </div>

                  {/* Article Count */}
                  <div className="absolute bottom-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-bold text-gray-900">
                      {category.count} articles
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <h3
                    className={`text-2xl font-bold bg-linear-to-r ${category.color} bg-clip-text text-transparent group-hover:scale-105 transition-transform inline-block`}
                  >
                    {category.name}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {category.description}
                  </p>

                  {/* Explore Button */}
                  <div className="pt-4">
                    <button className="flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-3 transition-all">
                      Explore {category.name}
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* All Categories CTA */}
        <div className="mt-16 text-center">
          <div className="bg-linear-to-r from-blue-600 to-indigo-600 rounded-2xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">
              Can't find what you're looking for?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Use our advanced search to discover articles on any topic
            </p>
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-6 shadow-xl hover:shadow-2xl transition-all text-lg"
            >
              Advanced Search
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CategoriesPage;
