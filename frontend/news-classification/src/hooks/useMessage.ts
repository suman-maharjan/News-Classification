import { classifyNewsApi } from "@/utils/apis/messageApi";
import { ClassifyNewsI } from "@/utils/types/messageTypes";
import { useMutation } from "@tanstack/react-query";

export const useMessage = () => {
  const { mutate: classifyNewsMutate, isPending: classifyNewsPending } =
    useMutation({
      mutationFn: async (payload: ClassifyNewsI) =>
        await classifyNewsApi(payload),
    });
  return { classifyNewsMutate, classifyNewsPending };
};
