import { eventEmitter } from "../../services/eventEmitter";
import { accessTokenPayload } from "../../types/tokenTypes";
import { createConversationSchemaType } from "./conversation.schema";
import conversationService from "./conversation.service";

class ConversationGateway {
  public registerHandler(): void {
    eventEmitter.on(
      "conversation:save",
      (payload: {
        conversation: createConversationSchemaType;
        user: accessTokenPayload;
      }) => {
        const message = payload.conversation;
        const userData = payload.user;
        conversationService.save(message, userData.id);
      }
    );
  }
}

const conversationGateway = new ConversationGateway();
export default conversationGateway;
