import { z } from "zod";
import { MessageTypeEnum } from "./conversation.model";

export const createConversationSchema = z.object({
  messages: z.array(
    z.object({
      sender: z.string(),
      message: z.string(), // Should be "message", not "messages"
      type: z.enum(
        Object.values(MessageTypeEnum) as [
          MessageTypeEnum.SUCCESS,
          MessageTypeEnum.ERROR
        ]
      ),
    })
  ),
});

export type createConversationSchemaType = z.infer<
  typeof createConversationSchema
>;
