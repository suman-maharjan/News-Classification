import { Server, Socket } from "socket.io";
import { conversationQueue } from "../../queue/conversation.queue";
import { accessTokenPayload } from "../../types/tokenTypes";
import { validateZod } from "../../utils/validationHandler";
import { createConversationSchemaType } from "../conversation/conversation.schema";
import { MessageTypeEnum } from "../conversation/message.model";
import newsService from "./news.service";
import { newsClassifySchema } from "./newsSchema";

class NewsGateway {
  public registerHandler(io: Server, socket: Socket) {
    socket.on("news:send", async (data) => {
      try {
        const validateData = validateZod(newsClassifySchema, data);
        // To classify using the api gateway
        // const result = await newsService.classify(validateData);
        // To classify using the celery worker
        const result = await newsService.classifyUsingWorker(validateData);

        socket.emit("news:result", {
          data: result,
          message: "success",
        });

        this.saveConversation(
          validateData.news,
          result.prediction,
          socket.user,
          validateData.type
        );
      } catch (error) {
        socket.emit("news:send_error", {
          success: false,
          message: error.message,
        });
      }
    });
  }

  private async saveConversation(
    userMessage: string,
    modelPrediction: string,
    userData: accessTokenPayload,
    algorithmType: string
  ) {
    const conversation: createConversationSchemaType = {
      userId: userData.id,
      input: userMessage,
      algorithm: algorithmType,
      response: modelPrediction,
      type: MessageTypeEnum.SUCCESS,
    };

    await conversationQueue.add("save", conversation, {
      removeOnComplete: true,
    });
  }
}
export default new NewsGateway();
