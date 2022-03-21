import React from "react";
import { Link, Flex, Image, Spacer, Heading, Text, Box, Avatar, AvatarBadge, Icon } from '@chakra-ui/react'
import { useNavigate } from "react-router";
import { FaWallet, FaTwitter } from 'react-icons/fa';
import { EmailIcon, ExternalLinkIcon } from "@chakra-ui/icons";


const TeamMember = ({name, role, image_url, twitter, wallet}) => {
    return <Flex align='center' gap={4} p={4}>
        <Avatar name={name} src={image_url} />
        <Box>
            <Text> {name} </Text>
            <Text> {role} </Text>
        </Box>
        <Icon as={FaTwitter} w={6} h={6}/>
        <Icon as={FaWallet} w={6} h={6}/>
    </Flex>
}

export {TeamMember}