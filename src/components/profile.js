import React, { useEffect } from "react";
import { Text, Icon, Flex, Image, Spacer, Tag, Heading, Box, Skeleton, SkeletonCircle, Link, Code, SkeletonText } from '@chakra-ui/react'
import { EmailIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { FaInstagram, FaTwitter } from 'react-icons/fa'
import { apolloClient } from "../api";
import { gql } from '@apollo/client';


const Profile = ({name, address, collection, holders, floor, isFollowing, img_url, ...rest}) => {


    useEffect(() => {

    })
   
    return (
        <Box p={12}>
            <Image borderRadius='full' src={img_url} boxSize='120px' fallback={<SkeletonCircle size='120px'/>}/>
            <Box pt={5}>
                <Heading size='lg'> {name} </Heading>
                <Flex gap={8} align='center'>
                    <Text> {address} <ExternalLinkIcon w={4} h={4}/> </Text>
                    {!collection &&
                        <Flex gap={4}>
                            <EmailIcon w={6} h={6}/>
                            <Icon as={FaInstagram} w={6} h={6}/>
                            <Icon as={FaTwitter} w={6} h={6}/>
                        </Flex>
                    }
                </Flex>
                
             
                {collection && <Text> Created By: <Link color='teal.500' href={`/user/${rest.owner}/${rest.chain_id}`}> {rest.owner} </Link></Text>}
                <Flex gap={10}> 
                    <Text> 0 Followers </Text>
                    {!collection && <Text> 0 Following </Text>}
                </Flex>
            </Box>
        </Box>
    )    
}

const SkeletonProfile = () => {
    return <Skeleton>
           <Box p={12}>
            <SkeletonCircle size='120px'/>
            <Box pt={5}>
                <SkeletonText size='lg'/>
                <Flex gap={8} align='center'>
                   <SkeletonText />
                   <SkeletonText />
                </Flex>
                <SkeletonText />
                <SkeletonText />
            </Box>
        </Box>
    </Skeleton>
}
export {Profile, SkeletonProfile}; 