import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import SendSVG from "../assets/svg/SendSVG";
import instance from "../utils/api";
import { URLS } from "../constants";
import socket from "@/socket/socket";

enum NewsTypeEnum {
  Default = "Default",
  Probability = "Probability",
}

const Dashboard = () => {
  const [conversation, setConversation] = useState([]);
  const [newsValue, setNewsValue] = useState({
    news: "",
    type: NewsTypeEnum.Default,
  });
  const [loading, setLoading] = useState(false);
  const endOfConversationRef = useRef(null);
  const scrollRef = useRef(null);
  const newsTextAreaRef = useRef(null);

  // Pagination
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchMoreMessages = useCallback(async () => {
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
  }, [page, loading, hasMore]);

  // Initial fetch of conversation
  useEffect(() => {
    fetchMoreMessages();
    endOfConversationRef.current?.scrollIntoView({ behavior: "smooth" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle submit
  async function handleSubmit() {
    if (!newsValue.news) return;

    setLoading(true);

    // Add user message to conversation
    const userMessage = {
      sender: "user",
      message: newsValue.news,
      type: "success",
    };
    setConversation((prev) => [...prev, userMessage]);

    try {
      if (
        newsValue.news.split(" ").filter((word) => word.length > 0).length < 10
      ) {
        throw new Error("News should be atleast 10 words long");
      }

      // Emit socket event
      socket.emit("news:send", {
        news: newsValue.news,
        type: newsValue.type,
      });
    } catch (e) {
      console.error(e);
      const errorMessage = {
        sender: "SVM Model",
        message: e.message,
        type: "error",
      };
      setConversation((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
      setNewsValue({ ...newsValue, news: "" });
    }
    endOfConversationRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  const handlePreviousMessage = () => {
    fetchMoreMessages();
  };

  const handleNewsValue = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewsValue({ ...newsValue, [e.target.name]: e.target.value });
  };
  const handleNewsType = (type) => {
    setNewsValue({ ...newsValue, type });
    newsTextAreaRef.current.focus();
  };

  useEffect(() => {
    socket.on("news:result", (result) => {
      if (result.message === "error") {
        const errorMessage = {
          sender: "SVM Model",
          message: result.error,
          type: "error",
        };
        setConversation((prev) => [...prev, errorMessage]);
        return;
      }

      const modelMessage = {
        sender: "SVM Model",
        message: result.data.prediction,
        type: "success",
      };
      setConversation((prev) => [...prev, modelMessage]);
    });

    return () => {
      socket.off("news:result");
    };
  }, []);

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
                  <p
                    className="hover:cursor-pointer"
                    onClick={handlePreviousMessage}
                  >
                    Show Old message
                  </p>
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
        <div>
          Model Type :{" "}
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn m-1">
              {newsValue.type}
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
            >
              <li
                onClick={() => handleNewsType(NewsTypeEnum.Default)}
                className="p-4 cursor-pointer"
              >
                {NewsTypeEnum.Default}
              </li>
              <li
                className="p-4 cursor-pointer"
                onClick={() => handleNewsType(NewsTypeEnum.Probability)}
              >
                {NewsTypeEnum.Probability}
              </li>
            </ul>
          </div>
        </div>
        <div className="flex w-full gap-2 text-white">
          <textarea
            value={newsValue.news}
            onChange={handleNewsValue}
            placeholder="Enter News here"
            className="textarea flex-1 w-full textarea-bordered resize-none focus:ring-2 "
            name="news"
            ref={newsTextAreaRef}
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
