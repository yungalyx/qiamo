import { ApolloClient, InMemoryCache } from '@apollo/client';
import { gql } from '@apollo/client';


const APIURL = 'https://api-mumbai.lens.dev/';

const apolloClient = new ApolloClient({
    uri: APIURL,
    cache: new InMemoryCache(),
})

export const testQuery = async() => {
    const query = `
        query {
            ping
        }
    `;

    const response = await apolloClient.query({
        query: gql(query),
    })

    console.log('lens example data', response);
}


export const getFollowing = async(walletAddress) => {
    const query = `query($request: FollowingRequest!) {
        following(request: $request) { 
                    items {
               profile {
                  id
                  name
                  bio
                  location
                  website
                  twitterUrl
                  handle
                  picture {
                    ... on NftImage {
                      contractAddress
                      tokenId
                      uri
                      verified
                    }
                    ... on MediaSet {
                      original {
                        url
                        width
                        height
                        mimeType
                      }
                      medium {
                        url
                        width
                        height
                        mimeType
                      }
                      small {
                        url
                        width
                        height
                        mimeType
                      }
                    }
                  }
                  coverPicture {
                    ... on NftImage {
                      contractAddress
                      tokenId
                      uri
                      verified
                    }
                    ... on MediaSet {
                      original {
                        url
                        width
                        height
                        mimeType
                      }
                      small {
                        width
                        url
                        height
                        mimeType
                      }
                      medium {
                        url
                        width
                        height
                        mimeType
                      }
                    }
                  }
                  ownedBy
                  depatcher {
                    address
                    canUseRelay
                  }
                  stats {
                    totalFollowers
                    totalFollowing
                    totalPosts
                    totalComments
                    totalMirrors
                    totalPublications
                    totalCollects
                  }
                  followModule {
                    ... on FeeFollowModuleSettings {
                      type
                      amount {
                        asset {
                          name
                          symbol
                          decimals
                          address
                        }
                        value
                      }
                      recipient
                    }
                }
              }
            }
           pageInfo {
              prev
              next
              totalCount
           }
            }
      }
    `;

    const response = await apolloClient.query({
        query: gql(query),
        variables: {
            request: {
                address: walletAddress,
                limit: 10,
            }
        }
    })
    console.log(response)
}

export const getLensProfile = async(walletAddress) => {
  const query =`
  query Profiles {
    profiles(request: { ownedBy: ["${walletAddress}"], limit: 10 }) {
      items {
        id
        name
        bio
        location
        website
        twitterUrl
        picture {
          ... on NftImage {
            contractAddress
            tokenId
            uri
            verified
          }
          ... on MediaSet {
            original {
              url
              mimeType
            }
          }
          __typename
        }
        handle
        coverPicture {
          ... on NftImage {
            contractAddress
            tokenId
            uri
            verified
          }
          ... on MediaSet {
            original {
              url
              mimeType
            }
          }
          __typename
        }
        ownedBy
        depatcher {
          address
          canUseRelay
        }
        stats {
          totalFollowers
          totalFollowing
          totalPosts
          totalComments
          totalMirrors
          totalPublications
          totalCollects
        }
        followModule {
          ... on FeeFollowModuleSettings {
            type
            amount {
              asset {
                symbol
                name
                decimals
                address
              }
              value
            }
            recipient
          }
          __typename
        }
      }
      pageInfo {
        prev
        next
        totalCount
      }
    }
  }
  `

  const response = await apolloClient.query({
    query: gql(query),
  })

  console.log(response)
}



export const recommendedProfile = async() => {
  const query = `query RecommendedProfiles {
    recommendedProfiles {
     id
        name
        bio
        location
        website
        twitterUrl
        picture {
          ... on NftImage {
            contractAddress
            tokenId
            uri
            verified
          }
          ... on MediaSet {
            original {
              url
              mimeType
            }
          }
          __typename
        }
        handle
        coverPicture {
          ... on NftImage {
            contractAddress
            tokenId
            uri
            verified
          }
          ... on MediaSet {
            original {
              url
              mimeType
            }
          }
          __typename
        }
        ownedBy
        depatcher {
          address
          canUseRelay
        }
        stats {
          totalFollowers
          totalFollowing
          totalPosts
          totalComments
          totalMirrors
          totalPublications
          totalCollects
        }
        followModule {
          ... on FeeFollowModuleSettings {
            type
            amount {
              asset {
                symbol
                name
                decimals
                address
              }
              value
            }
            recipient
          }
          __typename
        }
    }
  }`

  const response = await apolloClient.query({
    query: gql(query),
  })

  console.log(response)

}