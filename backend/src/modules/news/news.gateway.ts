import { Server, Socket } from "socket.io";
import { accessTokenPayload } from "../../types/tokenTypes";
import { validateZod } from "../../utils/validationHandler";
import { MessageTypeEnum } from "../conversation/conversation.model";
import { createConversationSchemaType } from "../conversation/conversation.schema";
import newsService from "./news.service";
import { newsClassifySchema } from "./newsSchema";
import { conversationQueue } from "../../queue/conversation.queue";

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
          socket.user
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
    userData: accessTokenPayload
  ) {
    const conversation: createConversationSchemaType = {
      messages: [
        {
          sender: "SVM Model",
          message: modelPrediction,
          type: MessageTypeEnum.SUCCESS,
        },
        { sender: "user", message: userMessage, type: MessageTypeEnum.SUCCESS },
      ],
    };

    conversationQueue.add({ conversation, user: userData });
    await conversationQueue.add(
      "save",
      { conversation: conversation, user: userData },
      { removeOnComplete: true }
    );

    // eventEmitter.emit("conversation:save", {
    //   conversation: conversation,
    //   user: userData,
    // });
  }
}
export default new NewsGateway();
