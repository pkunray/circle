import { Button, Flex, FormControl, FormLabel, Heading, Input, Stack, useColorModeValue, Avatar, Center } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import usePreviewImg from "../hooks/usePreviewImg";
import useShowToast from "../hooks/useShowToast";

export default function UpdateProfilePage() {
    const [user, setUser] = useRecoilState(userAtom);
    const [inputs, setInputs] = useState({
        name: user.name,
        username: user.username,
        email: user.email,
        bio: user.bio,
        password: "",
    });
    const fileRef = useRef(null);
    const [updating, setUpdating] = useState(false);

    const showToast = useShowToast();
    const { handleImageChange, imageUrl, removeImage } = usePreviewImg();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs((prevInputs) => ({
            ...prevInputs,
            [name]: value,
        }));
    };

    const handleRemoveAvatar = () => {
        removeImage();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (updating) return;
        setUpdating(true);
        try {
            const res = await fetch(`/api/users/update/${user._id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...inputs, profilePic: imageUrl }),
            });
            const data = await res.json();
            if (data.error) {
                showToast("Error", data.error, "error");
                return;
            }
            showToast("Success", "Profile updated successfully", "success");
            setUser(data);
            localStorage.setItem("user-circle", JSON.stringify(data));
        } catch (error) {
            showToast("Error", error, "error");
        } finally {
            setUpdating(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Flex align="center" justify="center" my={6}>
                <Stack spacing={4} w="full" maxW="md" bg={useColorModeValue("white", "gray.dark")} rounded="xl" boxShadow="lg" p={6}>
                    <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
                        User Profile Edit
                    </Heading>
                    <FormControl id="userName">
                        <Stack direction={["column", "row"]} spacing={6}>
                            <Center>
                                <Avatar size="xl" boxShadow="md" src={imageUrl || user.profilePic} />
                            </Center>
                            <Center w="full">
                                <Stack direction="column" spacing={2} w="full">
                                    <Button w="full" onClick={() => fileRef.current.click()}>
                                        Change Avatar
                                    </Button>
                                    <Button onClick={handleRemoveAvatar} w="full">
                                        Remove Avatar
                                    </Button>
                                </Stack>
                                <Input type="file" hidden ref={fileRef} onChange={handleImageChange} />
                            </Center>
                        </Stack>
                    </FormControl>
                    {Object.entries(inputs).map(([key, value]) => (
                        <FormControl key={key}>
                            <FormLabel>{key[0].toUpperCase() + key.slice(1)}</FormLabel>
                            <Input
                                placeholder={`Your ${key}`}
                                name={key}
                                value={value}
                                onChange={handleChange}
                                _placeholder={{ color: "gray.500" }}
                                type={key === "password" ? "password" : "text"}
                            />
                        </FormControl>
                    ))}
                    <Stack spacing={6} direction={["column", "row"]}>
                        <Button
                            bg="red.400"
                            color="white"
                            w="full"
                            _hover={{
                                bg: "red.500",
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            bg="blue.400"
                            color="white"
                            w="full"
                            _hover={{
                                bg: "blue.500",
                            }}
                            type="submit"
                            isLoading={updating}
                        >
                            Submit
                        </Button>
                    </Stack>
                </Stack>
            </Flex>
        </form>
    );
}
