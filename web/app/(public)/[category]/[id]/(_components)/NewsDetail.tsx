import { EContentType, INews, INewsContent } from "@/types/news.types";

type NewsDetailProps = Pick<
  INews,
  "title" | "author" | "image" | "content" | "place" | "publishedAt" | "source"
>;

const NewsDetail = ({
  title,
  place,
  publishedAt,
  author,
  image,
  content,
  source,
}: NewsDetailProps) => {
  const formattedDate = new Date(publishedAt).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Article Header */}
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 pb-6 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span className="font-medium text-gray-900">{author}</span>
            </div>

            <span className="text-gray-300">•</span>

            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <time dateTime={publishedAt}>{formattedDate}</time>
            </div>

            {place && (
              <>
                <span className="text-gray-300">•</span>
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-blue-600"
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
                  <span>{place}</span>
                </div>
              </>
            )}
          </div>
        </header>

        {/* Featured Image */}
        {image && (
          <figure className="mb-10">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img
                src={image}
                alt={title}
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-gray-900/10 rounded-2xl" />
            </div>
          </figure>
        )}

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          {content.map((item: INewsContent, idx: number) => {
            if (item.type === EContentType.TEXT) {
              return (
                <p
                  key={idx}
                  className="mb-6 text-gray-800 leading-relaxed text-lg"
                >
                  {item.data}
                </p>
              );
            }
            if (item.type === EContentType.IMAGE) {
              return (
                <figure key={idx} className="my-10">
                  <div className="relative overflow-hidden rounded-xl shadow-lg">
                    <img
                      src={item.data}
                      alt={`Content image ${idx + 1}`}
                      className="w-full h-auto object-cover"
                    />
                    <div className="absolute inset-0 ring-1 ring-inset ring-gray-900/10 rounded-xl" />
                  </div>
                </figure>
              );
            }
            return null;
          })}
        </div>

        {/* Source Attribution */}
        {source && (
          <footer className="mt-12 pt-8 border-t border-gray-200">
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
              <div className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <p className="text-sm font-medium text-gray-900 mb-1">
                    Original Source
                  </p>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-1 group"
                  >
                    {source.name}
                    <svg
                      className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </footer>
        )}

        {/* Share Actions */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-200 text-gray-700 font-medium rounded-lg hover:border-blue-300 hover:text-blue-600 transition-all hover:shadow-md">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
              />
            </svg>
            Share Article
          </button>
        </div>
      </div>
    </article>
  );
};

export default NewsDetail;
