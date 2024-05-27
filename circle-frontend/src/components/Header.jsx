import { Flex, Image, useColorMode, Box } from "@chakra-ui/react";

const Header = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <>
            <Flex justifyContent={"center"} mt={6} mb={2} flexDirection="column" alignItems="center">
                <Image
                    cursor={"pointer"}
                    alt='logo'
                    w={32}
                    h={32}
                    src={colorMode === "dark" ? "/favicon.png" : "/favicon.png"}
                    onClick={toggleColorMode}
                />
            </Flex>
            <Box w="100%" h="2px" bg={colorMode === "dark" ? "white" : "black"} mb={12}></Box>
        </>
    );
};

export default Header;
