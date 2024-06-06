import { Avatar, Flex, Text, Image, Box, Divider, Spinner, Button } from "@chakra-ui/react"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { formatDistanceToNow } from "date-fns"
import { useRecoilState, useRecoilValue } from 'recoil';
import { DeleteIcon } from "@chakra-ui/icons";
import Comment from "../components/Comment"
import Actions from "../components/Actions"
import useGetUserProfile from "../hooks/useGetUserProfile"
import useShowToast from "../hooks/useShowToast"
import userAtom from "../atoms/userAtom"
import postsAtom from "../atoms/postsAtom"
import useDeletePost from "../hooks/useHandleDeletePost"

const PostPage = () => {
  //Use Custom GetUserProfile Hook
  const { user, loading } = useGetUserProfile();
  //Use Custom HandleDeletePost Hook
  const handleDeletePost = useDeletePost();
  const { pid } = useParams();
  const [posts, setPosts] = useRecoilState(postsAtom);
  const showToast = useShowToast();
  const currentUser = useRecoilValue(userAtom);
  const currentPost = posts[0];

  useEffect(() => {
    const getPost = async () => {
      setPosts([]);
      try {
        const res = await fetch(`/api/posts/${pid}`);
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        setPosts([data]);
      } catch (error) {
        showToast("Error", error.message, "error");
      }
    };
    getPost();
  }, [showToast, pid, setPosts]);

  if (!currentPost) return null;

  //Loading Spinner
  if (!user && loading) {
    return (
      <Flex justifyContent={"center"}>
        <Spinner size={"xl"} />
      </Flex>
    );
  }

  return (
    <>
      <Flex>
        <Flex w={"full"} alignItems={"center"} gap={3}>
          <Avatar src={user.profilePic} size={"md"} name='Angelo Merte' />
          <Flex>
            <Text fontSize={"sm"} fontWeight={"bold"}>
              {user.username}
            </Text>
            <Image src='/verified.png' w='4' h={4} ml={4} />
          </Flex>
        </Flex>
        <Flex gap={4} alignItems={"center"}>
          <Text fontSize={"xs"} width={100} textAlign={"right"} color={"gray.light"}>
            {formatDistanceToNow(new Date(currentPost.createdAt))} ago
          </Text>
          {currentUser?._id === user._id && <DeleteIcon size={20}
            cursor={"pointer"}
            onClick={(e) => { e.preventDefault(); handleDeletePost(currentPost, user); }} />}
        </Flex>
      </Flex>

      <Text my={3}>{currentPost.text}</Text>

      <Box borderRadius={6} overflow={"hidden"} border={"1px solid"} borderColor={"gray.light"}>
        <Image src={currentPost.img} w={"full"} />
      </Box>

      <Flex gap={3} my={3}>
        <Actions post={currentPost} />
      </Flex>

      <Divider my={4} />

      <Divider my={4} />
      {currentPost.replies.map((reply) => (
        <Comment key={reply._id} reply={reply} />
      ))}
    </>
  )
}

export default PostPage