import React from "react";
import { Link, Flex, Spacer, Heading, Text, Center, Box } from '@chakra-ui/react'

const Paths = ["home", "explore", "notifications", "messages", "saved", "profile", "more"]
const AdditionalPaths = ['about', 'ecosystem', 'community', 'blog', 'FAQ']

const NavBar = ({children}) => {
    return (
        <Flex p='8' align='center'> 
            <Box >
                <Heading>
                    Qiamo
                </Heading>
            </Box>
            <Spacer />
            <Box>
                {Paths.map(i => {
                    return <Link href={`/${i}`} key={i}>
                        <a> {i} </a>
                    </Link>
                })}
            </Box>
        </Flex>
    )
}

const centeredPaths = ['explore', 'messages', 'Qiamo', 'profile', 'setting']
const CenteredNavBar = () => {
    return (
        <Center bgGradient='linear-gradient(120deg, #ddd6f3, #faaca8)'>
            <Flex p='2' gap={40} align='center'> 
                {centeredPaths.map(i => {
                    if (i == 'Qiamo') {
                        return <Heading> {i} </Heading>
                    } else {
                        return <Link href={`/${i}`} key={i}>
                            <a> {i} </a>
                        </Link>
                    }  
                })}
            </Flex>
        </Center>
      
    )
    
}

export { NavBar, CenteredNavBar }