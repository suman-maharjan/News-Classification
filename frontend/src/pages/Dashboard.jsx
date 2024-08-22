import { useEffect, useRef, useState } from "react";
import SendSVG from "../assets/svg/SendSVG";
import instance from "../utils/api";
import { URLS } from "../constants";

const Dashboard = () => {
  const [conversation, setConversation] = useState([]);
  const [newsValue, setNewsValue] = useState("");
  const [loading, setLoading] = useState(false);
  const endOfConversationRef = useRef(null);
  const scrollRef = useRef(null);

  // Pagination
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchMoreMessages = async () => {
    if (loading || !hasMore) return;
    let limit = 4;
    try {
      setLoading(true);
      const response = await instance.get(`${URLS.CONVERSATION}/user`, {
        params: { page, limit },
      });

      const newMessages = response.data.data.messages;

      const { currentPage, totalPages } = response.data.data;

      if (currentPage === totalPages) {
        setHasMore(false);
      }
      newMessages.reverse();
      setConversation((prev) => [...newMessages, ...prev]);
      setPage((prev) => prev + 1);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch of conversation
  useEffect(() => {
    fetchMoreMessages();
  }, []);

  // Handle submit
  const handleSubmit = async () => {
    if (!newsValue) return;

    setLoading(true);

    // Add user message to conversation
    const userMessage = {
      sender: "user",
      message: newsValue,
      type: "success",
    };
    setConversation((prev) => [...prev, userMessage]);

    try {
      // Make API call for prediction
      const response = await instance.post(`${URLS.NEWS}/classify`, {
        news: newsValue,
      });

      // Add model's response to conversation
      const modelMessage = {
        sender: "SVM Model",
        message: response.data.data.prediction,
        type: "success",
      };
      setConversation((prev) => [...prev, modelMessage]);

      // Save conversation
      await instance.post(`${URLS.CONVERSATION}/save`, {
        messages: [userMessage],
      });

      await instance.post(`${URLS.CONVERSATION}/save`, {
        messages: [modelMessage],
      });
    } catch (e) {
      console.error(e);
      const errorMessage = {
        sender: "SVM Model",
        message: "Something went wrong",
        type: "error",
      };
      setConversation((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
      setNewsValue("");
    }
    endOfConversationRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handlePreviousMessage = () => {
    fetchMoreMessages();
  };

  return (
    <div className="p-4 h-[100%]">
      <div className="pb-28 h-[75vh] overflow-y-scroll" ref={scrollRef}>
        {loading && conversation.length === 0 ? (
          <div className="text-center text-2xl font-bold">Loading...</div>
        ) : (
          <>
            {conversation.length === 0 ? (
              <div className="text-center text-2xl font-bold">
                Start a conversation
              </div>
            ) : (
              <>
                {hasMore && (
                  <p onClick={handlePreviousMessage}>Show Old message</p>
                )}

                {conversation.map((message, index) => (
                  <div key={index}>
                    <div
                      className={`chat ${
                        message.sender === "user" ? "chat-end" : "chat-start"
                      } `}
                    >
                      {message.sender !== "user" && (
                        <>
                          <div className="chat-image avatar">
                            <div className="w-10 rounded-full">
                              <img
                                alt="Tailwind CSS chat bubble component"
                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                              />
                            </div>
                          </div>
                          <div className="chat-header">{message.sender}</div>
                        </>
                      )}
                      <div
                        className={`chat-bubble ${
                          message.type === "error" ? "chat-bubble-error" : ""
                        }`}
                      >
                        {message.message}
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </>
        )}
        <div ref={endOfConversationRef} />
      </div>

      <div className="flex flex-col fixed bottom-2 left-0 right-0 p-4">
        <div className="flex w-full gap-2">
          <textarea
            value={newsValue}
            onChange={(e) => setNewsValue(e.target.value)}
            placeholder="Enter News here"
            className="textarea flex-1 w-full textarea-bordered resize-none focus:ring-2"
          ></textarea>
          <kbd
            className="kbd kbd-lg flex-shrink-0"
            style={{ width: "80px", height: "80px" }}
            onClick={handleSubmit}
            aria-disabled={loading}
          >
            <SendSVG />
          </kbd>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
