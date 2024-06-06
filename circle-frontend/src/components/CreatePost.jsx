import './CreatePost.css';
import { useRef, useState, useEffect } from "react";
import { AddIcon } from "@chakra-ui/icons";
import { Button, CloseButton, Flex, FormControl, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Textarea, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import { BsFillImageFill } from "react-icons/bs";
import { useParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import userAtom from '../atoms/userAtom';
import postsAtom from '../atoms/postsAtom';
import usePreviewImg from '../hooks/usePreviewImg';
import useShowToast from '../hooks/useShowToast';

const AVAILABLE_CHARS = 300;

const CreatePost = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { handleImageChange, imageUrl, setImageUrl } = usePreviewImg();
    const [postContent, setPostContent] = useState('');
    const [availableCharacters, setAvailableCharacters] = useState(AVAILABLE_CHARS);
    const [loading, setLoading] = useState(false);
    const { username } = useParams();
    const [posts, setPosts] = useRecoilState(postsAtom);

    const user = useRecoilValue(userAtom);
    const textArea = useRef(null);
    const fileRef = useRef(null);
    const showToast = useShowToast();

    // Handles and limits text input
    const handleTextChange = (e) => {
        const typedText = e.target.value;
        if (typedText.length > AVAILABLE_CHARS) {
            const displayedText = typedText.slice(0, AVAILABLE_CHARS);
            setPostContent(displayedText);
            setAvailableCharacters(0);
        } else {
            setPostContent(typedText);
            setAvailableCharacters(AVAILABLE_CHARS - typedText.length);
        }
    };

    // Handles post publishing
    const handleCreatePost = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/posts/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ postedBy: user._id, text: postContent, img: imageUrl }),
            });
            const data = await res.json();
            if (data.error) {
                showToast("Error", data.error, "error");
                return;
            }
            showToast("Success", "Post created successfully", "success");
            if (username === user.username) {
                setPosts([data, ...posts]);
            }
            onClose();
            setPostContent("");
            setImageUrl("");
        } catch (error) {
            showToast("Error", error, "fetching error");
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        if (textArea.current) {
            textArea.current.style.height = 'auto';
            textArea.current.style.height = `${textArea.current.scrollHeight}px`;
        }
    }, [postContent]);

    return (
        <>
            <Button position={"fixed"}
                bottom={10}
                right={5}
                bg={useColorModeValue("gray.300", "gray.dark")}
                onClick={onOpen}
                size={{ base: "sm", sm: "md" }}>
                <AddIcon />
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create New Post</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <Textarea ref={textArea} placeholder="Content" onChange={handleTextChange} value={postContent} style={{ overflow: 'hidden', resize: 'none' }} />
                            <Text className="available-characters">
                                {availableCharacters}/{AVAILABLE_CHARS}
                            </Text>
                            <Input type="file" hidden ref={fileRef} onChange={handleImageChange} />
                            <BsFillImageFill className="image-icon" size={15} onClick={() => fileRef.current.click()} />
                        </FormControl>
                        {imageUrl && (
                            <Flex className="image-container" mt={5} w={"full"} position={"relative"}>
                                <Image src={imageUrl} alt='Image' />
                                <CloseButton onClick={() => { setImageUrl(""); }} bg={"gray.800"} position={"absolute"} top={2} right={2} />
                            </Flex>
                        )}
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={handleCreatePost} isLoading={loading}>
                            Post
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default CreatePost;