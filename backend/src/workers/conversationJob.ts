import Bull from "bull";
import conversationService from "../modules/conversation/conversation.service";

const processConversationJob = async (job: Bull.Job) => {
  console.log(`${job.id} is processing`);
  const payload = job.data;
  const message = payload.conversation;
  const userData = payload.user;

  await conversationService.save(message, userData.id);
  console.log(`${job.id} saved conversation ${userData.id}`);
};

export default processConversationJob;
