import { Flex, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import Post from "../components/Post";
import "./HomePage.css";

const HomePage = () => {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [filter, setFilter] = useState('newest');
	const showToast = useShowToast();

	const handleFilterChange = (e) => {
		setFilter(e.target.value);
	};

	const filteredPosts = () => {
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
				console.log(data);
				setPosts(data);
			} catch (error) {
				showToast("Error", error.message, "error");
			} finally {
				setLoading(false);
			}
		};
		getFeedPosts();
	}, [showToast]);

	return (
		<>
			<div className="select-container">
				<h1 className="dropdown-title">Sort Posts:</h1>
				<select value={filter} onChange={handleFilterChange} className="select-dropdown">
					<option value="oldest">Oldest</option>
					<option value="newest">Newest</option>
					<option value="likes">Likes</option>
				</select>
			</div>

			{!loading && posts.length === 0 && <h1>test test test</h1>}
			{loading && (
				<Flex justify='center'>
					<Spinner size='xl' />
				</Flex>
			)}
			<h1>test</h1>

			{filteredPosts().map((post) => (
				<Post key={post._id} post={post} postedBy={post.postedBy} />
			))}
		</>
	);
};

export default HomePage;