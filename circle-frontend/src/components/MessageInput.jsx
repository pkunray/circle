import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import React from "react";
import { IoSendSharp } from "react-icons/io5";
import { useState } from "react";
import useShowToast from "../hooks/useShowToast";
import { selectedDMAtom, dmsAtom } from "../atoms/dmsAtom";
import { useRecoilValue, useSetRecoilState } from "recoil";

const MessageInput = ({ setMessages }) => {
  const [messageText, setMessageText] = useState("");
  const showToast = useShowToast();
  const selectedDM = useRecoilValue(selectedDMAtom);
  const setDMs = useSetRecoilState(dmsAtom);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!messageText) return;
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: messageText,
          recipientId: selectedDM.userId,
        }),
      });
      const data = await res.json();
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }
      setMessages((messages) => [...messages, data]);
      setDMs((prevDms) => {
        const newDms = prevDms.map((dm) => {
          if (dm._id === selectedDM._id) {
            return {
              ...dm,
              lastMessage: {
                text: messageText,
                sender: data.sender,
              },
            };
          }
          return dm;
        });
        return newDms;
      });
      setMessageText("");
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  return (
    <form onSubmit={handleSendMessage}>
      <InputGroup>
        <Input
          w={"full"}
          placeholder={"Type a message"}
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
        />
        <InputRightElement onClick={handleSendMessage} cursor={"pointer"}>
          <IoSendSharp />
        </InputRightElement>
      </InputGroup>
    </form>
  );
};

export default MessageInput;
