import { Box, Button, Flex, Input, Skeleton, SkeletonCircle, Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { BsSearch } from 'react-icons/bs'
import DM from '../components/DM';
import { GiConversation } from 'react-icons/gi';
import MessageContainer from '../components/MessageContainer';

const DMPage = () => {

  const loadingMessages = false;

  return (
    <Box position={"absolute"}
         left={"50%"}
         width={ {base: "100%", md: "80%", lg: "750px"} }
         transform={"translateX(-50%)"}
         p={4}>
      <Flex gap = {4}
            flexDirection = {{
              base: "column",
              md: "row"
            }}
            maxW={{
              small: "400px",
              md: "full"
            }}
            marginX={"auto"}>
        <Flex flex={30} gap={2} 
              flexDirection={"column"}
              maxWidth={{
                sm: "250px",
                md: "full"
              }}
              marginX={"auto"}>
          <Text fontWeight={700} color={useColorModeValue("gray.600, gray.400")}>
            DM List
          </Text>
          <form>
            <Flex alignItems={"center"} gap={2}>
              <Input placeholder={"Search for a friend"} />
              <Button size={"sm"}>
                <BsSearch />
              </Button>
            </Flex>
          </form>
          {
            loadingMessages && (
              [0,1,2,3,4].map((_, i) => (
                <Flex key={i} gap={4} alignItems={"center"} p={"1"} borderRadius={"md"}>
                  <Box>
                    <SkeletonCircle size={"10"} />
                  </Box>
                  <Flex w={"full"} flexDirection={"column"} gap={"3"}>
                    <Skeleton height={"10px"} width={"80px"} />
                    <Skeleton height={"9px"} width={"90%"} />
                  </Flex>
                </Flex>
              )
            )
          )}

          <DM />
          <DM />
          <DM />

        </Flex>
        {/* <Flex flex={70}
              borderRadius={"md"} 
              p={2} 
              flexDir={"column"} 
              alignItems={"center"}
              justifyContent={"center"}
              height={"400px"}>

          <GiConversation size={20}/>
          <Text fontSize={20}> Select a friend to start messaging </Text>
              
        </Flex> */}
        <MessageContainer>

        </MessageContainer>
      </Flex>
    </Box>
  )
}

export default DMPage
