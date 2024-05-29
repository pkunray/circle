import Actions from "./Actions"
import { Avatar, Box, Flex, Image, Text } from "@chakra-ui/react"
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { formatDistanceToNow } from "date-fns"
import { useRecoilState, useRecoilValue } from "recoil"
import DeleteIcon from "@chakra-ui/icons"
import useShowToast from "../hooks/useShowToast"
import userAtom from "../atoms/userAtom"
import postsAtom from "../atoms/postsAtom"

function Post({ post, userID }) {
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useRecoilState(postsAtom);
    const showToast = useShowToast();
    const navigate = useNavigate();
    const currentUser = useRecoilValue(userAtom);

    //Get User and Load Profile by UserID
    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await fetch("/api/users/profile/" + userID);
                const data = await res.json();
                if (data.error) {
                    showToast("Error", data.error, "error");
                    return;
                }
                setUser(data);
            } catch (error) {
                showToast("Error", error.message, "error");
            }
        };
        getUser();
    }, [showToast, userID]);

    const handleDeletePost = async (e) => {
        try {
            //Prevent default action of wrapped component: Open Link
            e.preventDefault();
            if (!window.confirm("Do you want to delete this post?")) {
                return;
            } else {
                const res = await fetch(`/api/posts/${post._id}`, {
                    method: "DELETE",
                });
                const data = await res.json();
                if (data.error) {
                    showToast("Error", data.error, "error");
                    return;
                }
                showToast("Post delted", "Post deleted", "Post deleted");
                setPosts(posts.filter((p) => p._id !== post._id));
            }
        } catch (error) {
            showToast("Error", error.message, "error");
        }
    }

    return (
        <Link to={`/${user.username}/post/${post._id}`}>
            <Flex gap={3} mb={4} py={5}>
                <Flex flexDirection={"column"} alignItems={"center"}>
                    <Avatar
                        size='md'
                        name={user.name}
                        src={user?.profilePic}
                        onClick={(e) => {
                            console.log("clicke");
                            e.preventDefault();
                            navigate(`/${user.username}`);
                        }}
                    />

                    <Box w='1px' h={"full"} bg='gray.light' my={2}></Box>
                    <Box position={"relative"} w={"full"}>
                        {post.replies.length === 0 && <Text textAlign={"center"}>🥱</Text>}
                        {post.replies[0] && (
                            <Avatar
                                size='xs'
                                name='John doe'
                                src={post.replies[0].userProfilePic}
                                position={"absolute"}
                                top={"0px"}
                                left='15px'
                                padding={"2px"}
                            />
                        )}

                        {post.replies[1] && (
                            <Avatar
                                size='xs'
                                name='John doe'
                                src={post.replies[1].userProfilePic}
                                position={"absolute"}
                                bottom={"0px"}
                                right='-5px'
                                padding={"2px"}
                            />
                        )}

                        {post.replies[2] && (
                            <Avatar
                                size='xs'
                                name='John doe'
                                src={post.replies[2].userProfilePic}
                                position={"absolute"}
                                bottom={"0px"}
                                left='4px'
                                padding={"2px"}
                            />
                        )}
                    </Box>
                </Flex>

                <Flex flex={1} flexDirection={"column"} gap={2}>
                    <Flex justifyContent={"space-between"} w={"full"}>
                        <Flex w={"full"} alignItems={"center"}>
                            <Text
                                fontSize='md'
                                name={user.name}
                                src={user?.profilePic}
                                onClick={(e) => {
                                    e.preventDefault();
                                    navigate(`/${user.username}`);
                                }}>
                                {user?.username}
                            </Text>
                            <Image src='/verified.png' w={4} h={4} ml={1} />
                        </Flex>
                        <Flex gap={4} alignItems={"center"}>
                            <Text fontSize={"xs"} width={25} textAlign={"right"} color={"gray.light"}>
                                {formatDistanceToNow(new Date(post.createdAt))} ago
                            </Text>
                            {currentUser?._id === user._id && <DeleteIcon size={20} onClick={handleDeletePost} />}
                        </Flex>
                    </Flex>

                    <Text fontSize={"sm"}>{post.text}</Text>
                    {post.img && (
                        <Box borderRadius={6} overflow={"hidden"} border={"1px solid"} borderColor={"gray.light"}>
                            <Image src={post.img} w={"full"} />
                        </Box>
                    )}

                    <Flex gap={3} my={1}>
                        <Actions post={post} />
                    </Flex>
                </Flex>
            </Flex>
        </Link>
    )
}

export default Post