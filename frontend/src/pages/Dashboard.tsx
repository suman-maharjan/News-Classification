import socket from "@/socket/socket";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import SendSVG from "../assets/svg/SendSVG";
import { URLS } from "../constants";
import instance from "../utils/api";

type TAlgorithm = {
  id: string;
  value: string;
};

type TMessage = {
  sender: string;
  message: string;
  type: "success" | "error";
};

type TNews = {
  news: string;
  algorithm: TAlgorithm;
};

const classificationAlgorithms: TAlgorithm[] = [
  {
    id: "SVM_Model",
    value: "SVM Model",
  },
  {
    id: "SVM_Probability",
    value: "SVM Probability",
  },
  {
    id: "Naive_Bayes",
    value: "Naive Bayes",
  },
];

const Dashboard = () => {
  const [conversation, setConversation] = useState<TMessage[]>([]);
  const [newsValue, setNewsValue] = useState<TNews>({
    news: "",
    algorithm: classificationAlgorithms[0],
  });
  const [loading, setLoading] = useState(false);
  const endOfConversationRef = useRef(null);

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
  }, []);

  // Handle submit
  async function handleSubmit() {
    if (!newsValue.news) return;
    setLoading(true);

    // Add user message to conversation
    const userMessage: TMessage = {
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
        type: newsValue.algorithm.id,
      });
    } catch (e) {
      console.error(e);
      const errorMessage: TMessage = {
        sender: "SVM Model",
        message: e.message,
        type: "error",
      };
      setConversation((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
      setNewsValue({ ...newsValue, news: "" });
    }
  }

  const handlePreviousMessage = () => {
    fetchMoreMessages();
  };

  const handleNewsValue = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewsValue({ ...newsValue, [e.target.name]: e.target.value });
  };
  const handleNewsType = (algorithm) => {
    setNewsValue({ ...newsValue, algorithm });

    newsTextAreaRef.current.focus();
  };

  useEffect(() => {
    socket.on("news:result", (result) => {
      const message: TMessage = {
        sender: result.data.algorithm || "Unknown",
        message:
          result.message === "error" ? result?.error : result.data.prediction,
        type: result.message,
      };
      setConversation((prev) => [...prev, message]);
    });

    return () => {
      socket.off("news:result");
    };
  }, []);

  return (
    <div className="p-4 h-[100%]">
      <div className="pb-28 h-[75vh] overflow-y-scroll">
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
                  <ConversationCard key={index} message={message} />
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
              {newsValue.algorithm.value}
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow bottom-0"
            >
              {classificationAlgorithms.map((algorigthm) => {
                return (
                  <li
                    onClick={() => handleNewsType(algorigthm)}
                    className="p-4 cursor-pointer text-white"
                    key={algorigthm.id}
                  >
                    {algorigthm.value}
                  </li>
                );
              })}
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

const ConversationCard = ({
  message,
}: {
  message: {
    sender: string;
    type: string;
    message: string;
  };
}) => {
  return (
    <div>
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
            <div className="chat-header">
              {
                classificationAlgorithms.find(
                  (algorithm) => algorithm.id === message.sender
                ).value
              }
            </div>
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
  );
};

export default Dashboard;
