"use client";

import { useState, useRef, useEffect } from 'react';
import { WalletData } from '@/types/wallet';
import UserWalletList from './UserWalletList';

interface UserDropdownProps {
  userInitial: string;
}

export default function UserDropdown({ userInitial }: UserDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center hover:bg-gray-600 transition-colors"
      >
        <span className="text-white">{userInitial}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 rounded-lg bg-gray-900 border border-gray-700 shadow-lg z-50">
          <div className="p-4">
            <div className="flex items-center gap-3 border-b border-gray-700 pb-4">
              <div className="w-12 h-12 rounded-full bg-gray-500 flex items-center justify-center">
                <span className="text-white text-xl">{userInitial}</span>
              </div>
              <div>
                <h3 className="text-white font-medium">User Account</h3>
                <p className="text-sm text-gray-400">user@example.com</p>
              </div>
            </div>
            
            <UserWalletList />

            <div className="pt-2 border-t border-gray-700 mt-4">
              <button
                onClick={() => {/* Add sign out logic */}}
                className="w-full px-4 py-2 text-gray-400 hover:text-white text-sm text-left transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 