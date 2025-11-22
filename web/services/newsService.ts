import { URLS } from "@/constants/envConstant";
import { TCreateNewsForm } from "@/lib/form/newsForm";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
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
      return response.data.data;
    },
  });
};

export const useGetNewsById = (id: string) => {
  return useQuery({
    queryKey: key.news.getById(id),
    queryFn: async () => {
      const response = await api.get(`${URLS.NEWS}/${id}`);
      return response.data.data;
    },
  });
};

export const useEditNewsById = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: TCreateNewsForm }) => {
      const response = await api.post(`${URLS.NEWS}/edit/${id}`, data);
      return response.data;
    },
    onSuccess: (response) => {
      console.log({ response }, "I need this to revalidate the query by id");
      console.log("Edit Successfully");
      queryClient.invalidateQueries({
        queryKey: [
          ...key.news.getAll(),
          ...key.news.getById(response.data._id),
        ],
      });
    },
  });
};

export const useDeleteNewsById = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await api.post(`${URLS.NEWS}/delete/${id}`);
      return response.data;
    },
    onSuccess: () => {
      console.log("Delete Successfully");
      queryClient.invalidateQueries({ queryKey: key.news.getAll() });
    },
  });
};
