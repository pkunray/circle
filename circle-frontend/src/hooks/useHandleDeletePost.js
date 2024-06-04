import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import postsAtom from "../atoms/postsAtom";
import useShowToast from "./useShowToast";

//Custom Hook because usage required inside multiple different files

const useDeletePost = () => {
  const [posts, setPosts] = useRecoilState(postsAtom);
  const showToast = useShowToast();
  const navigate = useNavigate();

  const handleDeletePost = async (post, user) => {
    try {
      if (!window.confirm("Do you want to delete this post?")) {
        return;
      } else {
        const res = await fetch(`/api/posts/${currentPost._id}`, {
          method: "DELETE",
        });
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        showToast("Post deleted", "Post deleted successfully", "success");
        setPosts(posts.filter((p) => p._id !== post._id));
        navigate(`/${user.username}`);
      }
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  return handleDeletePost;
};

export default useDeletePost;