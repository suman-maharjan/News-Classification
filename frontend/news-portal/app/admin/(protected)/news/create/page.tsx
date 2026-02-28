"use client";

import { TCreateNewsForm } from "@/lib/form/newsForm";
import { useCreateNews } from "@/services/newsService";
import NewsForm from "../(_components)/NewsForm";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function CreateNewsAdmin() {
  const createNews = useCreateNews();
  const router = useRouter();

  const onSubmit = (data: TCreateNewsForm) => {
    createNews.mutate(data, {
      onSuccess: () => {
        toast.info("News Added");
        router.push("/admin/news");
      },
    });
  };

  return <NewsForm formTitle="Create News" onSubmit={onSubmit} />;
}
