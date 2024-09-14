import { ethers } from "ethers"
import nftMarketplaceABI from "./nftMarketplaceABI.json"
import basicNftABI from "./basicNFT.json"

const NFT_MARKETPLACE_ADDRESS = "0x2fbe26D4A01e60cD2D24C09Bea040A539d027aE9"

export const getNFTMarketplaceContract = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    return new ethers.Contract(NFT_MARKETPLACE_ADDRESS, nftMarketplaceABI, signer)
}

export const getBasicNftContract = async (basicNftAddress) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    return new ethers.Contract(basicNftAddress, basicNftABI, signer)
}
