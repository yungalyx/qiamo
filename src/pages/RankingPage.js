import { Flex, Text, Box, StackDivider, VStack, Tabs, TabPanels, TabList, TabPanel, Tab } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { ImageCard, TransactionCard } from '../components/card'
import { useParams } from 'react-router';
import {Profile} from '../components/profile';
import {CenteredNavBar} from '../components/nav';
import { getFollowing, getLensProfile } from '../api';

const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
}

export default function RankingPage() { 

    const [collections, setCollections] = useState([])
    const [left, setLeft] = useState({})
    const [right, setRight] = useState({})

    const handleVote = ({left}) => {
        if (left) {
            console.log('left clicked')
        } else {
            // we voted for the right one
        }
        
        setCollections(...collections.splice(0, 2))
        setLeft(collections[0])
        setRight(collections[1])
    }
    
    
    useEffect(() => {
        fetch(`https://api.covalenthq.com/v1/1/nft_market/?key=ckey_283a0c7341354286ba303f60e50`).then(res => {
            return res.json()
        }).then(data => {
            if (!data.data.error) {
                const randomArray = shuffleArray(data.data.items)
                setLeft(randomArray[0])
                setRight(randomArray[1])
                setCollections(randomArray.splice(0,2))
            }
        })
    }, [])


    // var EloRating = require('elo-rating')
    // console.log(EloRating.expected(1800, 1800));


    return <div>
        <Box onClick={()=>handleVote(true)}>
            <ImageCard logo_url={left?.first_nft_image_512} name={left?.collection_name} />

        </Box>
       
        <Box onClick={()=>handleVote(false)}>
            <ImageCard logo_url={right?.first_nft_image_512} name={right?.collection_name} />
        </Box>
      
        <button onClick={()=> console.log(collections)}> button </button>
    </div>
}