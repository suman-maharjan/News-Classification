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

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <NewsForm formTitle="Create News" onSubmit={onSubmit} />
    </div>
  );
}
