import PageSection from "@/components/section/PageSection";
import { NewsData } from "@/data/NewsData";
import NewsDetail from "./(_components)/NewsDetail";

type TParams = {
  id: string;
};

const NewsDetailPage = async ({ params }: { params: Promise<TParams> }) => {
  const { id } = await params;

  const news = NewsData.find((news) => news.id.toString() === id);

  if (!news) {
    return <p>No News Found</p>;
  }
  return (
    <PageSection>
      <NewsDetail {...news} />
    </PageSection>
  );
};

export default NewsDetailPage;
