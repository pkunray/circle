import { Avatar, Box, Flex, Link, Menu, MenuButton, MenuItem, MenuList, Portal, Text, VStack, useToast } from "@chakra-ui/react";
import { BsInstagram } from "react-icons/bs";
import { CgMoreO } from "react-icons/cg";
import { useColorMode } from "@chakra-ui/react";

const UserHeader = () => {
    const { colorMode } = useColorMode();
    const toast = useToast();
    const copyURL = () => {
        const currentURL = window.location.href;
        navigator.clipboard.writeText(currentURL).then(() => {
            toast({ description: 'URL Copied!' });
        });
    };

    return (
        <VStack gap={4} alignItems={"start"}>
            <Flex justifyContent={"space-between"} w={"full"}>
                <Box>
                    <Text fontSize={"2xl"} fontWeight={"bold"}>
                        Robert Smith
                    </Text>
                    <Flex gap={2} alignItems={"center"}>
                        <Text fontSize={"sm"}>robert</Text>
                        <Text fontSize={"xs"} bg={colorMode === "dark" ? "gray.dark" : "white"} color={"gray.light"} p={1} borderRadius={"full"}>circle.net</Text>
                    </Flex>
                </Box>
                <Box>
                    <Avatar name="Robert" src="/robert-avatar.jpeg" size={"xl"} />
                </Box>
            </Flex>
            <Text>CEO</Text>
            <Flex width={"full"} justifyContent={"space-between"}>
                <Flex gap={2} alignItems={"center"}>
                    <Text color={"gray.light"}>5K followers</Text>
                    <Box w={1} h={1} bg={"gray.light"} borderRadius={"full"}></Box>
                    <Link color={"gray.light"}>instagram.com</Link>
                </Flex>
                <Flex>
                    <Box
                        className="icon-container"
                        sx={{
                            _hover: {
                                backgroundColor: colorMode === "dark" ? "gray.700" : "gray.200",
                            },
                        }}
                    >
                        <BsInstagram size={24} cursor={"pointer"} />
                    </Box>
                    <Box
                        className="icon-container"
                        sx={{
                            _hover: {
                                backgroundColor: colorMode === "dark" ? "gray.700" : "gray.200",
                            },
                        }}
                    >
                        <Menu>
                            <MenuButton>
                                <CgMoreO size={24} cursor={"pointer"} />
                            </MenuButton>
                            <Portal>
                                <MenuList bg={colorMode === "dark" ? "black" : "white"}>
                                    <MenuItem bg={colorMode === "dark" ? "black" : "white"} onClick={copyURL}>Copy Link</MenuItem>
                                </MenuList>
                            </Portal>
                        </Menu>
                    </Box>
                </Flex>
            </Flex>

            <Flex width={"full"}>
                <Flex flex={1} borderBottom={"1.5px solid white"} justifyContent={"center"} pb={3} cursor={"pointer"}>
                    <Text fontWeight={"bold"}>Circles</Text>
                </Flex>
                <Flex flex={1} borderBottom={"1px solid gray"} justifyContent={"center"} color={"gray.white"} pb={3} cursor={"pointer"}>
                    <Text fontWeight={"bold"}>Replies</Text>
                </Flex>

            </Flex>
        </VStack>
    );
};

export default UserHeader;
