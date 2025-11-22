"use client";

import { TCreateNewsForm } from "@/lib/form/newsForm";
import {
  useCreateNews,
  useEditNewsById,
  useGetNewsById,
} from "@/services/newsService";
import NewsForm from "../../(_components)/NewsForm";
import { useParams } from "next/navigation";

export default function EditNewsAdmin() {
  const params: { id: string } = useParams();
  const { data: news, isLoading } = useGetNewsById(params.id);
  const editNews = useEditNewsById();

  if (isLoading) {
    return <p>Loading</p>;
  }

  const onSubmit = (data: TCreateNewsForm) => {
    console.log("clicking");
    editNews.mutate(
      { id: params.id, data },
      {
        onSuccess: () => {
          console.log("edited successfylly");
          // form.reset();
        },
      }
    );
    console.log("FORM DATA:", data);
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <NewsForm
        formTitle="Create News"
        onSubmit={onSubmit}
        defaultValue={news}
      />
    </div>
  );
}
