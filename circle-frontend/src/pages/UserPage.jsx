import UserHeader from "../components/UserHeader"
import useShowToast from "../hooks/useShowToast";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";
import Post from "../components/Post";

const UserPage = () => {
  const { username } = useParams()
  const [loadPosts, setLoadPosts] = useState(true);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const showToast = useShowToast();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch('/api/users/profile/${username}');
        const data = await res.json();
        if (data.error) {
          useShowToast("Error", data.error, "error");
          return;
        }
        setUser(data)
      } catch (error) {
        useShowToast("Error", error, "error");
      }
    };

    const getPosts = async () => {
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
    getUser();
    getPosts();
  }, [username, showToast]);


  return <>
    <UserHeader user={user} />
    {!loadPosts && posts.length === 0 && <h1>No Posts Available</h1>}
    {loadPosts && (
      <Flex justifycontent={"center"} my={10}>
        <Spinner size={"x1"} />
      </Flex>
    )}

    {posts.map((post) => (
      <Post key={post._id} post={post} userID={post.userID} />
    ))}
  </>
}

export default UserPage;