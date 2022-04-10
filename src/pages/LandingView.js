import React, { useEffect, useState } from 'react'
import {
    ChakraProvider,
    Box,
    Text,
    Link,
    VStack,
    Heading,
    Code,
    Button,
    Grid,
    theme,
    Center,
  } from '@chakra-ui/react';
import { NavBar } from '../components/nav';
import Web3 from 'web3';

import { generateChallenge, authenticateLens } from '../api';

const detectCurrentProvider = () => {
    let provider;
    if (window.ethereum) {
        provider = window.ethereum;
      
    } else if (window.web3) {
        provider = window.web3.currentProvider;
    } else {
        console.log("Non-Etherum Browser Detected, Please try metamask.")
    }
    return provider;
}

const metamaskConnect = async() => {
    try {
        const currentProvider = detectCurrentProvider()
        if (currentProvider) {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            })
            console.log(accounts)
            const web3 = new Web3(currentProvider)
            const userAccount = await web3.eth.getAccounts();
            const chainId = await web3.eth.getChainId();
            const account = userAccount[0];
            let ethBalance = await web3.eth.getBalance(account); 
           
            
            ethBalance = web3.utils.fromWei(ethBalance, 'ether'); //Convert balance to wei
            if (userAccount.length === 0) {
                alert('Please connect to meta mask');
            } else {
            
                const challenge = await generateChallenge(userAccount[0])
                const signature = await web3.eth.personal.sign(challenge.data.challenge.text, userAccount[0])

                const accessTokens = await authenticateLens(userAccount[0], signature)
                console.log(accessTokens)
            }

        }
    } catch (err) {
        console.log(err)
    }
}


// THIS IS THE AUTH / LANDING PAGE
export default function LandingPage() {
    return (
        <Box bgGradient='linear-gradient(120deg, #ddd6f3, #faaca8)'>
            <NavBar/>
            <Center w='100vw' h='100vh'>
            <VStack spacing={8}>
                <Heading size='3xl'>  The web3 way to build communities. </Heading>
                <Link
                    color="teal.500"
                    href="/explore"
                    fontSize="2xl"
                    > Join now
                </Link>
                <Button onClick={metamaskConnect}> Connect with Metamask </Button>
                <Text>
                   
                </Text>
            </VStack>
            </Center>

        </Box>
    )
  }
  