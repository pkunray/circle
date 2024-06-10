import { Box, Flex, Image, Link, useColorMode, Button } from "@chakra-ui/react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import { AiFillHome } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import { Link as RouterLink } from "react-router-dom";
import authScreenAtom from "../atoms/authAtom";
import { BsFillChatQuoteFill } from "react-icons/bs";
import { MdOutlineSettings } from "react-icons/md";
import useLogout from "../hooks/useLogout";
import { FiLogOut } from "react-icons/fi";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const user = useRecoilValue(userAtom);
  const setAuthScreen = useSetRecoilState(authScreenAtom);
  const logout = useLogout();

  return (
    <>
      <Flex justifyContent={"space-between"} alignItems={"center"} mt={6} mb="12">
        {user && (
          <Link as={RouterLink} to="/">
            <AiFillHome size={24} />
          </Link>
        )}
        {!user && (
          <Link
            as={RouterLink}
            to={"/auth"}
            onClick={() => setAuthScreen("login")}
          >
            Login
          </Link>
        )}

        <Image
          cursor={"pointer"}
          alt="logo"
          w={32}
          h={32}
          src={"/favicon.png"}
          onClick={toggleColorMode}
        />

        {user && (
          <Flex alignItems={"center"} gap={4}>
            <Link as={RouterLink} to={`/${user.username}`}>
              <RxAvatar size={24} />
            </Link>
            <Link as={RouterLink} to={`/dm`}>
              <BsFillChatQuoteFill size={24} />
            </Link>
            <Button size="xm">
              <FiLogOut size={20} onClick={logout} />
            </Button>
          </Flex>
        )}
        {!user && (
          <Link
            as={RouterLink}
            to={"/auth"}
            onClick={() => setAuthScreen("signup")}
          >
            Sign up
          </Link>
        )}
      </Flex>
      <Box
        w="100%"
        h="2px"
        bg={colorMode === "dark" ? "white" : "black"}
        mb={12}
      ></Box>
    </>
  );
};

export default Header;
