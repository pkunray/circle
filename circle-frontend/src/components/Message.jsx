import { Avatar, Flex, Text } from '@chakra-ui/react'
import React from 'react'

const Message = ({ownMessage}) => {
    return (
        <>
            {ownMessage ? (
                <Flex gap={2} alignSelf={"flex-end"}>
                    <Text
                        maxW={"350px"}
                        bg={"blue.400"}
                        borderRadius={"md"}
                        padding={1}>
                        Lorem ipsum dolor similique fuga nihil amet iusto repudiandae possimus a nisi dolore,voluptatem delectus debitis maxime!
                    </Text>
                    <Avatar src='' width="7" height="7" />
                </Flex>
            ) : (
                <Flex gap={2}>
                    <Avatar src='' width="7" height="7" />
                    <Text
                        maxW={"350px"}
                        bg={"gray.400"} color={"black"}
                        borderRadius={"md"}
                        padding={1}>
                        Lorem praesentium officia, nesciunt vitae neque rerum odit optio aperiam!
                    </Text>
                </Flex>
            )
            }
        </>
    )
}

export default Message
