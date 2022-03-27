import { Flex, Text, Box, StackDivider, VStack, Tabs, TabPanels, TabList, TabPanel, Tab } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { TokenCard, TransactionCard } from '../components/card'
import { useParams } from 'react-router';
import {Profile} from '../components/profile';
import {CenteredNavBar} from '../components/nav';
import { getFollowing, getLensProfile } from '../api';

export default function ProfileDetailView() {

    
    const { address, chain_id } = useParams();

    const [tokens, setTokens] = useState([])
    const [nfts, setNFTs] = useState([])
    const [transactions, setTransactions] = useState([])

    useEffect(() => {
        getLensProfile(address)
        Promise.all([
            fetch(`https://api.covalenthq.com/v1/${chain_id}/address/${address}/balances_v2/?key=ckey_283a0c7341354286ba303f60e50&nft=true&no-nft-fetch=false`).then(res => res.json()),
            fetch(`https://api.covalenthq.com/v1/${chain_id}/address/${address}/transactions_v2/?key=ckey_283a0c7341354286ba303f60e50`).then(res => res.json())
        ]).then(allResponse => {
            setTokens(allResponse[0].data.items.filter(i => i.type != 'nft'))
            setNFTs(allResponse[0].data.items.filter(i => i.type == 'nft'))
            setTransactions(allResponse[1].data.items)
        })
        
    }, [])

    
    return <Box>
        <CenteredNavBar />
        <Profile address={address} chain_id={chain_id}/>
        <Tabs isFitted variant='enclosed' px={12}>  
            <TabList mb='1em'>
                <Tab> NFTs </Tab>
                <Tab> Tokens </Tab>
                <Tab> Activities </Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    {nfts.map(i => {
                        return <TokenCard name={i.contract_name} logo_url={i.logo_url} quote={i.quote} balance={(Number(i.balance)/(10^(Number(i.contract_decimal))))}/>
                    })}
                </TabPanel>
                <TabPanel>
                    {tokens.map(i => {
                        return <TokenCard name={i.contract_name} logo_url={i.logo_url} quote={i.quote} balance={(Number(i.balance)/(10^(Number(i.contract_decimal))))}/>
                    })}
                </TabPanel>
                <TabPanel>
                    {transactions.map(i => {
                        return <TransactionCard
                            transactionName={i.log_events[0].decoded.name}
                            date={i.block_signed_at}
                            from={i.from_address}
                            to={i.to_address}
                            value={i.value} 
                        />
                    })}
                </TabPanel>
            </TabPanels>
        </Tabs>
    </Box>
    
}