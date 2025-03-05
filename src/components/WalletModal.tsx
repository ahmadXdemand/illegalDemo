"use client";

import Modal from './Modal';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedNetwork: string;
  setSelectedNetwork: (network: string) => void;
  walletType: string;
  setWalletType: (type: string) => void;
  securityLevel: string;
  setSecurityLevel: (level: string) => void;
  walletLoading: boolean;
  onCreateWallet: () => void;
}

export default function WalletModal({
  isOpen,
  onClose,
  selectedNetwork,
  setSelectedNetwork,
  walletType,
  setWalletType,
  securityLevel,
  setSecurityLevel,
  walletLoading,
  onCreateWallet
}: WalletModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white mb-4">Create Web3 Wallet</h2>
        
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
          onClick={onCreateWallet}
          disabled={walletLoading}
          className={`w-full mt-6 px-4 py-2 bg-blue-600 text-white rounded 
            ${walletLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'} 
            transition-colors`}
        >
          {walletLoading ? 'Creating...' : 'Create Wallet'}
        </button>
      </div>
    </Modal>
  );
} 