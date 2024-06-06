import {
  Avatar,
  AvatarBadge,
  Flex,
  Stack,
  WrapItem,
  useColorModeValue,
  Text,
  Image,
  useColorMode,
} from "@chakra-ui/react";
import React from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import { BsCheck2All } from "react-icons/bs";
import { selectedDMAtom } from "../atoms/dmsAtom";

const DM = ({ dm, isOnline }) => {
  const user = dm.participants[0];
  const lastMessage = dm.lastMessage;
  const currentUser = useRecoilValue(userAtom);
  const [slectedDM, setSelectedDM] = useRecoilState(selectedDMAtom);
  const colorMode = useColorMode();
  console.log("slectedDM", slectedDM);
  return (
    <Flex
      gap={4}
      alignItems={"center"}
      padding={1}
      _hover={{
        cursor: "pointer",
        bg: useColorModeValue("gray.600", "gray.dark"),
        color: "white",
      }}
      borderRadius={"md"}
      onClick={() => {
        setSelectedDM({
          _id: dm._id,
          userId: user._id,
          username: user.username,
          userProfilePic: user.profilePic,
          mock: dm.mock,
        });
      }}
      bg={
        slectedDM?._id === dm._id
          ? colorMode === "light"
            ? "gray.400"
            : "gray.dark"
          : ""
      }
    >
      <WrapItem>
        <Avatar
          size={{
            base: "xs",
            sm: "sm",
            md: "md",
          }}
          src={user.profilePic}
        >
          {isOnline && <AvatarBadge boxSize="1em" bg="green.500" />}
        </Avatar>
      </WrapItem>
      <Stack direction={"column"} fontSize={"sm"}>
        <Text fontWeight="700" display={"flex"} alignItems={"center"}>
          {user.username}
          <Image src="/verified.png" width={4} height={4} marginLeft={1} />
        </Text>
        <Text fontSize={"xs"} display={"flex"} alignItems={"center"} gap={1}>
          {currentUser._id === lastMessage.sender ? (
            <BsCheck2All size={16} />
          ) : null}
          {lastMessage.text.lengh > 18
            ? lastMessage.text.slice(0, 18) + "..."
            : lastMessage.text}
        </Text>
      </Stack>
    </Flex>
  );
};

export default DM;
