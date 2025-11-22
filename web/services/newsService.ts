import { URLS } from "@/constants/envConstant";
import { TCreateNewsForm } from "@/lib/form/newsForm";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "./axiosInstance";
import { key } from "./queryKeys";

export const useCreateNews = () => {
  return useMutation({
    mutationFn: async (data: TCreateNewsForm) => {
      const response = await api.post(`${URLS.NEWS}/create`, data);
      return response.data;
    },
    onSuccess: (data) => {
      console.log({ data });
    },
    onError: (error) => {
      console.log({ error });
    },
  });
};

export const useGetAllNews = () => {
  return useQuery({
    queryKey: key.news.getAll(),
    queryFn: async () => {
      const response = await api.get(`${URLS.NEWS}/all`);
      return response.data;
    },
  });
};
