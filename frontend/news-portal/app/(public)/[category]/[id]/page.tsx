"use client";
import PageSection from "@/components/section/PageSection";
import { useGetNewsById } from "@/services/newsService";
import { useParams } from "next/navigation";
import NewsDetail from "./(_components)/NewsDetail";

type TParams = {
  id: string;
};

const NewsDetailPage = () => {
  const params: TParams = useParams();

  const { data: news } = useGetNewsById(params.id);

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
