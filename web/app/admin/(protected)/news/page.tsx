"use client";
import PageSection from "@/components/section/PageSection";
import NewsTable from "@/components/tables/NewsTable";
import { Button } from "@/components/ui/button";
import { useGetAllNews } from "@/services/newsService";
import { useRouter } from "next/navigation";

const AdminNewsPage = () => {
  const router = useRouter();

  return (
    <PageSection>
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold mb-4">Welcome to News Managment</h1>
        <Button onClick={() => router.push("/admin/news/create")}>
          Add News
        </Button>
      </div>
      <NewsTable />
    </PageSection>
  );
};

export default AdminNewsPage;
