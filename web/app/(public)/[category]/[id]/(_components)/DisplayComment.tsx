import { useCommentByNewsId } from "@/services/commentService";
import CommentForm from "./CommentForm";
import { useParams } from "next/navigation";
import CommentCard from "./CommentCard";

const DisplayComment = () => {
  const params = useParams();
  const newsId = params.id as string;

  const { data, isLoading, error } = useCommentByNewsId(newsId);

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-8">
      <CommentForm />

      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-900">
          Comments {data && `(${data.length})`}
        </h3>

        {isLoading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-600 mt-2">Loading comments...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            Error loading comments: {error.message}
          </div>
        )}

        {data && data.length === 0 && (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <p className="text-gray-600">
              No comments yet. Be the first to comment!
            </p>
          </div>
        )}

        {data?.map((comment: any, index: number) => (
          <CommentCard key={index} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default DisplayComment;
