import ConversationCard from "@/components/Dashboard/ConversationCard";
import MessageInput from "@/components/Dashboard/MessageInput";
import { classificationAlgorithms } from "@/constants/classificationAlgorithm";
import useSocket from "@/hooks/useSocket";
import { emitNews } from "@/socket/socketEmitters";
import {
  registerNewsResultListener,
  removeNewsResultListener,
} from "@/socket/socketListeners";
import { TMessage, TNews } from "@/types/dashboard";
import { TNewsResult } from "@/types/socketTypes";
import { useCallback, useEffect, useRef, useState } from "react";
import { URLS } from "../constants";
import instance from "../utils/api";

const Dashboard = () => {
  const [conversation, setConversation] = useState<TMessage[]>([]);
  const [newsValue, setNewsValue] = useState<TNews>({
    news: "",
    algorithm: classificationAlgorithms[0],
  });
  const [loading, setLoading] = useState(false);
  const endOfConversationRef = useRef<HTMLDivElement>(null);
  const hasFetchedRef = useRef(false);
  const { isConnected: isSocketConnected } = useSocket();

  const scrollToBottom = () => {
    endOfConversationRef.current?.scrollIntoView({ behavior: "smooth" });
  };

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
      const messages = newMessages.reverse();
      setConversation((prev) => [...messages, ...prev]);
      setPage((prev) => prev + 1);
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore]);

  // Handle submit
  async function handleSubmit() {
    if (!newsValue.news || !isSocketConnected) {
      console.warn("Socket not connected or message empty");
      return;
    }
    setLoading(true);

    try {
      if (
        newsValue.news.split(" ").filter((word) => word.length > 0).length < 10
      ) {
        throw new Error("News should be atleast 10 words long");
      }

      // Emit socket event
      emitNews({
        news: newsValue.news,
        type: newsValue.algorithm.id,
      });
    } catch (e) {
      console.error(e);
      const errorMessage: TMessage = {
        algorithm: "SVM Model",
        response: e.message,
        input: "Try again later",
        type: "error",
      };
      setConversation((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  }

  const handlePreviousMessage = () => {
    fetchMoreMessages();
  };

  // Initial fetch of conversation
  useEffect(() => {
    if (hasFetchedRef.current) return;
    hasFetchedRef.current = true;

    fetchMoreMessages();
  }, []);

  useEffect(() => {
    const handleResult = (result: TNewsResult) => {
      let message: TMessage =
        result.message === "success"
          ? {
              input: result.data.input,
              algorithm: result.data.algorithm,
              response: result.data.prediction,
              type: result.message,
            }
          : {
              input: newsValue.news,
              algorithm: newsValue.algorithm.id,
              response: result?.error,
              type: result.message,
            };
      setConversation((prev) => [...prev, message]);
      setNewsValue({ ...newsValue, news: "" });
      setTimeout(() => {
        scrollToBottom();
      }, 0);
    };

    registerNewsResultListener(handleResult);

    return () => {
      removeNewsResultListener(handleResult);
    };
  }, []);

  return (
    <div className="p-4 h-[100%]">
      <div className="h-[75vh] overflow-y-scroll">
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
            <div ref={endOfConversationRef} />
          </>
        )}
      </div>
      <MessageInput
        newsValue={newsValue}
        setNewsValue={setNewsValue}
        handleSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
};

export default Dashboard;
