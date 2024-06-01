import { Avatar, Box, Button, Flex, Link, Menu, MenuButton, MenuItem, MenuList, Portal, Text, VStack, useToast } from "@chakra-ui/react";
import { BsInstagram } from "react-icons/bs";
import { CgMoreO } from "react-icons/cg";
import {Link as RouterLink} from "react-router-dom";
import { useState } from "react";
import useShowToast from "../hooks/useShowToast";

const UserHeader = () => {
    const currentUser = useRecoilValue(userAtom);
    const toast = useToast();
    const [following,setFollowing] = useState(user.followers.includes(currentUser._id));
    const showToast = useShowToast();
    const [updating,setUpdating] = useState(false);

    const copyURL = () => {
        const currentURL = window.location.href;
        navigator.clipboard.writeText(currentURL).then(() => {
            toast({ description: 'URL Copied!' })
        });
    };

    const handleFollowUnfollow = async() => {
        if(!currentUser){
            showToast("Error","Login to follow","error")
            return;
        }
        if(updating) return;
        setUpdating(true);
        try{
            const res = await fetch(`/api/users/follow/${user._id}`, {
                method: "POST",
                headers: {"Content-Type":"application/json"
                }
            })
            const data = await res.json();
            if(data.error){
                showToast("Error",data.error,"error")
                return;
            }

            if(following){
                showToast("User unfollowed!", `Unfollowed &{user.name}`,"success");
                user.followers.pop();
            }else{
                showToast("User followed!", `Followed &{user.name}`,"success");
                user.followers.push(currentUser._id);
            }
            setFollowing(!following);

        } catch (error) {
            showToast("Error",error,"error");
        } finally{
            setUpdating(false);
        };
    };

    return (
        <VStack gap={4} alignItems={"start"}>
            <Flex justifyContent={"space-between"} w={"full"}>
                <Box>
                    <Text fontSize={"2xl"} fontWeight={"bold"}>
                        {user.name}
                    </Text>
                    <Flex gap={2} alignItems={"center"}>
                        <Text fontSize={"sm"}>{user.username}</Text>
                        <Text fontSize={"xs"} bg={"gray.dark"} color={"gray.light"} p={1} borderRadius={"full"}>circle.net</Text>
                    </Flex>
                </Box>
                <Box>
                    {user.profilePic && (
                        <Avatar
                        name={user.name}
                        src={user.profilePic}
                        size={"xl"}
                        />
                    )}
                    {!user.profilePic && (
                        <Avatar
                        name={user.name}
                        src="https://bit.ly/broken-link"
                        size={"xl"}
                        />
                    )}
                </Box>
            </Flex>
            <Text>{user.bio}</Text>
            {currentUser._id === user._id && (
                <Link as={RouterLink} to='/update'>
                <Button size={"sm"}>Update your Profile</Button>
                </Link>
            )}
            {!currentUser._id === user._id && 
                <Button size={"sm"} onClick={handleFollowUnfollow} isLoading={updating}>
                    {following ? "Unfollow" : "Follow"}
                </Button>
            }
            <Flex width={"full"} justifyContent={"space-between"}>
                <Flex gap={2} alignItems={"center"}>
                    <Text color={"gray.light"}>{user.followers.lenght}</Text>
                    <Box w={1} h={1} bg={"gray.light"} borderRadius={"full"}></Box>
                    <Link color={"gray.light"}>instagram.com</Link>
                </Flex>
                <Flex>
                    <Box className="icon-container">
                        <BsInstagram size={24} cursor={"pointer"} />
                    </Box>
                    <Box className="icon-container">
                        <Menu>
                            <MenuButton>
                                <CgMoreO size={24} cursor={"pointer"} />
                            </MenuButton>
                            <Portal>
                                <MenuList bg={"gray.dark"}>
                                    <MenuItem bg={"gray.dark"} onClick={copyURL}>Copy Link</MenuItem>
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
