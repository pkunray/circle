import "./HomePage.css";
import React, { useEffect, useState } from "react";
import { Box, Flex, Spinner } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import useShowToast from "../hooks/useShowToast";
import postsAtom from "../atoms/postsAtom";

const HomePage = () => {
    const [currentFeed, setCurrentFeed] = useRecoilState(postsAtom);
    const [loading, setLoading] = useState(true);
    const showToast = useShowToast();

    useEffect(() => {
        const loadFeed = async () => {
            setLoading(true);
            setCurrentFeed([]);
            try {
                const res = await fetch("api/posts/feed");
                const data = await res.json();
                if (data.error) {
                    showToast("Error", data.error, "error");
                    return;
                }
                console.log("test");
                console.log(data);
                //setCurrentFeed(data);
            } catch (error) {
                showToast("Error", error.message, "Unable to Load Feed")
            } finally {
                setLoading(false);
            }
        };
        loadFeed();
    }, [showToast, setCurrentFeed]);

    return (
        <Flex className="home-page-container">
            <Box className="home-content">
                {!loading && currentFeed.length === 0 && (
                    <h1 className="nothing-to-display">Nothing to display, start following someone!</h1>
                )}
                {loading && (
                    <Flex className="spinner-container">
                        <Spinner size='xl' />
                    </Flex>
                )}
                
                {/*
                {currentFeed.map((currentFeed) => (
                    <Post />
                ))}
                */}
                
            </Box>
            <Box className="sidebar"></Box>
        </Flex>
    );
};

export default HomePage;