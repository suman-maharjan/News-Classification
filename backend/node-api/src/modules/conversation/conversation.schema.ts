import { z } from "zod";
import { MessageTypeEnum, ModelsEnum } from "./message.model";

export const createConversationSchema = z.object({
  userId: z.string(),
  input: z.string(),
  algorithm: z.string(),
  response: z.string(),
  type: z.enum(
    Object.values(MessageTypeEnum) as [
      MessageTypeEnum.SUCCESS,
      MessageTypeEnum.ERROR
    ]
  ),
});

export type createConversationSchemaType = z.infer<
  typeof createConversationSchema
>;
