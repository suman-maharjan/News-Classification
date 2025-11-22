"use client";
import { NewsCard } from "@/components/cards/NewsCard";
import PageSection from "@/components/section/PageSection";
import { useGetAllNews } from "@/services/newsService";
import { INews } from "@/types/news.types";

const HeroSection = () => {
  const { data: newsData, isLoading } = useGetAllNews();

  if (isLoading) {
    return <>Loading...</>;
  }
  return (
    <PageSection className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 md:gap-4">
      {newsData?.map((news: INews, index: number) => {
        const date = new Date(news.publishedAt).toLocaleDateString();
        return (
          <NewsCard
            key={index}
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
    </PageSection>
  );
};

export default HeroSection;
