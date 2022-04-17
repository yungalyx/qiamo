import { Flex, Text, Box, StackDivider, VStack, Tabs, TabPanels, TabList, Center, TabPanel, Tab } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { ImageCard, TransactionCard } from '../components/card'
import { useParams } from 'react-router';
import {Profile} from '../components/profile';
import {CenteredNavBar} from '../components/nav';
import { getFollowing, getLensProfile } from '../api';
import { dbRef, updateScore } from '../firebase';
import { get, update } from 'firebase/database'
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
    const [data, setData] = useState({})

    const handleVote = (left_win) => {
        // 1. calculate score
        const RL = (left.collection_address in data ? data[left.collection_address].score : 1200)
        const RR = (right.collection_address in data ? data[right.collection_address].score : 1200)
        //console.log('RL', RL)
        //console.log('RR', RR)

        const EL = 1 / (1 + Math.pow(10, (RR - RL) / 400))
        
        const transfer_points = 32*((left_win ? 1 : 0) - EL)
        //console.log('Points Transferred', transfer_points)

        //console.log('Expected Winner:', (RL > RR ? left.collection_name : right.collection_name))
        //console.log('EL:', EL)
        //console.log('Outcome:', (left_win ? 'Left' : 'Right'))
        if (left_win) {
            //console.log('New Scores', RL + transfer_points, RR - transfer_points)
            updateScore(left.collection_address, right.collection_address, RL + transfer_points, RR - transfer_points)
        } else { 
            //console.log('New Scores', RL + transfer_points, RR - transfer_points)
            updateScore(left.collection_address, right.collection_address, RL + transfer_points, RR - transfer_points)
        }
        setLeft(collections[0])
        setRight(collections[1])
        setCollections(collections.slice(2))
    }

    
    
    
    useEffect(() => {
        fetch(`https://api.covalenthq.com/v1/1/nft_market/?key=ckey_283a0c7341354286ba303f60e50`).then(res => {
            return res.json()
        }).then(data => {
            if (!data.data.error) {
                const randomArray = shuffleArray(data.data.items)
                setLeft(randomArray[0])
                setRight(randomArray[1])
                setCollections(randomArray.slice(2))
            }
        })
    }, [])

    useEffect(() => {
        get(dbRef, `projects/`).then((snapshot) => {
            if (snapshot.exists()) {
              console.log(snapshot.val());
              setData(snapshot.val().projects)
            } else {
              console.log("No data available");
            }
          }).catch((error) => {
            console.error(error);
          });
    }, [])


    // var EloRating = require('elo-rating')
    // console.log(EloRating.expected(1800, 1800));


    return <Center w='100vw' h='100vh'>
        <Flex gap='8rem'>
            <Box onClick={()=>handleVote(true)}>
                <ImageCard logo_url={left?.first_nft_image_512} name={left?.collection_name} />
            </Box>
        
            <Box onClick={()=>handleVote(false)}>
                <ImageCard logo_url={right?.first_nft_image_512} name={right?.collection_name} />
            </Box>
        </Flex>
    </Center>
}