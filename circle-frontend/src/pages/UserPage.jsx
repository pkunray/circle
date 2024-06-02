import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Flex, Spinner } from "@chakra-ui/react";
import UserHeader from "../components/UserHeader"
import useShowToast from "../hooks/useShowToast";
import Post from "../components/Post";
import useGetUserProfile from "../hooks/useGetUserProfile";

const UserPage = () => {
  //Use Custom GetUserProfile Hook
  const { user, loading } = useGetUserProfile();
  const { username } = useParams()
  const [posts, setPosts] = useState([]);
  const showToast = useShowToast();
  const [loadPosts, setLoadPosts] = useState(true);

  useEffect(() => {
    const getPosts = async () => {
      if (!user) return;
      setLoadPosts(true);
      try {
        const res = await fetch(`/api/posts/user/${username}`);
        const data = await res.json();
        console.log(data);
        setPosts(data);
      } catch (error) {
        showToast("Error", error.message, "error");
        setPosts([]);
      } finally {
        setLoadPosts(false);
      }
    }
    getPosts();
  }, [username, showToast]);

  if (!user && !loading) return <h1>User not found</h1>;

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
      <UserHeader user={user} />
      {!loadPosts && posts.length === 0 && <h1>User has not posts.</h1>}
      {loadPosts && (
        <Flex justifyContent={"center"} my={12}>
          <Spinner size={"xl"} />
        </Flex>
      )}
      {posts.map((post) => (
        <Post key={post._id} post={post} postedBy={post.postedBy} />
      ))}
    </>
  )
}

export default UserPage;