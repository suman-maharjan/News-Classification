"use client";

import { TCreateNewsForm } from "@/lib/form/newsForm";
import { useCreateNews } from "@/services/newsService";
import NewsForm from "../(_components)/NewsForm";

export default function CreateNewsAdmin() {
  const createNews = useCreateNews();

  const onSubmit = (data: TCreateNewsForm) => {
    console.log("clicking");
    createNews.mutate(data, {
      onSuccess: () => {
        // form.reset();
      },
    });
    console.log("FORM DATA:", data);
  };

  return <NewsForm formTitle="Create News" onSubmit={onSubmit} />;
}
