import mongoose, { Document, Schema, Types } from "mongoose";

export interface CommentSchemaType extends Document {
  newsId: Types.ObjectId;
  userId: Types.ObjectId;
  comment: string;
  createdAt: Date;
}

const commentSchema = new Schema<CommentSchemaType>({
  newsId: { type: Schema.Types.ObjectId, ref: "News", required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const CommentModel =
  (mongoose.models.Comment as mongoose.Model<CommentSchemaType>) ||
  mongoose.model("Comment", commentSchema);

export default CommentModel;
