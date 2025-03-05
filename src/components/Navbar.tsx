"use client";

import { useState } from 'react';
import WalletModal from './WalletModal';
import WalletSuccessModal from './WalletSuccessModal';

export default function Navbar() {
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [showWalletSuccessModal, setShowWalletSuccessModal] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState("solana");
  const [walletType, setWalletType] = useState("new");
  const [securityLevel, setSecurityLevel] = useState("standard");
  const [walletLoading, setWalletLoading] = useState(false);
  const [walletData, setWalletData] = useState<{
    network: string;
    publicKey: string;
    privateKey: string;
    mnemonic: string;
    type: string;
  } | null>(null);

  const handleWalletClick = () => {
    setShowWalletModal(true);
  };

  const handleCreateWallet = async () => {
    setWalletLoading(true);
    try {
      const response = await fetch("/api/createWallet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          network: selectedNetwork,
          type: walletType,
          security: securityLevel,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setWalletData(data.wallet);
        setShowWalletModal(false);
        setShowWalletSuccessModal(true);
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while creating the wallet.");
    } finally {
      setWalletLoading(false);
    }
  };

  return (
    <nav className="flex items-center px-4 py-2 border-b border-gray-800">
      <div className="flex items-center space-x-2">
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-white">
          <path fill="currentColor" d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
        </svg>
        <span className="text-gray-500">Dashboard</span>
      </div>
      <div className="flex-1 flex justify-center space-x-8">
        <span className="px-3 py-1 border-b-2 border-white">Agents</span>
        <span className="px-3 py-1 text-gray-500">Templates</span>
      </div>
      <div className="flex items-center gap-4">
        <button 
          className="flex items-center text-gray-400 hover:text-white transition-colors"
          onClick={handleWalletClick}
          title="Create Wallet"
        >
          <svg 
            className="w-6 h-6" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4" />
            <path d="M4 6v12c0 1.1.9 2 2 2h14v-4" />
            <path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4z" />
          </svg>
        </button>
        <button className="px-3 py-1 rounded bg-gray-800 text-white text-sm">Go to dashboard</button>
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-white">
          <path fill="currentColor" d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
        </svg>
        <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center">
          <span className="text-white">A</span>
        </div>
      </div>

      <WalletModal
        isOpen={showWalletModal}
        onClose={() => setShowWalletModal(false)}
        selectedNetwork={selectedNetwork}
        setSelectedNetwork={setSelectedNetwork}
        walletType={walletType}
        setWalletType={setWalletType}
        securityLevel={securityLevel}
        setSecurityLevel={setSecurityLevel}
        walletLoading={walletLoading}
        onCreateWallet={handleCreateWallet}
      />

      {walletData && (
        <WalletSuccessModal
          isOpen={showWalletSuccessModal}
          onClose={() => setShowWalletSuccessModal(false)}
          walletData={walletData}
        />
      )}
    </nav>
  );
} 