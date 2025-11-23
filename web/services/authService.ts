import { URLS } from "@/constants/envConstant";
import { useAuthStore } from "@/store/authStore";
import {
  IMeResponse,
  TLoginResponse,
  TRegisterResponse,
} from "@/types/auth.types";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { api } from "./axiosInstance";
import { key } from "./queryKeys";

export const useLogin = () => {
  const queryClient = new QueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await api.post(`${URLS.AUTH}/login`, data);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: key.me() });
    },
  });
};
export const useAdminLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await api.post<TLoginResponse>(
        `${URLS.AUTH}/login/admin`,
        data
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: key.me() });
    },
    onError: (err) => {},
  });
};

export const useRegisterUser = () => {
  const queryClient = new QueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await api.post<TRegisterResponse>(
        `${URLS.AUTH}/register`,
        data
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: key.me() });
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

export const checkEmail = async (email: string) => {
  const response = await api.post(`${URLS.AUTH}/check-email`, {
    email,
  });
  return response.data;
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
