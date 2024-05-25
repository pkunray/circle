import UserHeader from "../components/UserHeader"
import UserPost from "../components/UserPost";

const UserPage = () => {
  return <>
    <UserHeader />
    <UserPost likes={1} replies={2} postImg="/post1.png" postTitle={"Test 1"} />
    <UserPost likes={2} replies={3} postImg="/post2.png" postTitle={"Test 2"} />
    <UserPost likes={4} replies={5} postImg="/post3.jpg" postTitle={"Test 3"} />
    <UserPost likes={6} replies={7} postTitle={"Test 4"} />
  </>
}

export default UserPage;