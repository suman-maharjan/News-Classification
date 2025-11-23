"use client";
import { NewsCard } from "@/components/cards/NewsCard";
import PageSection from "@/components/section/PageSection";
import Spinner from "@/components/spinner/Spinner";
import { useGetAllNews } from "@/services/newsService";
import { INews } from "@/types/news.types";

const HeroSection = () => {
  const { data: newsData, isLoading } = useGetAllNews();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white">
      <PageSection className="py-12">
        {/* Section Header */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Latest News
          </h1>
          <p className="text-gray-600 text-lg">
            Stay informed with the most recent updates and stories
          </p>
          <div className="mt-4 h-1 w-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full" />
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {newsData?.map((news: INews, index: number) => {
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
                key={news._id || index}
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

        {/* Empty State */}
        {newsData && newsData.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
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
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No news available
            </h3>
            <p className="text-gray-600">Check back later for updates</p>
          </div>
        )}
      </PageSection>
    </div>
  );
};

export default HeroSection;
