import "./Post.css";
import { Avatar, Box, Flex, Image, Text } from "@chakra-ui/react"
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { formatDistanceToNow } from "date-fns"
import { useRecoilState, useRecoilValue } from "recoil"
import Actions from "./Actions"
import { DeleteIcon } from "@chakra-ui/icons";
import useShowToast from "../hooks/useShowToast"
import userAtom from "../atoms/userAtom"
import useDeletePost from "../hooks/useHandleDeletePost"
import postsAtom from "../atoms/postsAtom"

function Post({ post, postedBy }) {
    //Use Custom HandleDeletePost Hook
    const handleDeletePost = useDeletePost();
    const [user, setUser] = useState(null);
    const currentUser = useRecoilValue(userAtom);
    const [posts, setPosts] = useRecoilState(postsAtom);
    const showToast = useShowToast();
    const navigate = useNavigate();

    //Get User and Load Profile by UserID
    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await fetch("/api/users/profile/" + postedBy);
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
    }, [postedBy, showToast]);

    if (!user) return null;

    return (
        <div className="post-layout">
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
                            }
                            }
                        />

                        <Box w='1px' h={"full"} bg='gray.light' my={2}></Box>
                        <Box position={"relative"} w={"full"}>
                            {post.replies.length === 0 && <Text textAlign={"center"}>◯</Text>}
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
                                <Text fontSize={"xs"} width={100} textAlign={"right"} color={"gray.light"}>
                                    {formatDistanceToNow(new Date(post.createdAt))} ago
                                </Text>
                                {currentUser?._id === user._id && <DeleteIcon size={20} onClick={(e) => { e.preventDefault(); handleDeletePost(post, user); }} />}
                            </Flex>
                        </Flex>

                        <Text fontSize={"sm"}>{post.text}</Text>
                        {post.img && (
                            <Box borderRadius={6} overflow={"hidden"} border={"1px solid"} borderColor={"gray.light"}>
                                <Image src={post.img} w={"full"} />
                            </Box>
                        )}
                        {post.video && (
                            <Box borderRadius={6} overflow={"hidden"} border={"1px solid"} borderColor={"gray.light"}>
                                <video src={post.video} controls />
                            </Box>
                        )}

                        <Flex gap={3} my={1}>
                            <Actions post={post} />
                        </Flex>
                    </Flex>
                </Flex>
            </Link>
        </div>
    )
}

export default Post;