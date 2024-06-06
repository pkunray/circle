import {
  Flex,
  useColorModeValue,
  Text,
  Image,
  Divider,
  Avatar,
  SkeletonCircle,
  Skeleton,
} from "@chakra-ui/react";
import React, { useEffect, useState, useRef } from "react";
import Message from "./Message";
import MessageInput from "./MessageInput";
import useShowToast from "../hooks/useShowToast";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { selectedDMAtom, dmsAtom } from "../atoms/dmsAtom";
import userAtom from "../atoms/userAtom";
import { useSocket } from "../context/SocketContext";

const MessageContainer = () => {
  const showToast = useShowToast();
  const selectedDM = useRecoilValue(selectedDMAtom);
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [messages, setMessages] = useState([]);
  const currentUser = useRecoilValue(userAtom);

  const { socket } = useSocket();
  const setDMs = useSetRecoilState(dmsAtom);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!socket) return;
    socket.on("newMessage", (newMessage) => {
      if (selectedDM._id === newMessage.dmId) {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
      setDMs((prevDMs) => {
        const updatedDMs = prevDMs.map((dm) => {
          if (dm._id === newMessage.dmId) {
            return {
              ...dm,
              lastMessage: {
                sender: newMessage.sender,
                text: newMessage.text,
              },
            };
          }
          return dm;
        });
        return updatedDMs;
      });
    });
    return () => {
      // clean up: remove the event listener
      socket.off("newMessage");
    };
  }, [socket]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const getMessages = async () => {
      setLoadingMessages(true);
      setMessages([]);
      try {
        if (selectedDM.mock) return;

        const res = await fetch(`/api/messages/${selectedDM.userId}`);
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        setMessages(data);
      } catch (error) {
        showToast("Error", error.message, "error");
        return;
      } finally {
        setLoadingMessages(false);
      }
    };
    getMessages();
  }, [showToast, selectedDM.userId]);
  return (
    <Flex
      flex={"70"}
      bg={useColorModeValue("gray.200", "gray.dark")}
      borderRadius={"md"}
      flexDirection={"column"}
      padding={1}
    >
      {/* messages header */}
      <Flex w={"full"} h={12} alignItems={"center"} gap={2}>
        <Avatar src={selectedDM.userProfilePic} size="sm" />
        <Text display={"flex"} alignItems={"center"}>
          {selectedDM.username}
          <Image src="/verified.png" alt="verified" w={4} h={4} ml={1} />
        </Text>
      </Flex>
      <Divider />

      {/* messages body */}
      <Flex
        flex={1}
        flexDirection={"column"}
        gap={4}
        marginY={4}
        maxH={"400px"}
        overflowY={"auto"}
        padding={2}
      >
        {loadingMessages &&
          [...Array(5)].map((_, i) => (
            <Flex
              key={i}
              gap={2}
              alignItems={"center"}
              p={"1"}
              borderRadius={"md"}
              alignSelf={i % 2 === 0 ? "flex-start" : "flex-end"}
            >
              {i % 2 === 0 && <SkeletonCircle size={7} />}
              <Flex flexDir={"column"} gap={2}>
                <Skeleton height={"8px"} width={"250px"} />
                <Skeleton height={"8px"} width={"250px"} />
                <Skeleton height={"8px"} width={"250px"} />
              </Flex>
              {i % 2 !== 0 && <SkeletonCircle size={7} />}
            </Flex>
          ))}

        {!loadingMessages &&
          messages.map((message) => (
            <Flex
              key={message._id}
              direction={"column"}
              ref={
                messages.length - 1 === messages.indexOf(message)
                  ? messagesEndRef
                  : null
              }
            >
              <Message
                message={message}
                ownMessage={currentUser._id === message.sender}
              />
            </Flex>
          ))}
      </Flex>
      <Divider />

      <MessageInput setMessages={setMessages} />
    </Flex>
  );
};

export default MessageContainer;
