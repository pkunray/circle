import './CreatePost.css';
import { useRef, useState, useEffect } from "react";
import { AddIcon } from "@chakra-ui/icons";
import { Button, CloseButton, Flex, Image, Input, Textarea, useDisclosure, useColorModeValue } from "@chakra-ui/react";
import { Text, Modal, ModalOverlay, ModalContent, ModalBody, ModalHeader, ModalCloseButton, ModalFooter } from "@chakra-ui/react";
import { FormControl } from "@chakra-ui/react";
import { BsFillImageFill } from "react-icons/bs";

const AVAILABLE_CHARS = 300;

const CreatePost = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [postContent, setPostContent] = useState('');
    const [availableCharacters, setAvailableCharacters] = useState(AVAILABLE_CHARS);

    const textArea = useRef(null);
    const fileContent = useRef(null);
    const imgUrl = "";

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
        // Handle create post logic here
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
                        {imgUrl && (
                            <Flex className="image-container">
                                <Image src={imgUrl} alt='img' />
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