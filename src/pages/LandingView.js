import React, { useEffect, useState } from 'react'
import {
    ChakraProvider,
    Box,
    Text,
    Link,
    VStack,
    Heading,
    Code,
    Grid,
    theme,
    Center,
  } from '@chakra-ui/react';
import { NavBar } from '../components/nav';

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
                <Text>
                   
                </Text>
            </VStack>
            </Center>

        </Box>
      
       
    )
  }
  