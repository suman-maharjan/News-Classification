"use client";
import { ENewsType } from "@/types/news.types";
import { TNewsCardProps } from "./NewsCard.types";
import { useRouter } from "next/navigation";

const styling = {
  [ENewsType.NORMAL]: {
    badge: "bg-slate-100 text-slate-700",
    accent: "from-slate-500 to-slate-600",
  },
  [ENewsType.BREAKING]: {
    badge: "bg-red-100 text-red-700 animate-pulse",
    accent: "from-red-500 to-red-600",
  },
  [ENewsType.TRENDING]: {
    badge: "bg-yellow-100 text-yellow-700",
    accent: "from-yellow-500 to-yellow-600",
  },
  [ENewsType.ALERT]: {
    badge: "bg-orange-100 text-orange-600",
    accent: "from-orange-500 to-orange-600",
  },
  [ENewsType.READ]: {
    badge: "bg-slate-100 text-slate-500",
    accent: "from-slate-400 to-slate-500",
  },
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
  const styleConfig = styling[type];

  return (
    <div
      onClick={() => {
        router.push(`/news/${id}`);
      }}
      className="group relative bg-white rounded-xl overflow-hidden hover:cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border border-gray-100"
    >
      {/* Image Container */}
      <div className="relative h-48 bg-linear-to-br from-gray-100 to-gray-200 overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <svg
              className="w-16 h-16"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Type Badge */}
        {type !== ENewsType.NORMAL && (
          <div className="absolute top-3 left-3">
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow-lg ${styleConfig.badge}`}
            >
              {type === ENewsType.BREAKING && (
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse" />
              )}
              {type}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-gray-600 transition-colors duration-200">
          {title}
        </h3>

        <p className="text-sm text-gray-600 mb-3 line-clamp-2 leading-relaxed">
          {description}
        </p>

        {/* Meta Information */}
        <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-2">
            {publishedAt && (
              <span className="flex items-center gap-1">
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {publishedAt}
              </span>
            )}
            {place && (
              <>
                {publishedAt && <span className="text-gray-300">•</span>}
                <span className="flex items-center gap-1">
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  {place}
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
