import { useState, useEffect } from "react"
import { useMoralis } from "react-moralis"
import NFTCard from "../components/NFTCard"
import { getNFTMarketplaceContract } from "../utils/contract"

const Home = () => {
    const { isWeb3Enabled, account } = useMoralis()
    const [nfts, setNfts] = useState([])

    useEffect(() => {
        console.log("isWeb3Enabled", isWeb3Enabled)
        console.log("account", account)
        if (isWeb3Enabled) {
            console.log("loadNFTs called", loadNFTs)
            loadNFTs()
        }
    }, [isWeb3Enabled])

    const loadNFTs = async () => {
        const contract = await getNFTMarketplaceContract()
        console.log("contract called")
        const listings = await contract.getAllListings()
        console.log("listings", listings)
        setNfts(listings)
    }

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-8">NFT Marketplace</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {nfts.map((nft, index) => (
                    <NFTCard key={index} nft={nft} isOwner={nft?.seller?.toString()?.toLowerCase() === account?.toString()} account={account} />
                ))}
            </div>
        </div>
    )
}

export default Home
