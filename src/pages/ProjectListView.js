import { Flex, Link, StackDivider, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Card } from '../components/card'
import {CenteredNavBar, NavBar} from '../components/nav';


export default function ProjectListView() {
    const [collections, setCollections] = useState([])
    
    useEffect(() => {
        fetch(`https://api.covalenthq.com/v1/1/nft_market/?key=ckey_283a0c7341354286ba303f60e50`).then(res => {
            return res.json()
        }).then(data => {
            if (!data.data.error) {
                setCollections(data.data.items)
                console.log(data.data.items)
            }
        })
    }, [])

 

    return (
        <VStack
            p={8}
            spacing={4}
            align='stretch'
        >
        {collections.map(i => {
            let {
                chain_id,
                collection_name,
                collection_address,
                volume_quote_24h,
                contract_deployment_at,
                market_cap_quote,
                transaction_count_alltime, 
                unique_wallet_purchase_count_alltime,
                floor_price_quote_7d, 
                first_nft_image_512,
            } = i

            //const jsoni = JSON.stringify(i)
            return (
                <Card
                    name={collection_name}
                    holders={unique_wallet_purchase_count_alltime}
                    floor={floor_price_quote_7d}
                    img_url={first_nft_image_512}
                    address={collection_address}
                    chain_id={chain_id}
                    market_cap_quote={market_cap_quote}
                />
            )
        })}
    </VStack>
    )
}