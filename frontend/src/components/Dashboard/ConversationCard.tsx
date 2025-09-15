import { classificationAlgorithms } from "@/constants/classificationAlgorithm";
import { TMessage } from "@/types/dashboard";

const ConversationCard = ({ message }: { message: TMessage }) => {
  return (
    <>
      <div>
        <div className={`chat chat-end`}>
          <div
            className={`chat-bubble ${
              message.type === "error" ? "chat-bubble-error" : ""
            }`}
          >
            {message.input}
          </div>
        </div>
        <div className={`chat chat-start`}>
          <>
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS chat bubble component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <div className="chat-header">
              {
                classificationAlgorithms.find(
                  (algorithm) => algorithm.id === message.algorithm
                ).value
              }
            </div>
          </>
          <div
            className={`chat-bubble ${
              message.type === "error" ? "chat-bubble-error" : ""
            }`}
          >
            {message.response}
          </div>
        </div>
      </div>
    </>
  );
};
export default ConversationCard;
