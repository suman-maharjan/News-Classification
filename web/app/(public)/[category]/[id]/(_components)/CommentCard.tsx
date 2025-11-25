import { formatDistanceToNow } from "date-fns";

interface Comment {
  id: string;
  comment: string;
  userId: string;
  newsId: string;

  name: string;
  createdAt: string;
}

interface CommentCardProps {
  comment: Comment;
}

const CommentCard = ({ comment }: CommentCardProps) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-3">
      {/* User Info */}
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div>
            <p className="font-semibold text-gray-900">
              {comment?.name || "Anonymous"}
            </p>
            <p className="text-sm text-gray-500">
              {formatDistanceToNow(new Date(comment.createdAt), {
                addSuffix: true,
              })}
            </p>
          </div>
        </div>
      </div>
      <p className="text-gray-700 leading-relaxed">{comment.comment}</p>
    </div>
  );
};

export default CommentCard;
