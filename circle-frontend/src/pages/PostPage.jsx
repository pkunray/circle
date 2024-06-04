import { Avatar, Flex, Text, Image, Box, Divider, Spinner, Button } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { formatDistanceToNow } from "date-fns"
import { useRecoilValue } from "recoil"
import { DeleteIcon } from "@chakra-ui/icons";
import Comment from "../components/Comment"
import Actions from "../components/Actions"
import useGetUserProfile from "../hooks/useGetUserProfile"
import useShowToast from "../hooks/useShowToast"
import userAtom from "../atoms/userAtom"
import useDeletePost from "../hooks/useHandleDeletePost"

const PostPage = () => {
  //Use Custom GetUserProfile Hook
  const { user, loading } = useGetUserProfile();
  //Use Custom HandleDeletePost Hook
  const handleDeletePost = useDeletePost();
  const { pid } = useParams();
  const [post, setPost] = useState(null);
  const showToast = useShowToast();
  const currentUser = useRecoilValue(userAtom);

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await fetch(`/api/posts/${pid}`);
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        console.log(data);
        setPost(data);
      } catch (error) {
        showToast("Error", error.message, "error");
      }
    };
    getPost();
  }, [showToast, pid]);

  if (!post) return null;

  // Loading Spinner
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
            {formatDistanceToNow(new Date(post.createdAt))} ago
          </Text>
          {currentUser?._id === user._id && <DeleteIcon size={20}
            cursor={"pointer"}
            onClick={(e) => { e.preventDefault(); handleDeletePost(post, user); }} />}
        </Flex>
      </Flex>

      <Text my={3}>{post.text}</Text>

      <Box borderRadius={6} overflow={"hidden"} border={"1px solid"} borderColor={"gray.light"}>
        <Image src={post.img} w={"full"} />
      </Box>

      <Flex gap={3} my={3}>
        <Actions post={post} />
      </Flex>

      <Divider my={4} />

      <Flex justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Text fontSize={"2xl"}>test</Text>
          <Text color={"gray.light"}>test test test</Text>
        </Flex>
        <Button>Get</Button>
      </Flex>

      <Divider my={4} />
      
      {post.replies.map((reply) => (
        <Comment key={reply._id} reply={reply} />
      ))}
    </>
  )
}

export default PostPage