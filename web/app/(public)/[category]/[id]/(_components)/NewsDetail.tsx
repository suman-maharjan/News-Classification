import { EContentType, INews, INewsContent } from "@/types/news.types";

type NewsDetailProps = Pick<
  INews,
  | "title"
  | "author"
  | "image"
  | "content"
  | "place"
  | "author"
  | "publishedAt"
  | "source"
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
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <p className="text-gray-500 mb-2">
        {new Date(publishedAt).toLocaleDateString()} | {place} | {author}
      </p>
      {image && (
        <img src={image} className="w-full 2-full object-cover rounded mb-4" />
      )}
      <div className="mt-4">
        {content.map((item: INewsContent, idx: number) => {
          if (item.type === EContentType.TEXT) {
            return (
              <p key={idx} className="mb-4 text-gray-700">
                {item.data}
              </p>
            );
          }
          if (item.type === EContentType.IMAGE) {
            return (
              <img
                key={idx}
                src={item.data}
                alt={`news-${idx}`}
                className="mb-4 w-full object-cover rounded"
              />
            );
          }
          return null;
        })}
      </div>

      {source && (
        <p className="text-sm text-gray-400 mt-6">
          Source:{" "}
          <a
            href={source.url}
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            {source.name}
          </a>
        </p>
      )}
    </div>
  );
};

export default NewsDetail;
