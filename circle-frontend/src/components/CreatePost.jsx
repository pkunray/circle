import './CreatePost.css';
import { useRef, useState, useEffect } from "react";
import { AddIcon } from "@chakra-ui/icons";
import { Button, CloseButton, Flex, Image, Input, Textarea, useDisclosure, useColorModeValue } from "@chakra-ui/react";
import { Text, Modal, ModalOverlay, ModalContent, ModalBody, ModalHeader, ModalCloseButton, ModalFooter } from "@chakra-ui/react";
import { FormControl } from "@chakra-ui/react";
import { BsFillImageFill } from "react-icons/bs";
import { useParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import useShowToast from '../hooks/useShowToast';
import userAtom from '../atoms/userAtom';
import postsAtom from '../atoms/postsAtom';

const AVAILABLE_CHARS = 300;
//Add preview image for testing
const previewImage = "";

const CreatePost = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { imageURL, setImageURL } = previewImage;

    const [postContent, setPostContent] = useState('');
    const [postText, setPostText] = useState('');
    const [availableCharacters, setAvailableCharacters] = useState(AVAILABLE_CHARS);
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useRecoilState(postsAtom);

    const { username } = useParams();
    const user = useRecoilValue(userAtom);
    const showToast = useShowToast();
    const textArea = useRef(null);
    const fileContent = useRef(null);

    //Handles and limits input text
    const handleTextChange = (e) => {
        const typedText = e.target.value;

        //Dynamic text area scaling
        textArea.current.style.height = 'auto';
        textArea.current.style.height = `${textArea.current.scrollHeight}px`;

        if (typedText.length > AVAILABLE_CHARS) {
            const postText = typedText.slice(0, AVAILABLE_CHARS);
            setPostContent(postText);
            setAvailableCharacters(0);
        } else {
            setPostContent(typedText);
            setAvailableCharacters(AVAILABLE_CHARS - typedText.length);
        }
    };

    //Handles post publishing 
    const handleCreatePost = async () => {

        /* Access to DB (Posts) required
        setLoading(true);
        
        try {
            const res = await fetch("/api/posts/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ postedBy: user._id, text: postText, img: imageURL }),
            });

            const data = await res.json();

            if (data.error) {
                showToast("Error", data.error, "Data fetching error");
            } else {
                showToast("Success", "Post Shared!", "Posting successful");
    
                if (username === user.username) {
                    setPosts([data, ...posts]);
                }
    
                onClose();
                setPostText("");
                setImageURL("");
            }

        } catch (error) {
            showToast("Error", error, "fetching error");
        } finally {
            setLoading(false);
        }
        */
    };

    // Dynamic textbox scaling
    useEffect(() => {
        if (textArea.current) {
            textArea.current.style.height = 'auto';
            textArea.current.style.height = `${textArea.current.scrollHeight}px`;
        }
    }, [postContent]);

    return (
        <>
            <Button position={"fixed"} bottom={10} right={5} bg={useColorModeValue("gray.300", "gray.dark")} onClick={onOpen} size={{ base: "sm", sm: "md" }}>
                <AddIcon />
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create New Post</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <Textarea
                                ref={textArea}
                                placeholder="content"
                                onChange={handleTextChange}
                                value={postContent}
                                style={{ overflow: 'hidden', resize: 'none' }} // Disable scrollbar and resize handle
                            />
                            <Text className="available-characters">
                                {availableCharacters}/{AVAILABLE_CHARS}
                            </Text>
                            <Input
                                type="file"
                                hidden
                                ref={fileContent}
                                onChange={handleCreatePost}
                            />
                            <BsFillImageFill
                                className="image-icon"
                                size={15}
                                onClick={() => fileContent.current.click()}
                            />
                        </FormControl>
                        {imageURL && (
                            <Flex className="image-container">
                                <Image src={imageURL} alt='img' />
                                <CloseButton className="close-button" onClick={""} />
                            </Flex>
                        )}
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleCreatePost}>
                            Post!
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default CreatePost;