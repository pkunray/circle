import { Avatar, Box, Flex, Image, Text } from "@chakra-ui/react"
import { BsThreeDots } from "react-icons/bs"
import { Link } from "react-router-dom"

function UserPost() {
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
                    <Text fontStyle={"sm"}>This is my first post</Text>
                    <Box borderRadius={6} overflow={"hidden"} border={"1px solid"} borderColor={"gray.light"}>
                        <Image src="/post1.png" w={"full"}></Image>
                    </Box>
                </Flex>
            </Flex>
        </Link>
    )
}

export default UserPost