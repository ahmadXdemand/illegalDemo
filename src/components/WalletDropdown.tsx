"use client";

import { WalletData } from '@/types/wallet';
import { useState } from 'react';

interface WalletDropdownProps {
  isOpen: boolean;
  wallet: WalletData;
  onClose: () => void;
}

export default function WalletDropdown({ isOpen, wallet, onClose }: WalletDropdownProps) {
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [showMnemonic, setShowMnemonic] = useState(false);

  if (!isOpen) return null;

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  return (
    <div className="absolute right-0 mt-2 w-96 rounded-lg bg-gray-900 border border-gray-700 shadow-lg z-50">
      <div className="p-4 space-y-4">
        <div className="flex justify-between items-center border-b border-gray-700 pb-2">
          <h3 className="text-lg font-medium text-white">Wallet Details</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M6 18L18 6M6 6l12 12" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-sm text-gray-400">Network</label>
            <div className="flex items-center justify-between mt-1">
              <span className="text-white">{wallet.network}</span>
              <span className="text-xs px-2 py-1 bg-gray-800 rounded text-gray-300">
                {wallet.type}
              </span>
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-400">Public Key</label>
            <div className="flex items-center justify-between mt-1 p-2 bg-gray-800/50 rounded">
              <code className="text-sm text-white font-mono">{wallet.publicKey}</code>
              <button
                onClick={() => copyToClipboard(wallet.publicKey)}
                className="text-gray-400 hover:text-white"
                title="Copy to clipboard"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center">
              <label className="text-sm text-gray-400">Private Key</label>
              <button
                onClick={() => setShowPrivateKey(!showPrivateKey)}
                className="text-xs text-gray-400 hover:text-white"
              >
                {showPrivateKey ? 'Hide' : 'Show'}
              </button>
            </div>
            {showPrivateKey && (
              <div className="flex items-center justify-between mt-1 p-2 bg-gray-800/50 rounded">
                <code className="text-sm text-white font-mono break-all">
                  {wallet.privateKey}
                </code>
                <button
                  onClick={() => copyToClipboard(wallet.privateKey)}
                  className="text-gray-400 hover:text-white ml-2 flex-shrink-0"
                  title="Copy to clipboard"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            )}
          </div>

          <div className="pt-2 border-t border-gray-700">
            <button
              onClick={() => {/* Add disconnect wallet logic */}}
              className="w-full px-4 py-2 bg-red-500/10 text-red-500 rounded hover:bg-red-500/20 transition-colors"
            >
              Disconnect Wallet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 