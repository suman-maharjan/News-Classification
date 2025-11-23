"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

// Featured Hero Section with Large Card
export const FeaturedHeroSection = () => {
  const router = useRouter();

  const featuredNews = {
    id: "1",
    title: "Breaking: Major Scientific Breakthrough Announced",
    description:
      "Scientists have made a groundbreaking discovery that could revolutionize the way we approach renewable energy and climate change.",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200",
    category: "Science",
    date: "Nov 23, 2025",
    readTime: "5 min read",
  };

  return (
    <section className="relative bg-linear-to-br from-slate-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
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

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 rounded-full px-4 py-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
              <span className="text-sm font-semibold">BREAKING NEWS</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Stay Ahead with
              <span className="block bg-linear-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Real-Time Updates
              </span>
            </h1>

            <p className="text-xl text-blue-100 leading-relaxed">
              Get instant access to breaking news, in-depth analysis, and
              stories that matter. Your trusted source for global events.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                onClick={() => router.push("/news")}
                className="bg-white text-blue-900 hover:bg-blue-50 font-semibold px-8 py-6 text-lg shadow-2xl hover:shadow-white/20 transition-all transform hover:scale-105"
              >
                Explore News
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-8 border-t border-white/20">
              <div>
                <div className="text-3xl font-bold">50K+</div>
                <div className="text-blue-200 text-sm">Articles</div>
              </div>
              <div>
                <div className="text-3xl font-bold">1M+</div>
                <div className="text-blue-200 text-sm">Readers</div>
              </div>
              <div>
                <div className="text-3xl font-bold">24/7</div>
                <div className="text-blue-200 text-sm">Coverage</div>
              </div>
            </div>
          </div>

          {/* Featured Card */}
          <div
            className="relative group cursor-pointer"
            onClick={() => router.push(`/news/${featuredNews.id}`)}
          >
            <div className="absolute -inset-1 bg-linear-to-r from-blue-600 to-indigo-600 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition duration-500"></div>
            <div className="relative bg-white rounded-2xl overflow-hidden shadow-2xl transform group-hover:scale-[1.02] transition-all duration-300">
              <div className="relative h-64 overflow-hidden">
                <img
                  src={featuredNews.image}
                  alt={featuredNews.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {featuredNews.category}
                  </span>
                </div>
              </div>
              <div className="p-6 text-gray-900">
                <h3 className="text-2xl font-bold mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {featuredNews.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {featuredNews.description}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{featuredNews.date}</span>
                  <span>{featuredNews.readTime}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
