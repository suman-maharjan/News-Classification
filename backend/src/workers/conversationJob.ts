import Bull from "bull";
import conversationService from "../modules/conversation/conversation.service";

const processConversationJob = async (job: Bull.Job) => {
  console.log(`${job.id} is processing`);
  const payload = job.data;

  await conversationService.save(payload);
  console.log(`${job.id} saved conversation ${payload.userId}`);
};

export default processConversationJob;
