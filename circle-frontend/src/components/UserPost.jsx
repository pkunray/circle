import Actions from "./Actions"
import { Avatar, Box, Flex, Image, Text } from "@chakra-ui/react"
import { BsThreeDots } from "react-icons/bs"
import { Link } from "react-router-dom"
import { useState } from "react"

function UserPost({ postImg, postTitle, likes, replies }) {
    const [liked, setLiked] = useState(false);
    return (
        <Link to={"/robert/post/1"}>
            <Flex gap={3} mb={4} py={5}>
                <Flex flexDirection={"column"} alignItems={"center"}>
                    <Avatar size="md" name="Robert" src="/robert-avatar.jpeg"></Avatar>
                    <Box w={"1px"} h={"full"} bg={"gray.light"} my={2} ></Box>
                    <Box position={"relative"} w={"full"}>
                        <Avatar size={"xs"} name={"Robert"} src="https://bit.ly/ryan-florence" position={"absolute"}
                            top={"0px"} left={"15px"} padding={"2px"} />
                        <Avatar size={"xs"} name={"Robert"} src="https://bit.ly/kent-c-dodds" position={"absolute"}
                            bottom={"0px"} right={"-5px"} padding={"2px"} />
                        <Avatar size={"xs"} name={"Robert"} src="https://bit.ly/prosper-baba" position={"absolute"}
                            bottom={"0px"} left={"4px"} padding={"2px"} />
                    </Box>
                </Flex>
                <Flex flex={1} flexDirection={"column"} gap={2}>
                    <Flex justifyContent={"space-between"} w={"full"}>
                        <Flex w={"full"} alignItems={"center"}>
                            <Text fontSize={"sm"} fontWeight={"bold"}>robert</Text>
                            <Image src="/verified.png" w={4} h={4}></Image>
                        </Flex>
                        <Flex gap={4} alignItems={"center"}>
                            <Text fontStyle={"sm"} color={"gray.light"}>1d</Text>
                            <BsThreeDots />
                        </Flex>
                    </Flex>
                    <Text fontStyle={"sm"}>{postTitle}</Text>

                    {postImg && (
                        <Box borderRadius={6} overflow={"hidden"} border={"1px solid"} borderColor={"gray.light"}>
                            <Image src={postImg} w={"full"}></Image>
                        </Box>
                    )}

                    <Flex gap={3} my={1}>
                        <Actions liked={liked} setLiked={setLiked} />
                    </Flex>

                    <Flex gap={2} alignItems={"center"}>
                        <Text color={"gray.light"} fontSize={"sm"}>{replies} replies</Text>
                        <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"}></Box>
                        <Text color={"gray.light"} fontSize={"sm"}>{likes} likes</Text>
                    </Flex>

                </Flex>
            </Flex>
        </Link>
    )
}

export default UserPost