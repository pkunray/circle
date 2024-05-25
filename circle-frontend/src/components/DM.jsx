import { Avatar, AvatarBadge, Flex, Stack, WrapItem, useColorModeValue, Text, Image } from '@chakra-ui/react'
import React from 'react'

const DM = () => {
  return (
    <Flex
      gap={4}
      alignItems={"center"}
      padding={1}
      _hover={{
        cursor: "pointer",
        bg: useColorModeValue("gray.600", "gray.light"),
        color: "white"
      }}
      borderRadius={"md"}
    >
      <WrapItem>
        {/* todo: get avatar from database */}
        <Avatar size={
          {
            base: "xs",
            sm: "sm",
            md: "md"
          }
        } src='https://bit.ly/broken-link'>
          <AvatarBadge boxSize="1em" bg="green.500" />
        </Avatar>

      </WrapItem>
      <Stack direction={"column"} fontSize={"sm"}>
        <Text fontWeight="700" display={"flex"} alignItems={"center"}>
          Sample Friend Name
          <Image src="/verified.png" width={4} height={4} marginLeft={1} />
        </Text>
        <Text fontSize={"xs"} display={"flex"} alignItems={"center"} gap={1}>
          Hello world!
        </Text>
      </Stack>
    </Flex>
  )
}

export default DM
