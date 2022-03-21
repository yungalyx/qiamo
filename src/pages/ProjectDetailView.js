import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {Profile, SkeletonProfile} from '../components/profile'
import { Box, HStack, Heading, Grid, Flex, Container, StatLabel, Stat, StatNumber, Skeleton, SkeletonText } from '@chakra-ui/react'
import NavBar, { CenteredNavBar } from '../components/nav'
import { TeamMember } from '../components/avatar'


const ProjectDetailView = () => {

    const { address, chain_id } = useParams();
    const [owner, setOwner] = useState();
    const [collectionData, setCollectionData] = useState() 
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        Promise.all([
            fetch(`https://api.covalenthq.com/v1/${chain_id}/address/${address}/transactions_v2/?key=ckey_283a0c7341354286ba303f60e50&block-signed-at-asc=true`).then(res => res.json()),
            fetch(`https://api.covalenthq.com/v1/${chain_id}/nft_market/collection/${address}/?key=ckey_283a0c7341354286ba303f60e50`).then(res => res.json())
        ]).then(allResponse => {
            const transactionData = allResponse[0]
            const historicalData = allResponse[1]
            console.log(transactionData)
            console.log(historicalData)
            setCollectionData(historicalData.data.items[0])
            setOwner(transactionData.data.items[0].from_address)
            setLoading(false)
        })
    }, [])

    
    return <Box>
        <CenteredNavBar />
        {loading? <SkeletonProfile /> : <Profile name={collectionData.collection_name} img_url={collectionData.fifth_nft_image_512} address={address} owner={owner} chain_id={chain_id} collection/> }
        <HStack spacing={24} px={12}>
            <Box>
                <Heading>Team </Heading>
                <Flex w='35vw' wrap='wrap'>
                    <TeamMember name='Testing' />
                    <TeamMember name='Engineer' />
                    <TeamMember name='Designer' />
                    <TeamMember name='Ecosystem' />
                </Flex>
            </Box>
            <Box>
                <Heading>Info </Heading>
                <Flex w='40vw' wrap='wrap' py={4}>
                    <Box>
                        {loading? 
                        <InfoSection /> :
                        <Stat>
                            <StatLabel>
                                Unique NFTs Sold Today
                            </StatLabel>
                            <StatNumber>
                                {collectionData.unique_token_ids_sold_count_day}
                            </StatNumber>
                        </Stat>
                        }
                    </Box>        
                </Flex>
            </Box>
        </HStack>
    </Box>
}


const InfoSection = () => {
    return <Box>
        <SkeletonText />
        <SkeletonText />
        <SkeletonText />
        <SkeletonText />
    </Box>
}

export default ProjectDetailView;