import { Button, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useShowToast from "../hooks/useShowToast";

const HomePage = () => {
    const [currentFeed, setCurrentFeed] = useState([]);
    const [loading, setLoading] = useState(false);
    const showToast = useShowToast();

    useEffect(() => {
        /* Access to DB (feed) required
        const showToast = useShowToast();
        const loadFeed = async () => {
            setLoading(true);
            try {
                const res = await fetch("api/posts/feed");
                const data = await res.json()
            } catch (error) {
                showToast("Error", error.message, "Unable to Load Feed")
            } finally {
                setLoading(false);
            }
        }
        */
    }, [showToast])

    return (
        <Link to={"/roberttest"}>
            <Flex w={"full"} justifyContent={"center"}>
                <Button mx={"auto"}>Visit Profile Page</Button>
            </Flex>
        </Link>
    );
};

export default HomePage;