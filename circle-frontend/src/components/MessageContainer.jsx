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
import React, { useEffect } from "react";
import Message from "./Message";
import MessageInput from "./MessageInput";
import useShowToast from "../hooks/useShowToast";
import { useRecoilValue } from "recoil";
import { selectedDMAtoM } from "../atoms/dmsAtom";
import { userAtom } from "../atoms/userAtom";

const MessageContainer = () => {
  const showToast = useShowToast();
  const selectedDM = useRecoilValue(selectedDMAtoM);
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [messages, setMessages] = useState([]);
  const currentUser = useRecoilValue(userAtom);

  useEffect(() => {
    const getMessages = async () => {
      setLoadingMessages(true);
      setMessages([]);
      try {
        if (selectedDM.mock) return;

        const res = fetch("/api/messages/${selectedDM.userId}");
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
      {/* message header */}
      <Flex w={"full"} h={12} alignItems={"center"} gap={2}>
        <Avatar src={selectedDM.userProfilePic} size="sm" />
        <Text display={"flex"} alignItems={"center"}>
          {selectedDM.username}
          <Image src="/verified.png" alt="verified" w={4} h={4} ml={1} />
        </Text>
      </Flex>
      <Divider />

      {/* message body */}
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
            <Message
              key={message._id}
              message={message}
              ownMessage={currentUser._id === message.sender}
            />
          ))}
      </Flex>
      <Divider />

      {/* pass setMessages function, when new message is sent, put it into the messages */}
      <MessageInput setMessages={setMessages} />
    </Flex>
  );
};

export default MessageContainer;
