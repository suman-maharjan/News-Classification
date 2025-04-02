import { Server, Socket } from "socket.io";
import { validateZod } from "../../utils/validationHandler";
import { newsClassifySchema } from "./newsSchema";
import newsService from "./news.service";
import { eventEmitter } from "../../services/eventEmitter";
import { accessTokenPayload } from "../../types/tokenTypes";
import { createConversationSchemaType } from "../conversation/conversation.schema";
import { MessageTypeEnum } from "../conversation/conversation.model";

class NewsGateway {
  public registerHandler(io: Server, socket: Socket) {
    console.log(`User connected: ${socket.id}`);

    socket.on("news:send", async (data) => {
      try {
        const validateData = validateZod(newsClassifySchema, data);
        const result = await newsService.classify(validateData);

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

  private saveConversation(
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

    eventEmitter.emit("conversation:save", {
      conversation: conversation,
      user: userData,
    });
  }
}
export default new NewsGateway();
