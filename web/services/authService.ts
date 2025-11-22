import { URLS } from "@/constants/envConstant";
import { useAuthStore } from "@/store/authStore";
import { IMeResponse, IUser } from "@/types/auth.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "./axiosInstance";
import { key } from "./queryKeys";

export const useLogin = () => {
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await api.post(`${URLS.AUTH}/login`, data);
      return response.data;
    },
    onSuccess: (data) => {
      // setToken(data.token);
      // queryClient.invalidateQueries({ queryKey: key.me() });
    },
  });
};
export const useUser = () => {
  return useQuery<IMeResponse>({
    queryKey: key.me(),
    queryFn: async () => {
      const response = await api.get(`${URLS.AUTH}/me`);
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
};

export const useLogout = () => {
  const clearUser = useAuthStore((state) => state.clearUser);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await api.post(`${URLS.AUTH}/logout`);
    },
    onSettled: () => {
      clearUser();
      queryClient.clear();
    },
  });
};
