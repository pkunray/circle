import { Flex, useColorModeValue, Text, Image, Divider, Avatar, SkeletonCircle, Skeleton } from '@chakra-ui/react'
import React from 'react'
import Message from './Message';
import MessageInput from './MessageInput';

const MessageContainer = () => {

    const loadingMessages = false;
    return (
        <Flex flex={"70"}
            bg={useColorModeValue("gray.200", "gray.dark")}
            borderRadius={"md"}
            flexDirection={"column"}
            padding={1}>

            {/* message header */}
            <Flex w={"full"} h={12} alignItems={"center"} gap={2}>
                <Avatar src='' size="sm" />
                <Text display={"flex"} alignItems={"center"}>
                    Sample Friend - Mike <Image src='/verified.png' alt="verified" w={4} h={4} ml={1} />
                </Text>
            </Flex>
            <Divider />

            {/* message body */}
            <Flex flex={1}
                flexDirection={"column"}
                gap={4} marginY={4} maxH={"400px"}
                overflowY={"auto"}
                padding={2}>
                {
                    loadingMessages && (
                        [...Array(5)].map((_, i) => (
                            <Flex key={i}
                                gap={2}
                                alignItems={"center"}
                                p={"1"}
                                borderRadius={"md"}
                                alignSelf={i % 2 === 0 ? "flex-start" : "flex-end"}>
                                {
                                    i % 2 === 0 && <SkeletonCircle size={7} />
                                }
                                <Flex flexDir={"column"} gap={2}>
                                    <Skeleton height={"8px"} width={"250px"} />
                                    <Skeleton height={"8px"} width={"250px"} />
                                    <Skeleton height={"8px"} width={"250px"} />
                                </Flex>
                                {
                                    i % 2 !== 0 && <SkeletonCircle size={7} />
                                }
                            </Flex>
                        )
                        )
                    )}
                <Message ownMessage={true}/>
                <Message ownMessage={false}/>
                <Message ownMessage={true}/>
                <Message ownMessage={false}/>
                <Message ownMessage={true}/>
                <Message ownMessage={true}/>
                <Message ownMessage={false}/>
                <Message ownMessage={true}/>
            </Flex>
            <Divider />
            
            <MessageInput />
        </Flex>
    )
}

export default MessageContainer
