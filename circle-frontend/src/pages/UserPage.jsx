import UserHeader from "../components/UserHeader"
import UserPost from "../components/UserPost";
import Post from "../components/Post";

const UserPage = () => {
  return <>
    <UserHeader />
    <Post likes={1} replies={2} postImg="/post1.png" postTitle={"Test 1"} />
    <Post likes={2} replies={3} postImg="/post2.png" postTitle={"Test 2"} />
    <Post likes={4} replies={5} postImg="/post3.jpg" postTitle={"Test 3"} />
    <Post likes={6} replies={7} postTitle={"Test 4"} />
  </>
}

export default UserPage;