"use client";

import { useState } from 'react';
import { WalletData } from '@/types/wallet';

type WalletFormProps = {
  activeWallet: WalletData | null;
  setActiveWallet: (wallet: WalletData | null) => void;
  setShowWalletForm: (show: boolean) => void;
  handleCreateWallet: () => Promise<void>;
};

export default function WalletForm({ activeWallet, setActiveWallet, setShowWalletForm, handleCreateWallet }: WalletFormProps) {
  const [selectedNetwork, setSelectedNetwork] = useState("solana");
  const [walletType, setWalletType] = useState("new");
  const [securityLevel, setSecurityLevel] = useState("standard");
  const [walletLoading, setWalletLoading] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-white">Create Web3 Wallet</h2>
        <button 
          onClick={() => setShowWalletForm(false)}
          className="text-gray-400 hover:text-white"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M6 18L18 6M6 6l12 12" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm text-gray-400">Network</label>
          <select 
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
            value={selectedNetwork}
            onChange={(e) => setSelectedNetwork(e.target.value)}
          >
            <option value="solana">Solana (Devnet)</option>
            <option value="ethereum">Ethereum (Testnet)</option>
            <option value="polygon">Polygon (Testnet)</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm text-gray-400">Wallet Type</label>
          <select 
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
            value={walletType}
            onChange={(e) => setWalletType(e.target.value)}
          >
            <option value="new">Create New Wallet</option>
            <option value="import">Import Existing</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm text-gray-400">Security Level</label>
          <select 
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
            value={securityLevel}
            onChange={(e) => setSecurityLevel(e.target.value)}
          >
            <option value="standard">Standard</option>
            <option value="high">High Security</option>
            <option value="custom">Custom</option>
          </select>
        </div>

        <button
          onClick={handleCreateWallet}
          disabled={walletLoading}
          className={`w-full px-4 py-2 rounded border border-gray-700
            ${walletLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'} 
            transition-colors`}
        >
          {walletLoading ? 'Creating...' : 'Create Wallet'}
        </button>
      </div>
    </div>
  );
} 