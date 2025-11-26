"use client";
import { NewsCard } from "@/components/cards/NewsCard";
import { Button } from "@/components/ui/button";
import { capitalizeFirstLetter } from "@/lib/stringFunctions";
import { useInfiniteNews } from "@/services/newsService";
import { ENewsCategory, INews } from "@/types/news.types";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const LatestPage = () => {
  const searchParams = useSearchParams();
  const rawCategory = searchParams.get("category");
  const searchParamCategory = rawCategory
    ? (capitalizeFirstLetter(rawCategory) as ENewsCategory)
    : undefined;

  const [filter, setFilter] = useState<"all" | ENewsCategory>(
    searchParamCategory || "all"
  );

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteNews({
      category: filter === "all" ? undefined : filter,
      sortOrder: "desc",
    });

  const allNews = data?.pages.flatMap((page) => page.data) ?? [];

  const filters = [
    { label: "All News", value: "all" },
    { label: "Sport", value: ENewsCategory.SPORT },
    { label: "Business", value: ENewsCategory.BUSINESS },
    { label: "Technology", value: ENewsCategory.TECHNOLOGY },
    { label: "Politics", value: ENewsCategory.POLITICS },
    { label: "Entertainment", value: ENewsCategory.ENTERTAINMENT },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="relative w-16 h-16 mx-auto">
            <div className="absolute inset-0 border-4 border-blue-200 rounded-full" />
            <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin" />
          </div>
          <p className="text-gray-600 font-medium">Loading latest news...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              <span className="text-sm font-semibold">LIVE UPDATES</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Latest News</h1>
            <p className="text-xl text-blue-100">
              Stay up to date with breaking stories and trending topics from
              around the world
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div className="flex flex-wrap gap-3">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value as any)}
                className={`px-6 py-2.5 rounded-full font-semibold transition-all duration-300 ${
                  filter === f.value
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg scale-105"
                    : "bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-300 hover:text-blue-600"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-8">
          <p className="text-gray-600">
            Showing{" "}
            <span className="font-bold text-gray-900">
              {allNews?.length || 0}
            </span>{" "}
            articles
            {data?.pages[0]?.pagination?.total && (
              <>
                {" "}
                of{" "}
                <span className="font-bold text-gray-900">
                  {data.pages[0].pagination.total}
                </span>{" "}
                total
              </>
            )}
          </p>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {allNews?.map((news: INews) => {
            const date = new Date(news.publishedAt).toLocaleDateString(
              "en-US",
              {
                month: "short",
                day: "numeric",
                year: "numeric",
              }
            );
            return (
              <NewsCard
                key={news._id}
                id={news._id}
                title={news.title}
                image={news.image}
                type={news.type}
                publishedAt={date}
                place={news.place}
                description={news.description}
              />
            );
          })}
        </div>

        {/* Load More Button */}
        {hasNextPage && (
          <div className="mt-12 text-center">
            <Button
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-8 py-6 shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isFetchingNextPage ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Loading More...</span>
                </div>
              ) : (
                <span>Load More Articles</span>
              )}
            </Button>
          </div>
        )}

        {/* End Message */}
        {!hasNextPage && allNews.length > 0 && (
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 text-gray-500">
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
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="font-medium">You've reached the end</span>
            </div>
          </div>
        )}

        {/* Empty State */}
        {allNews.length === 0 && (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No articles found
            </h3>
            <p className="text-gray-600">
              Try adjusting your filters or check back later
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LatestPage;
