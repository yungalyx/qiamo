import React from "react";
import { Link, Flex, Image, Spacer, Heading, Text, Box, Stat, StatGroup, StatLabel, StatNumber, Center, StatHelpText, Skeleton, SkeletonCircle, StatArrow } from '@chakra-ui/react'
import { useNavigate } from "react-router";

const Card = ({name, followers, holders, floor, isFollowing, ...rest}) => {
    const navigate = useNavigate()
    const handleClick = () => { navigate(`/project/${rest.address}/${rest.chain_id}`, {replace: true})}

    return (
        <Flex px={8} py={5} borderWidth='1px' {...rest} gap={10} align="center" _hover={{ shadow: 'md' }} onClick={handleClick}>
            <Image borderRadius='full' boxSize='80px' src={rest.img_url} fallback={<SkeletonCircle size='80px'/>} />
            <Box w='28rem'>
                <Heading size='lg'> {name} </Heading>
            </Box>
            
            <Stat>
                <StatLabel>Followers</StatLabel>
                <StatNumber> 0 </StatNumber>
            </Stat>
            <Stat>
                <StatLabel>Holders</StatLabel>
                <StatNumber> {holders} </StatNumber>
            </Stat>
            <Stat>
                <StatLabel>Floor Price</StatLabel>
                <StatNumber> ${floor.toLocaleString('en-US', {maximumFractionDigits: 2, minimumFractionDigits: 2})} USD </StatNumber>
            </Stat>
        </Flex>
    )    
}

const TokenCard = ({name, logo_url, type, quote, balance}) => {
    return (
        <Flex px={8} py={5} borderWidth='1px' gap={10} align="center" _hover={{ shadow: 'md' }} >
            <Image borderRadius='full' boxSize='80px' src={logo_url} fallback={<SkeletonCircle size='80px'/>} />
            <Box w='28rem'>
                <Heading size='lg'> {name} </Heading>
                <Text> {balance} </Text>
            </Box>
          
            <Stat>
                <StatNumber> ${quote.toLocaleString('en-US')} </StatNumber>
                <StatHelpText>
                    <StatArrow type='increase' />
                    0
                </StatHelpText>
            </Stat>
            
        </Flex>
    )

}

const TransactionCard = ({transactionName, value, from, to, date}) => {
    const event = new Date(date)
    return (
        <Flex px={8} py={5} borderWidth='1px' gap={10} align="center" _hover={{ shadow: 'md' }}>
            <Box w='28rem'>
                <Heading size='md'> {transactionName} </Heading>
                <Text> {event.toString()} </Text>
            </Box>
        
            <Stat>
                <StatNumber> From </StatNumber>
                <StatLabel> {from} </StatLabel>
                
            </Stat>
            <Stat>
                <StatNumber> To </StatNumber>
                <StatLabel>{to}</StatLabel>
                
            </Stat>

        </Flex>
    )
}

const ImageCard = ({logo_url, name}) => {
    return (<Box _hover={{ shadow: 'md' }} p={5} maxW='250px'>
        <Center>
            <Image borderRadius='md' boxSize='200px' src={logo_url} fallback={<Skeleton height='200px'/>}/>
        </Center>
        <Center>
            <Heading> {name} </Heading>
        </Center>
    </Box>)

}

export { Card, TokenCard, TransactionCard, ImageCard }