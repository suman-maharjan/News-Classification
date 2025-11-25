import { URLS } from "@/constants/envConstant";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "./axiosInstance";
import { key } from "./queryKeys";

export const useCommentAdd = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await api.post(`${URLS.COMMENT}/create`, data);
      return response.data;
    },
    onSuccess: (response) => {
      console.log({ response });
      queryClient.refetchQueries({
        queryKey: key.comment.getComment(response.data.newsId),
      });
    },
  });
};

export const useCommentByNewsId = (newsId: string) => {
  return useQuery({
    queryFn: async () => {
      const response = await api.get(`${URLS.COMMENT}/${newsId}`);
      return response.data.data;
    },
    queryKey: key.comment.getComment(newsId),
  });
};
