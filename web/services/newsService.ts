import { URLS } from "@/constants/envConstant";
import { TCreateNewsForm } from "@/lib/form/newsForm";
import { INews } from "@/types/news.types";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { api } from "./axiosInstance";
import { key } from "./queryKeys";

type TPaginationResponse = {
  success: boolean;
  data: INews[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    nextPage: number | null;
    startIndex: number;
    endIndex: number;
    prevPage: number | null;
  };
};

interface NewsQueryParams {
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  search?: string;
  category?: string;
  // type?: ENewsType | undefined;
  place?: string;
}

export const useCreateNews = () => {
  return useMutation({
    mutationFn: async (data: TCreateNewsForm) => {
      const response = await api.post(`${URLS.NEWS}/create`, data);
      return response.data;
    },
    onSuccess: (data) => {
      toast.info("News Created");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useGetAllNews = ({
  page,
  limit,
  sortBy = "publishedAt",
  filters,
}: {
  page?: number;
  limit?: number;
  sortBy?: "publishedAt";
  filters?: Record<string, any>;
}) => {
  return useQuery({
    queryKey: ["news", "getAll", page, limit, sortBy, filters],
    queryFn: async () => {
      const response = await api.get<TPaginationResponse>(
        `${URLS.NEWS}/all?page=${page}&limit=${limit}&sortBy=${sortBy}`,
        {
          params: filters,
        }
      );
      return response.data;
    },
  });
};

export const useInfiniteNews = (filters: NewsQueryParams = {}) => {
  return useInfiniteQuery<any>({
    queryKey: ["news", "infinite", filters],
    queryFn: async ({ pageParam = 1 }) => {
      const params = new URLSearchParams({
        page: String(pageParam),
        limit: String(filters.limit || 20),
      });

      if (filters.sortBy) params.set("sortBy", filters.sortBy);
      if (filters.sortOrder) params.set("sortOrder", filters.sortOrder);
      if (filters.search) params.set("search", filters.search);
      if (filters.category) params.set("category", filters.category);
      // if (filters.type) params.set("type", filters.type);
      if (filters.place) params.set("place", filters.place);

      const response = await api.get<TPaginationResponse>(
        `${URLS.NEWS}/all?${params.toString()}`
      );
      return response.data;
    },
    getNextPageParam: (response) => {
      if (response.pagination.hasNextPage) {
        return response.pagination.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
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
      toast.info("Edited Successfully");
      queryClient.refetchQueries({
        queryKey: key.news.getAll(),
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
      toast.info("News Deleted");
      queryClient.invalidateQueries({ queryKey: key.news.getAll() });
    },
  });
};

export const useAutoDetectNewsCategory = () => {
  return useMutation({
    mutationFn: async ({ news, type }: { news: string; type: string }) => {
      const response = await api.post(`${URLS.NEWS}/classify`, {
        news,
        type,
      });
      return response.data;
    },
  });
};
