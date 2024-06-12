import { useEffect, useState } from "react";
import UserHeader from "../components/UserHeader";
import { useParams } from "react-router-dom";
import useShowToast from "../hooks/useShowToast";
import { Flex, Spinner } from "@chakra-ui/react";
import Post from "../components/Post";
import useGetUserProfile from "../hooks/useGetUserProfile";
import { useRecoilState, useRecoilValue } from "recoil";
import postsAtom from "../atoms/postsAtom";
import userAtom from "../atoms/userAtom";

const UserPage = () => {

  const { user, loading } = useGetUserProfile();
  const { username } = useParams();
  const showToast = useShowToast();
  const currentUser = useRecoilValue(userAtom);
  const [posts, setPosts] = useRecoilState(postsAtom);
  const [loadPosts, setLoadPosts] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const getPosts = async () => {
      if (!user) return;
      setLoadPosts(true);
      try {
        const res = await fetch(`/api/posts/user/${username}`);
        if (!res.ok) {
          throw new Error("User not found");
        }
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        showToast("Error", error.message, "error");
        setPosts([]);
      } finally {
        setLoadPosts(false);
      }
    };

    getPosts();
  }, [username, showToast, setPosts, user]);

  if (!user && loading) {
    return (
      <Flex justifyContent={"center"}>
        <Spinner size={"xl"} />
      </Flex>
    );
  }

  if (!user && !loading) {
    return (
      <Flex justifyContent="center" alignItems="center">
        <h1>User not found.</h1>
      </Flex>
    );
  }

  return (
    <>
      <UserHeader user={user} currentUser={currentUser} setIsFollowing={setIsFollowing} />

      {currentUser._id !== user._id && !isFollowing && (
        <Flex justifyContent="center" alignItems="center">
          <h1>Follow this user to see their posts.</h1>
        </Flex>
      )}

      {(currentUser._id === user._id || isFollowing) && (
        <>
          {!loadPosts && posts.length === 0 && (
            <Flex justifyContent="center" alignItems="center">
              <h1>User has no posts.</h1>
            </Flex>
          )}

          {loadPosts && (
            <Flex justifyContent={"center"} my={12}>
              <Spinner size={"xl"} />
            </Flex>
          )}

          {posts.map((post) => (
            <Post key={post._id} post={post} postedBy={post.postedBy} />
          ))}
        </>
      )}
    </>
  );
};

export default UserPage;
