import { AddIcon } from "@chakra-ui/icons"
import { Button, CloseButton, Flex, Image, Input, Textarea, position, useColorModeValue, useDisclosure } from "@chakra-ui/react"
import { useRef, useState } from "react"
import { Text, Modal, ModalOverlay, ModalContent, ModalBody, ModalHeader, ModalCloseButton, ModalFooter } from "@chakra-ui/react"
import { FormControl } from "@chakra-ui/react"
import { BsFillImageFill } from "react-icons/bs"

const AVA_CHAR = 200;

const CreatePost = () => {
    const { isOpen, onOpen, onClose } = useDisclosure(useDisclosure)
    const [postContent, setPostContent] = useState('')
    const fileContent = useRef(null);
    const imgUrl = "";

    const [availableCharacters, setavailableCharacters] = useState(AVA_CHAR);

    const handleTextChange = (e) => {
        const inputText = e.target.value;
        if (inputText > AVA_CHAR) {
        //check available characters logic
        }
    }
    const handleCreatePost = async () => { }

    return (
        <>
            <Button
                position={"fixed"}
                bottom={10}
                right={10}
                leftIcon={<AddIcon />}
                bg={useColorModeValue("gray.300", "gray.dark")}
                onClick={onOpen}>
                Post
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        New Post
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <Textarea
                                placeholder="content"
                                onChange={handleTextChange}
                                value={postContent}>
                            </Textarea>
                            <Text
                                fontSize="xs"
                                fontWeight="bold"
                                textAlign={"right"}
                                margin={"1"}
                                color={"grey.800"}>
                                200/200
                            </Text>
                            <Input
                                type="file"
                                hidden
                                ref={fileContent}
                                onChange={""}>
                            </Input>
                            <BsFillImageFill
                                style={{ marginLeft: "5px", cursor: "pointer" }}
                                size={15}
                                onClick={() => fileContent.current.click()}>
                            </BsFillImageFill>
                        </FormControl>
                        {imgUrl && (
                            <Flex
                                mt={5}
                                w={"full"}
                                position={"relative"}>
                                <Image
                                    src={imgUrl}
                                    alt='img' />
                                <CloseButton
                                    onClick={""}
                                    bg={"gray.800"}
                                    position={"absolute"}
                                    top={2}
                                    right={2} />
                            </Flex>
                        )}
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            colorScheme='blue'
                            mr={3}
                            onClick={handleCreatePost}>
                            Post!
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default CreatePost