"use client"

import type React from "react"
import { useState } from "react"
import { ethers } from "ethers"

const BlockchainWallet: React.FC = () => {
  const [address, setAddress] = useState("")
  const [balance, setBalance] = useState("")

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" })
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const address = await signer.getAddress()
        setAddress(address)
        const balance = await provider.getBalance(address)
        setBalance(ethers.utils.formatEther(balance))
      } catch (error) {
        console.error("Failed to connect wallet:", error)
      }
    } else {
      console.log("Please install MetaMask!")
    }
  }

  return (
    <div className="p-4 bg-[#17212b] text-white">
      <button onClick={connectWallet} className="bg-[#4eab6c] text-white px-4 py-2 rounded">
        Connect Wallet
      </button>
      {address && (
        <div className="mt-4">
          <p>Address: {address}</p>
          <p>Balance: {balance} ETH</p>
        </div>
      )}
    </div>
  )
}

export default BlockchainWallet

