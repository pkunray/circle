import {
  Box,
  Button,
  Flex,
  Input,
  Skeleton,
  SkeletonCircle,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import DM from "../components/DM";
import { GiConversation } from "react-icons/gi";
import MessageContainer from "../components/MessageContainer";
import useShowToast from "../hooks/useShowToast";
import { useRecoilState, useRecoilValue } from "recoil";
import { dmsAtom, selectedDMAtom } from "../atoms/dmsAtom";
import { userAtom } from "../atoms/userAtom";
import useSocket from "../context/SocketContext";

const DMPage = () => {
  const [loadingDMs, setLadingDMs] = useState(true);

  const showToast = useShowToast();

  const [dms, setDMs] = useRecoilState(dmsAtom);
  const [selectedDM, setSelectedDM] = useRecoilState(selectedDMAtom);

  const [searchText, setSearchText] = useState("");
  const [searchingUser, setSearchingUser] = useState(false);
  const currentUser = useRecoilValue(userAtom);
  const { socket, onlineUserIds } = useSocket();

  useEffect(() => {
    const getDms = async () => {
      try {
        const res = await fetch("/api/messages/dms");
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        setDMs(data);
      } catch (err) {
        showToast("Error", err.message, "error");
      } finally {
        setLadingDMs(false);
      }
    };
    getDms();
  }, [showToast, setDMs]);

  const handleDMSearch = async (e) => {
    e.preventDefault();
    setSearchingUser(true);
    try {
      const res = await fetch(`/api/users/profile/${searchText}`);
      const searchedUser = await res.json();
      if (searchedUser.error) {
        showToast("Error", searchedUser.error, "error");
        return;
      }
      if (!searchedUser) {
        showToast("Error", "User not found", "error");
        return;
      }
      const messageingYourself = currentUser._id === searchedUser._id;
      if (messageingYourself) {
        showToast("Error", "You cannot message yourself", "error");
        return;
      }

      const dmAlreadyExists = dms.find(
        (dm) => dm.participants[0]._id === searchedUser._id
      );
      if (dmAlreadyExists) {
        setSelectedDM({
          _id: dmAlreadyExists._id,
          userId: searchedUser._id,
          username: searchedUser.username,
          profilePic: searchedUser.profilePic,
        });
        return;
      }
      const mockDM = {
        mock: true,
        lastMessage: {
          text: "",
          sender: "",
        },
        _id: Date.now(),
        participants: [
          {
            _id: searchedUser._id,
            username: searchedUser.username,
            profilePic: searchedUser.profilePic,
          },
        ],
      };
      setDMs((prevDms) => [...prevDms, mockDM]);
    } catch (err) {
      showToast("Error", err.message, "error");
    } finally {
      setSearchingUser(false);
    }
  };

  return (
    <Box
      position={"absolute"}
      left={"50%"}
      width={{ base: "100%", md: "80%", lg: "750px" }}
      transform={"translateX(-50%)"}
      p={4}
    >
      <Flex
        gap={4}
        flexDirection={{
          base: "column",
          md: "row",
        }}
        maxW={{
          small: "400px",
          md: "full",
        }}
        marginX={"auto"}
      >
        <Flex
          flex={30}
          gap={2}
          flexDirection={"column"}
          maxWidth={{
            sm: "250px",
            md: "full",
          }}
          marginX={"auto"}
        >
          <Text
            fontWeight={700}
            color={useColorModeValue("gray.600, gray.400")}
          >
            DM List
          </Text>
          <form onSubmit={handleDMSearch}>
            <Flex alignItems={"center"} gap={2}>
              <Input
                placeholder={"Search for a friend"}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <Button
                size={"sm"}
                onClick={handleDMSearch}
                isLoading={searchingUser}
              >
                <BsSearch />
              </Button>
            </Flex>
          </form>
          {loadingDMs &&
            [0, 1, 2, 3, 4].map((_, i) => (
              <Flex
                key={i}
                gap={4}
                alignItems={"center"}
                p={"1"}
                borderRadius={"md"}
              >
                <Box>
                  <SkeletonCircle size={"10"} />
                </Box>
                <Flex w={"full"} flexDirection={"column"} gap={"3"}>
                  <Skeleton height={"10px"} width={"80px"} />
                  <Skeleton height={"9px"} width={"90%"} />
                </Flex>
              </Flex>
            ))}

          {!loadingDMs &&
            dms.map((dm) => (
              <DM
                key={dm._id}
                isOnline={onlineUserIds.includes(dm.participants[0]._id)}
                dm={dm}
              />
            ))}
        </Flex>
        {!selectedDM?._id && (
          <Flex
            flex={70}
            borderRadius={"md"}
            p={2}
            flexDir={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            height={"400px"}
          >
            <GiConversation size={20} />
            <Text fontSize={20}> Select a friend to start messaging </Text>
          </Flex>
        )}

        {selectedDM?._id && <MessageContainer></MessageContainer>}
      </Flex>
    </Box>
  );
};

export default DMPage;
