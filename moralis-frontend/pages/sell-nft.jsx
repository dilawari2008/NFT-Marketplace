import { useState } from "react";
import { ethers } from "ethers";
import { useMoralis } from "react-moralis";
import { getNFTMarketplaceContract } from "../utils/contract";

const SellNFT = () => {
  const { isWeb3Enabled, account } = useMoralis();
  const [nftAddress, setNftAddress] = useState("");
  const [tokenId, setTokenId] = useState("");
  const [price, setPrice] = useState("");
  const [proceeds, setProceeds] = useState("0");

  const handleListNFT = async (e) => {
    e.preventDefault();
    if (!isWeb3Enabled) return;

    const contract = await getNFTMarketplaceContract();
    try {
      console.log("nftAddress", nftAddress, typeof nftAddress)
      console.log("nftAddress", tokenId, typeof tokenId)
      console.log("nftAddress", price, typeof price)
      console.log("contract.provider.getNetwork()", await contract.provider.getNetwork())
      const tx = await contract.listItem(
        nftAddress,
        Number(tokenId),
        ethers.utils.parseEther(price)
      );
      console.log('Awaiting confirmation');
      await tx.wait();
      alert("NFT listed successfully!");
    } catch (error) {
      console.error("Error listing NFT:", error);
      alert("Error listing NFT. Please try again.");
    }
  };

  const handleWithdrawProceeds = async () => {
    if (!isWeb3Enabled) return;

    const contract = await getNFTMarketplaceContract();
    try {
      const tx = await contract.withdrawProceeds();
      await tx.wait();
      alert("Proceeds withdrawn successfully!");
      setProceeds("0");
    } catch (error) {
      console.error("Error withdrawing proceeds:", error);
      alert("Error withdrawing proceeds. Please try again.");
    }
  };

  const loadProceeds = async () => {
    if (!isWeb3Enabled || !account) return;

    const contract = await getNFTMarketplaceContract();
    const userProceeds = await contract.getProceeds(account);
    setProceeds(ethers.utils.formatEther(userProceeds));
  };

  useState(() => {
    if (isWeb3Enabled && account) {
      loadProceeds();
    }
  }, [isWeb3Enabled, account]);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold mb-8">Sell your NFT</h1>
      <form onSubmit={handleListNFT} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="nftAddress" className="block mb-2">
            NFT Address
          </label>
          <input
            id="nftAddress"
            type="text"
            value={nftAddress}
            onChange={(e) => setNftAddress(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="tokenId" className="block mb-2">
            NFT Token ID
          </label>
          <input
            id="tokenId"
            type="text"
            value={tokenId}
            onChange={(e) => setTokenId(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block mb-2">
            Price (in ETH)
          </label>
          <input
            id="price"
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          List NFT
        </button>
      </form>
      <div className="mt-8 text-center">
        <p>Withdrawable proceeds: {proceeds} ETH</p>
        <button
          onClick={handleWithdrawProceeds}
          className="bg-green-500 text-white px-4 py-2 rounded mt-2"
          disabled={proceeds === "0"}
        >
          Withdraw Proceeds
        </button>
      </div>
    </div>
  );
};

export default SellNFT;
