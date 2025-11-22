"use client";
import { ENewsType } from "@/types/news.types";
import { TNewsCardProps } from "./NewsCard.types";
import { useRouter } from "next/navigation";

const styling = {
  [ENewsType.NORMAL]: `text-red-700`,
  [ENewsType.BREAKING]: `text-red-700`,
  [ENewsType.TRENDING]: `text-yellow-700`,
  [ENewsType.ALERT]: `text-orange-600`,
  [ENewsType.READ]: `text-slate-700`,
};
export const NewsCard = ({
  id,
  image,
  title,
  description,
  type = ENewsType.NORMAL,
  publishedAt,
  place,
}: TNewsCardProps) => {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.push(`/news/${id}`);
      }}
      className="bg-white shadow rounded-lg overflow-hidden hover:cursor-pointer lg:max-w-lg max-w-full "
    >
      <div className="h-40 bg-gray-200">
        {image && <img src={image} className="w-full h-full object-cover" />}
      </div>

      <div className="p-4">
        {type !== ENewsType.NORMAL && (
          <span
            className={`text-xs font-bold ${styling[type]} uppercase tracking-wide`}
          >
            {type}
          </span>
        )}
        <h3 className="lg:text-3xl md:text-xl text-lg font-semibold text-gray-800 hover:underline">
          {title}
        </h3>
        <p
          className={`text-sm text-gray-600 mt-1 ${
            type == ENewsType.BREAKING ? "" : "hidden"
          } md:block`}
        >
          {description}
        </p>
        <p className="text-xs text-gray-400 my-1">
          {publishedAt ? publishedAt + " | " : ""}
          {place ?? ""}
        </p>
      </div>
    </div>
  );
};
