import mongoose, { Schema, Types } from "mongoose";

export interface CommentSchemaType {
  newsId: Types.ObjectId;
  userId: Types.ObjectId;
  comment: string;
  createdAt: Date;
}

export type CommentDocument = mongoose.HydratedDocument<CommentSchemaType>;

const commentSchema = new Schema<CommentSchemaType>({
  newsId: { type: Schema.Types.ObjectId, ref: "News", required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const CommentModel: mongoose.Model<CommentSchemaType> =
  mongoose.models.Comment || mongoose.model("Comment", commentSchema);

export default CommentModel;
