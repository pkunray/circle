import { Avatar, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { useRecoilValue } from "recoil";
import { selectedDMAtoM } from "../atoms/dmsAtom";
import { userAtom } from "../atoms/userAtom";

const Message = ({ ownMessage, message }) => {
  const selectedDM = useRecoilValue(selectedDMAtoM);
  const currentUser = useRecoilValue(userAtom);
  return (
    <>
      {ownMessage ? (
        <Flex gap={2} alignSelf={"flex-end"}>
          <Text maxW={"350px"} bg={"blue.400"} borderRadius={"md"} padding={1}>
            {message.text}
          </Text>
          <Avatar src={currentUser.userProfilePic} width="7" height="7" />
        </Flex>
      ) : (
        <Flex gap={2}>
          <Avatar src={selectedDM.profilePic} width="7" height="7" />
          <Text
            maxW={"350px"}
            bg={"gray.400"}
            color={"black"}
            borderRadius={"md"}
            padding={1}
          >
            {message.text}
          </Text>
        </Flex>
      )}
    </>
  );
};

export default Message;
