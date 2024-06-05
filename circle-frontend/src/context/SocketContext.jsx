import { createContext, useEffect, useContext } from "react";
import { useRecoilValue } from "recoil";
import io from "socket.io-client";
import userAtom from "../atoms/userAtom";
import { useState } from "react";

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const user = useRecoilValue(userAtom);
  const [onlineUserIds, setOnlineUserIds] = useState([]);

  useEffect(() => {
    const socket = io("http://localhost:9000", {
      query: {
        userId: user?._id,
      },
    });
    setSocket(socket);
    socket.on("getOnlineUsers", (userIds) => {
      setOnlineUserIds(userIds);
    });
    return () => socket && socket.close();
  }, [user?._id]);
  return (
    <SocketContext.Provider value={{ socket, onlineUserIds }}>
      {children}
    </SocketContext.Provider>
  );
};
