// import { useState } from "react"
// import { ethers } from "ethers"
// import { useMoralis } from "react-moralis"
// import { getNFTMarketplaceContract } from "../utils/contract"
// import placeholderNft from "../public/placeholder-nft.png"

// const NFTCard = ({ nft, isOwner, account }) => {
//     console.log("nft", nft)
//     console.log("isOwner", isOwner)
//     console.log("nft.seller", nft.seller)
//     console.log("nft.tokenId", ethers.BigNumber.from(nft.tokenId))
//     console.log("nft.nftAddress", nft.nftAddress)
//     console.log("nft.price", ethers.utils.formatEther(nft.price))
//     console.log("account", account)
//     const { isWeb3Enabled } = useMoralis()
//     const [showModal, setShowModal] = useState(false)
//     const [newPrice, setNewPrice] = useState("")

//     const handleUpdateListing = async () => {
//         if (!isWeb3Enabled) return

//         const contract = await getNFTMarketplaceContract()
//         try {
//             const tx = await contract.updateListing(
//                 nft.nftAddress,
//                 nft.tokenId,
//                 ethers.utils.parseEther(newPrice)
//             )
//             await tx.wait()
//             alert("Listing updated successfully!")
//             setShowModal(false)
//         } catch (error) {
//             console.error("Error updating listing:", error)
//             alert("Error updating listing. Please try again.")
//         }
//     }

//     const handleBuyNFT = async () => {
//         if (!isWeb3Enabled) return

//         const contract = await getNFTMarketplaceContract()
//         try {
//             const tx = await contract.buyItem(nft.nftAddress, nft.tokenId, {
//                 value: nft.price,
//             })
//             await tx.wait()
//             alert("NFT purchased successfully!")
//         } catch (error) {
//             console.error("Error buying NFT:", error)
//             alert("Error buying NFT. Please try again.")
//         }
//     }

//     return (
//         <div className="border rounded-lg p-4">
//             <img src={placeholderNft} alt="NFT" className="w-full h-48 object-cover mb-4" />
//             <h3 className="text-lg font-semibold mb-2">NFT #{ethers.BigNumber.from(nft.tokenId).toNumber()}</h3>
//             <p className="mb-2">Price: {ethers.utils.formatEther(nft.price)} ETH</p>
//             <p className="mb-4">
//                 Owned by: {isOwner ? "You" : `${nft.seller.slice(0, 6)}...${nft.seller.slice(-4)}`}
//             </p>
//             {isOwner ? (
//                 <button
//                     onClick={() => setShowModal(true)}
//                     className="bg-yellow-500 text-white px-4 py-2 rounded"
//                 >
//                     Update Listing
//                 </button>
//             ) : (
//                 <button
//                     onClick={handleBuyNFT}
//                     className="bg-green-500 text-white px-4 py-2 rounded"
//                 >
//                     Buy NFT
//                 </button>
//             )}

//             {showModal && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//                     <div className="bg-white p-4 rounded">
//                         <h2 className="text-xl font-bold mb-4">Update Listing</h2>
//                         <input
//                             type="text"
//                             value={newPrice}
//                             onChange={(e) => setNewPrice(e.target.value)}
//                             placeholder="New price (ETH)"
//                             className="w-full p-2 border rounded mb-4"
//                         />
//                         <div className="flex justify-end">
//                             <button onClick={() => setShowModal(false)} className="mr-2">
//                                 Cancel
//                             </button>
//                             <button
//                                 onClick={handleUpdateListing}
//                                 className="bg-blue-500 text-white px-4 py-2 rounded"
//                             >
//                                 Update
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     )
// }

// export default NFTCard

import React, { useState, useEffect } from "react"
import { ethers } from "ethers"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { getNFTMarketplaceContract, getBasicNftContract } from "../utils/contract"
import placeholderNft from "../public/placeholder-nft.png"

const NFTCard = ({ nft, isOwner, account }) => {
    const { isWeb3Enabled } = useMoralis()
    const [showModal, setShowModal] = useState(false)
    const [newPrice, setNewPrice] = useState("")
    const [metadata, setMetadata] = useState(null)
    const [imageUrl, setImageUrl] = useState("")

    useEffect(() => {
      console.log("I am getting called")
        fetchMetadata()
    }, [])

    const fetchMetadata = async () => {
        if (!isWeb3Enabled) return

        const contract = await getBasicNftContract(nft.nftAddress)
        try {
            const tokenUri = await contract.tokenURI(nft.tokenId)
            console.log("tokenUri", tokenUri)
            const ipfsUrl = tokenUri.replace("ipfs://", "https://ipfs.io/ipfs/")
            console.log("ipfsUrl", ipfsUrl)
            const response = await fetch(ipfsUrl)
            console.log("response", response)
            const data = await response.json()
            console.log("data", data)   
            setMetadata(data)
            if (data.image) {
                setImageUrl(data.image.replace("ipfs://", "https://ipfs.io/ipfs/"))
                console.log("data.image", data.image)
            }
        } catch (error) {
            console.error("(fetchMetadata) Error", error)
        }
    }

    const handleUpdateListing = async () => {
        if (!isWeb3Enabled) return

        const contract = await getNFTMarketplaceContract()
        try {
            const tx = await contract.updateListing(
                nft.nftAddress,
                nft.tokenId,
                ethers.utils.parseEther(newPrice)
            )
            await tx.wait()
            alert("Listing updated successfully!")
            setShowModal(false)
        } catch (error) {
            console.error("Error updating listing:", error)
            alert("Error updating listing. Please try again.")
        }
    }

    const handleBuyNFT = async () => {
        if (!isWeb3Enabled) return

        const contract = await getNFTMarketplaceContract()
        try {
            const tx = await contract.buyItem(nft.nftAddress, nft.tokenId, {
                value: nft.price,
            })
            await tx.wait()
            alert("NFT purchased successfully!")
        } catch (error) {
            console.error("Error buying NFT:", error)
            alert("Error buying NFT. Please try again.")
        }
    }
    console.log("imageUrl", imageUrl)
    console.log("placeholderNft", placeholderNft)

    return (
        <div className="border rounded-lg p-4">
            <img
                src={imageUrl || placeholderNft.src}
                alt={metadata?.name || "NFT"}
                className="w-full h-48 object-cover mb-4"
            />
            <h3 className="text-lg font-semibold mb-2">
                {metadata?.name || `NFT #${ethers.BigNumber.from(nft.tokenId).toNumber()}`}
            </h3>
            <p className="mb-2">Price: {ethers.utils.formatEther(nft.price)} ETH</p>
            <p className="mb-4">
                Owned by: {isOwner ? "You" : `${nft.seller.slice(0, 6)}...${nft.seller.slice(-4)}`}
            </p>
            {metadata?.description && <p className="mb-4">{metadata.description}</p>}
            {isOwner ? (
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded"
                >
                    Update Listing
                </button>
            ) : (
                <button
                    onClick={handleBuyNFT}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                >
                    Buy NFT
                </button>
            )}

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-4 rounded">
                        <h2 className="text-xl font-bold mb-4">Update Listing</h2>
                        <input
                            type="text"
                            value={newPrice}
                            onChange={(e) => setNewPrice(e.target.value)}
                            placeholder="New price (ETH)"
                            className="w-full p-2 border rounded mb-4"
                        />
                        <div className="flex justify-end">
                            <button onClick={() => setShowModal(false)} className="mr-2">
                                Cancel
                            </button>
                            <button
                                onClick={handleUpdateListing}
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default NFTCard
