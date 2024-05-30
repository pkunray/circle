import { useEffect, useState } from "react";
import UserHeader from "../components/UserHeader"
import UserPost from "../components/UserPost";
import { useParams } from "react-router-dom";
import useShowToast from "../hooks/useShowToast";

const UserPage = () => {

  const [user, setUser] = useState(null);
  const {username} = useParams();
  const showToast = useShowToast();

  useEffect(()=>{
    const getUser =async()=>{
      try {
        const res = await fetch(`/api/users/profile/${username}`);
        const data = await res.json();
        if(data.error){
          showToast("Error",data.error,"error");
          return;
        };
        setUser(data);
      }catch (error) {
        showToast("Error",error,"error");
      };
    };
    getUser();

  },[username,showToast]);

  if(!user) return null;

  return <>
    <UserHeader user={user} />
    <UserPost likes={1} replies={2} postImg="/post1.png" postTitle={"Test 1"} />
    <UserPost likes={2} replies={3} postImg="/post2.png" postTitle={"Test 2"} />
    <UserPost likes={4} replies={5} postImg="/post3.jpg" postTitle={"Test 3"} />
    <UserPost likes={6} replies={7} postTitle={"Test 4"} />
  </>
}

export default UserPage;