import initMongoDatabase from "../config/mongoDb";
import { conversationQueue } from "../queue/conversation.queue";
import processConversationJob from "./conversationJob";

const startWorker = async () => {
  try {
    await initMongoDatabase();
    console.log("MongoDB Connected (worker)");

    // Queue Job Processor
    conversationQueue.process("save", processConversationJob);

    // Global error listener for queue
    conversationQueue.on("error", (error) => {
      console.log(`Queue Error:`, error);
    });
  } catch (error) {
    console.error(`Failed to start worker:`, error);
  }
};

startWorker();
