import { Flex, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import Post from "../components/Post";
import "./HomePage.css";
import { useRecoilState } from "recoil";
import postsAtom from "../atoms/postsAtom";

const HomePage = () => {
    const [posts, setPosts] = useRecoilState(postsAtom);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('newest');
    const showToast = useShowToast();

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    const filteredPosts = () => {
        if (!Array.isArray(posts)) {
            return [];
        }
        if (filter === 'oldest') {
            return posts.slice().sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        } else if (filter === 'newest') {
            return posts.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        } else if (filter === 'likes') {
            return posts.slice().sort((a, b) => b.likes.length - a.likes.length);
        }
        return posts;
    };


    useEffect(() => {
        const getFeedPosts = async () => {
            setLoading(true);
            try {
                const res = await fetch("/api/posts/feed");
                const data = await res.json();
                if (data.error) {
                    showToast("Error", data.error, "error");
                    return;
                }
                setPosts(data);
            } catch (error) {
                showToast("Error", error.message, "error");
            } finally {
                setLoading(false);
            }
        };
        getFeedPosts();
    }, [showToast, setPosts]);

    return (
        <>
            <div className="header-container">
                <div className="select-container">
                    <h1 className="dropdown-title">Sort Posts:</h1>
                    <select value={filter} onChange={handleFilterChange} className="select-dropdown">
                        <option value="oldest">Oldest</option>
                        <option value="newest">Newest</option>
                        <option value="likes">Likes</option>
                    </select>
                </div>
                <div className="counter-container">
                    <span>Total Posts: {filteredPosts().length}</span>
                </div>
            </div>

            <div style={{ textAlign: 'center' }}>
                {!loading && posts.length === 0 && <h1>Follow some users to see the feed.</h1>}
            </div>

            {loading && (
                <Flex justify='center'>
                    <Spinner size='xl' />
                </Flex>
            )}

            {filteredPosts().map((post) => (
                <Post key={post._id} post={post} postedBy={post.postedBy} />
            ))}
        </>
    );
};

export default HomePage;
