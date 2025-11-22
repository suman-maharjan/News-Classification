import { NewsCard } from "@/components/cards/NewsCard";
import PageSection from "@/components/section/PageSection";
import { NewsData } from "@/data/NewsData";
import { INews } from "@/types/news.types";

const HeroSection = () => {
  return (
    <PageSection className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 md:gap-4">
      {NewsData.map((news: INews, index: number) => {
        return (
          <NewsCard
            key={index}
            id={news.id}
            title={news.title}
            image={news.image}
            type={news.type}
            publishedAt={news.publishedAt}
            place={news.place}
            description={news.description}
          />
        );
      })}
    </PageSection>
  );
};

export default HeroSection;
