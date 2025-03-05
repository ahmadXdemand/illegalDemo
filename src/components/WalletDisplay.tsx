"use client";

import { useState, useRef, useEffect } from 'react';
import WalletDropdown from './WalletDropdown';
import { WalletData } from '@/types/wallet';

interface WalletDisplayProps {
  wallet: WalletData;
}

export default function WalletDisplay({ wallet }: WalletDisplayProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div 
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center gap-2 px-3 py-1.5 bg-gray-800/50 rounded-lg border border-gray-700/50 hover:bg-gray-800 hover:border-gray-600 transition-all cursor-pointer group"
      >
        <div className="flex items-center gap-2">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 group-hover:text-gray-300">
              {wallet.network}
            </span>
            <span className="text-sm text-white font-mono group-hover:text-blue-400">
              {wallet.publicKey.slice(0, 6)}...{wallet.publicKey.slice(-4)}
            </span>
          </div>
          <svg 
            className={`w-4 h-4 text-gray-400 group-hover:text-gray-300 transition-transform ${
              isDropdownOpen ? 'transform rotate-180' : ''
            }`}
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
          >
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      <WalletDropdown 
        isOpen={isDropdownOpen} 
        wallet={wallet} 
        onClose={() => setIsDropdownOpen(false)}
      />
    </div>
  );
} 