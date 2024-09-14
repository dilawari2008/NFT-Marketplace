import Link from "next/link"
import { useMoralis } from "react-moralis"
import { ConnectButton } from "web3uikit"

const Navbar = () => {
    return (
        <nav className="sticky top-0 bg-white shadow-md">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold">
                    NFT Marketplace
                </Link>
                <div className="flex items-center">
                    <Link href="/sell-nft" className="mr-4">
                        Sell NFT
                    </Link>
                    <ConnectButton moralisAuth={false} />
                </div>
            </div>
        </nav>
    )
}

export default Navbar
