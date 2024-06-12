import { useState } from "react";
import { Box, Flex, Image, Input, IconButton, Button, useColorMode, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from "@chakra-ui/react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import userAtom from "../atoms/userAtom";
import { AiFillHome, AiOutlineArrowLeft, AiOutlineSearch } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import { Link as RouterLink } from "react-router-dom";
import authScreenAtom from "../atoms/authAtom";
import { BsFillChatQuoteFill } from "react-icons/bs";
import useLogout from "../hooks/useLogout";
import { FiLogOut } from "react-icons/fi";
import { useColorModeValue } from "@chakra-ui/react";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const user = useRecoilValue(userAtom);
  const setAuthScreen = useSetRecoilState(authScreenAtom);
  const logout = useLogout();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [showSearchModal, setShowSearchModal] = useState(false);

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchNavigate = () => {
    navigate(`/${searchTerm}`);
    setShowSearchModal(false);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const hoverColor = useColorModeValue("gray.200", "gray.700");

  return (
    <>
      <Flex justifyContent={"space-between"} alignItems={"center"} mt={6} mb="12">
        <Flex alignItems={"center"} gap={2}>
          {!user && (
            <HoverButton as={RouterLink} to="/auth" onClick={() => setAuthScreen("login")} hoverColor={hoverColor}>
              Login
            </HoverButton>
          )}

          {user && (
            <HoverButton onClick={handleGoBack} hoverColor={hoverColor}>
              <AiOutlineArrowLeft size={24} />
            </HoverButton>
          )}
          {user && (
            <HoverButton as={RouterLink} to="/" hoverColor={hoverColor}>
              <AiFillHome size={24} />
            </HoverButton>
          )}
          {user && (
            <Flex alignItems="center">
              <IconButton
                icon={<AiOutlineSearch size={24} />}
                aria-label="Search"
                variant="ghost"
                onClick={() => setShowSearchModal(true)}
                _hover={{ bg: hoverColor }}
              />
            </Flex>
          )}
        </Flex>

        <Image
          cursor={"pointer"}
          alt="logo"
          w={32}
          h={32}
          src={"/favicon.png"}
          onClick={toggleColorMode}
        />

        {user && (
          <Flex alignItems={"center"} gap={2}>
            <HoverButton as={RouterLink} to={`/${user.username}`} hoverColor={hoverColor}>
              <RxAvatar size={24} />
            </HoverButton>
            <HoverButton as={RouterLink} to="/dm" hoverColor={hoverColor}>
              <BsFillChatQuoteFill size={24} />
            </HoverButton>
            <HoverButton onClick={logout} hoverColor={hoverColor}>
              <FiLogOut size={24} />
            </HoverButton>
          </Flex>
        )}

        {!user && (
          <HoverButton as={RouterLink} to="/auth" onClick={() => setAuthScreen("signup")} hoverColor={hoverColor}>
            Sign up
          </HoverButton>
        )}
      </Flex>

      <Modal isOpen={showSearchModal} onClose={() => setShowSearchModal(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Search User</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Enter username"
              value={searchTerm}
              onChange={handleSearchInputChange}
            />
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleSearchNavigate}>Search</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Box
        w="100%"
        h="2px"
        bg={colorMode === "dark" ? "white" : "black"}
        mb={12}
      ></Box>
    </>
  );
};

const HoverButton = ({ children, hoverColor, ...rest }) => {
  return (
    <Box
      as="button"
      display="inline-flex"
      alignItems="center"
      p={2}
      borderRadius="md"
      transition="background 0.3s"
      _hover={{ bg: hoverColor }}
      {...rest}
    >
      <Box>{children}</Box>
    </Box>
  );
};

export default Header;
