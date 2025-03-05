"use client";

import { useEffect, useState } from 'react';
import { WalletData } from '@/types/wallet';

export default function UserWalletList() {
  const [wallets, setWallets] = useState<WalletData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWallets = async () => {
      try {
        const response = await fetch('/api/wallets');
        const data = await response.json();
        if (data.success) {
          setWallets(data.wallets);
        }
      } catch (error) {
        console.error('Error fetching wallets:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWallets();
  }, []);

  if (isLoading) {
    return (
      <div className="py-4 text-center text-gray-400">
        Loading wallets...
      </div>
    );
  }

  if (wallets.length === 0) {
    return (
      <div className="py-4 text-center text-gray-400">
        No wallets found
      </div>
    );
  }

  return (
    <div className="py-2 space-y-1">
      <h4 className="text-sm text-gray-400 px-2 py-1">Your Wallets</h4>
      {wallets.map((wallet) => (
        <WalletListItem key={wallet.id} wallet={wallet} />
      ))}
    </div>
  );
}

function WalletListItem({ wallet }: { wallet: WalletData }) {
  return (
    <div className="px-2 py-2 hover:bg-gray-800/50 rounded-lg transition-colors cursor-pointer group">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-sm text-white group-hover:text-blue-400 font-mono">
            {wallet.publicKey.slice(0, 6)}...{wallet.publicKey.slice(-4)}
          </span>
          <span className="text-xs text-gray-400">
            {wallet.network}
          </span>
        </div>
        <span className="text-xs px-2 py-1 bg-gray-800 rounded text-gray-300">
          {wallet.type}
        </span>
      </div>
    </div>
  );
} 