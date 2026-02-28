import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "./axiosInstance";
import { URLS } from "@/constants/envConstant";
import { key } from "./queryKeys";

export const useAddSubscriber = () => {
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await api.post(`${URLS.subscriber}/add`, data);
      return response.data;
    },
  });
};

export const useGetAllSubscriber = () => {
  return useQuery({
    queryKey: key.subscriber.getAll(),
    queryFn: async () => {
      const response = await api.get(`${URLS.NEWS}/all`);
      return response.data.data;
    },
  });
};
