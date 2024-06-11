import "./UserHeader.css";
import { Avatar, Box, Button, Divider, Flex, Link, Menu, MenuButton, MenuItem, MenuList, Portal, Text, VStack, useToast, useColorMode } from "@chakra-ui/react";
import { BsInstagram } from "react-icons/bs";
import { CgMoreO } from "react-icons/cg";
import { Link as RouterLink } from "react-router-dom";
import userAtom from "../atoms/userAtom";
import { useRecoilValue } from "recoil";
import useFollowUnfollow from "../hooks/useFollowUnfollow";

const UserHeader = ({ user }) => {
    const { colorMode } = useColorMode();
    const currentUser = useRecoilValue(userAtom);
    const toast = useToast();
    const { handleFollowUnfollow, following, updating } = useFollowUnfollow(user);

    if (!currentUser) {
        return null;
    }

    const copyURL = () => {
        const currentURL = window.location.href;
        navigator.clipboard.writeText(currentURL).then(() => {
            toast({ description: 'URL Copied!' });
        });
    };

    return (
        <VStack className="user-header-container" gap={4} alignItems={"start"}>
            <Flex justifyContent={"space-between"} w={"full"}>
                <Box>
                    <Text paddingBottom="10px" fontSize={"2xl"} fontWeight={"bold"}>
                        {user.name}
                    </Text>
                    <Flex gap={2} alignItems={"center"}>
                        <Text fontSize={"sm"}> {user.username}</Text>
                        <Text fontSize={"sm"} bg={colorMode === "dark" ? "gray.dark" : "white"} p={1} borderRadius={"10px"}>circle.net</Text>
                    </Flex>
                    <Box h={2} />
                    <Flex className="follow-text">
                        <Text>
                            Followers: <Text as="span" className="follow-number">{user.followers.length}</Text>
                        </Text>
                        <Divider orientation="vertical" height="24px" borderColor={colorMode === "dark" ? "white" : "black"} mx={2} borderWidth={"1px"} />
                        <Text>
                            Following: <Text as="span" className="follow-number">{user.following.length}</Text>
                        </Text>
                    </Flex>
                </Box>
                <Box>
                    {user.profilePic ? (
                        <Avatar
                            name={user.name}
                            src={user.profilePic}
                            size={"xl"}
                        />
                    ) : (
                        <Avatar
                            name={user.name}
                            src="https://bit.ly/broken-link"
                            size={"xl"}
                        />
                    )}
                </Box>
            </Flex>
            <Text className="bio-header">About Me:</Text>
            <Text className="user-bio"> {user.bio}</Text>

            <Flex width={"full"} justifyContent={"space-between"} alignItems={"center"}>
                {currentUser._id === user._id ? (
                    <Link as={RouterLink} to='/update'>
                        <Button size={"sm"} bg={colorMode === "dark" ? "gray.dark" : "white"}>Update your Profile</Button>
                    </Link>
                ) : (
                    <Button size={"sm"} onClick={handleFollowUnfollow} isLoading={updating} bg={colorMode === "dark" ? "gray.dark" : "white"}>
                        {following ? "Unfollow" : "Follow"}
                    </Button>
                )}
                <Flex gap={2}>
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

            <Flex className="user-header-spins" width={"full"}>
                <Flex flex={1} justifyContent={"center"} pb={3} cursor={"pointer"}>
                    <Text fontWeight={"bold"}>Spins</Text>
                </Flex>
            </Flex>
        </VStack>
    );
};

export default UserHeader;
