import socket from "@/socket/socket";
import { useEffect, useState } from "react";

const useSocket = () => {
  const [isConnected, setIsConnected] = useState<boolean>(socket.connected);

  useEffect(() => {
    const handleConnect = () => {
      console.log("Socket connected:", socket.id);
      setIsConnected(true);
    };

    const handleDisconnect = () => {
      console.log("Socket disconnected");
      setIsConnected(false);
    };

    const handleError = (err: any) => {
      console.error("Socket error:", err);
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("connect_error", handleError);

    if (!socket.connected) {
      socket.connect();
    }

    // Cleanup listeners
    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("connect_error", handleError);
    };
  }, []);

  return {
    socket,
    isConnected,
  };
};

export default useSocket;
