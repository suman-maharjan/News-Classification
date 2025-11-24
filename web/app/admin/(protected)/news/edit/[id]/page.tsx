"use client";

import Spinner from "@/components/spinner/Spinner";
import { TCreateNewsForm } from "@/lib/form/newsForm";
import { useEditNewsById, useGetNewsById } from "@/services/newsService";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import NewsForm from "../../(_components)/NewsForm";

export default function EditNewsAdmin() {
  const params: { id: string } = useParams();
  const { data: news, isLoading } = useGetNewsById(params.id);
  const editNews = useEditNewsById();
  const router = useRouter();

  if (isLoading) {
    return <Spinner />;
  }

  const onSubmit = (data: TCreateNewsForm) => {
    editNews.mutate(
      { id: params.id, data },
      {
        onSuccess: () => {
          toast.info("News Edited successfully");
          router.push("/admin/news");
        },
      }
    );
  };

  return (
    <NewsForm formTitle="Edit News" onSubmit={onSubmit} defaultValue={news} />
  );
}
