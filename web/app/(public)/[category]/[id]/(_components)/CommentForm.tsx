import TextareaField from "@/components/form/TextareaField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@/services/authService";
import { useCommentAdd } from "@/services/commentService";
import { useAuthStore } from "@/store/authStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const commentSchema = z.object({
  comment: z.string().min(3, "Comment should be minimum 3 characters"),
});

const CommentForm = () => {
  const form = useForm({
    defaultValues: { comment: "" },
    resolver: zodResolver(commentSchema),
  });
  const user = useUser();
  const params = useParams();
  const mutation = useCommentAdd();

  const handleSubmit = ({ comment }: { comment: string }) => {
    const userId = user.data?.data.id;
    const newsId = params.id;

    mutation.mutate(
      { userId, newsId, comment },
      {
        onSuccess: () => {
          form.reset();
          toast.info("Comment Added");
        },
        onError: (error) => {
          toast.error(error.message);
        },
      }
    );
  };
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Add a Comment
      </h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <TextareaField
            control={form.control}
            name="comment"
            label=""
            placeholder="Write your comment here..."
          />
          <Button
            type="submit"
            disabled={mutation.isPending}
            className="w-full sm:w-auto"
          >
            {mutation.isPending ? "Posting..." : "Post Comment"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CommentForm;
