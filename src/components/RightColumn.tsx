"use client";

import { useState, useEffect } from 'react';
import { WalletData } from '@/types/wallet';
import WalletForm from './WalletForm';
// import Modal from './Modal';
import SuccessModal from './SuccessModal';

export default function RightColumn() {
  const [showWalletForm, setShowWalletForm] = useState(false);
  const [activeWallet, setActiveWallet] = useState<WalletData | null>(null);
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tokenAddress, setTokenAddress] = useState("");
  const [deploymentData, setDeploymentData] = useState<{
    mintAddress: string;
    associatedTokenAccount: string;
  } | null>(null);
  const [showDeployForm, setShowDeployForm] = useState(false);

  // Load wallet from sessionStorage on component mount
  useEffect(() => {
    const storedWallet = sessionStorage.getItem('activeWallet');
    if (storedWallet) {
      setActiveWallet(JSON.parse(storedWallet));
    }
  }, []);

  const handleCreateWallet = async () => {
    try {
      const response = await fetch("/api/createWallet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          network: "solana", // hardcoded since we removed state
          type: "new",
          security: "standard",
        }),
      });

      const data = await response.json();

      if (data.success) {
        sessionStorage.setItem('activeWallet', JSON.stringify(data.wallet));
        setActiveWallet(data.wallet);
        setShowWalletForm(false);
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while creating the wallet.");
    }
  };

  const handleDisconnectWallet = () => {
    // Clear the active wallet and remove it from sessionStorage
    setActiveWallet(null);
    sessionStorage.removeItem('activeWallet');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert("Copied to clipboard!");
    }).catch(err => {
      console.error("Failed to copy: ", err);
    });
  };

  const handleDeployToken = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/createToken", { 
        method: "POST",
      });
      const data = await response.json();

      if (data.success) {
        setDeploymentData({
          mintAddress: data.mintAddress,
          associatedTokenAccount: data.associatedTokenAccount
        });
        setTokenAddress(data.mintAddress);
        setShowSuccessModal(true);
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while creating the token.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="md:col-span-7 space-y-6">
      {/* Wallet Details Card */}
      {activeWallet && (
        <>
          <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700 mb-4">
            <h4 className="text-lg font-bold text-white">Connected Wallet</h4>
            <div className="space-y-2">
              <div>
                <label className="text-sm text-gray-400">Network</label>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-white">{activeWallet.network}</span>
                  <span className="text-xs px-2 py-1 bg-gray-800 rounded text-gray-300">
                    {activeWallet.type}
                  </span>
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-400">Public Key</label>
                <div className="flex items-center gap-2 mt-1 p-2 bg-gray-800/50 rounded group">
                  <code className="text-sm text-white font-mono truncate flex-1">
                    {activeWallet.publicKey}
                  </code>
                  <button
                    onClick={() => copyToClipboard(activeWallet.publicKey)}
                    className="text-gray-400 hover:text-white flex-shrink-0"
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
                  <div className="flex items-center gap-2 mt-1 p-2 bg-gray-800/50 rounded">
                    <code className="text-sm text-white font-mono break-all flex-1">
                      {activeWallet.privateKey}
                    </code>
                    <button
                      onClick={() => copyToClipboard(activeWallet.privateKey)}
                      className="text-gray-400 hover:text-white flex-shrink-0"
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
                  onClick={handleDisconnectWallet}
                  className="w-full px-4 py-2 bg-red-500/10 text-red-500 rounded hover:bg-red-500/20 transition-colors"
                >
                  Disconnect Wallet
                </button>
              </div>
            </div>
          </div>

          {/* Deploy Token Section */}
          <div className="space-y-4">
            {!showDeployForm ? (
              <button
                onClick={() => setShowDeployForm(true)}
                className="w-full px-4 py-2 rounded border border-gray-700 flex items-center justify-center gap-2"
              >
                <svg 
                  className="w-5 h-5" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M12 5v14M5 12h14"/>
                </svg>
                Deploy Token
              </button>
            ) : (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-white">Crypto Contract Details</h2>
                  <button 
                    onClick={() => setShowDeployForm(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M6 18L18 6M6 6l12 12" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
                
                <div className="space-y-6">
                  <FormField
                    label="Name"
                    defaultValue="Crypto Coin"
                    
                    type="input"
                  />

                  <FormField
                    label="Symbol"
                    defaultValue="CC"
                   
                    type="input"
                  />

                  <FormField
                    label="URI"
                    defaultValue="https://gateway.pinata.cloud/ipfs/QmP7rNUJT9w7BuEvCBbip7dqdXrXiS7An2YJ95KLbdYLwS/"
                    
                    type="input"
                  />

                  <button
                    onClick={handleDeployToken}
                    disabled={loading}
                    className={`w-full px-4 py-2 rounded border border-gray-700  gap-2
                      ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-700'} 
                      transition-colors`}
                  >
                    {loading ? 'Deploying...' : 'Deploy Token'}
                  </button>

                  {tokenAddress && (
                    <div className="mt-4 p-3 bg-gray-800 rounded">
                      <p className="text-sm text-gray-300">Token Address:</p>
                      <p className="text-xs text-gray-400 break-all">{tokenAddress}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Success Modal */}
          {deploymentData && (
            <SuccessModal
              isOpen={showSuccessModal}
              onClose={() => setShowSuccessModal(false)}
              mintAddress={deploymentData.mintAddress}
              associatedTokenAccount={deploymentData.associatedTokenAccount}
            />
          )}
        </>
      )}

      <div className="">
        {!activeWallet ? (
          <button 
            onClick={() => setShowWalletForm(true)}
            className="flex items-center gap-2 px-3 py-1.5 border border-gray-700 rounded text-sm"
          >
            <svg 
              className="w-4 h-4" 
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
            <span className="text-sm font-medium">Create Wallet</span>
          </button>
        ) : null}
      </div>

      {showWalletForm && (
        <WalletForm 
          setShowWalletForm={setShowWalletForm}
          handleCreateWallet={handleCreateWallet}
        />
      )}

      <div>
        <h3 className="text-white">Plugins</h3>
        <p className="text-gray-500 text-sm mb-2">No plugins selected yet.</p>
        <button className="px-3 py-1 border border-gray-700 rounded text-sm">Add Plugin</button>
      </div>

      <FormField
        label="Name"
        defaultValue="Jon Doe"
        type="input"
      />

      <FormField
        label="System"
        defaultValue="Task Manager"
        type="textarea"
        minHeight="min-h-20"
      />

      <FormField
        label="Bio"
        defaultValue="A brief description about yourself."
        type="textarea"
        minHeight="min-h-16"
      />

      <FormField
        label="Knowledge"
        defaultValue="Knows everything!"
        type="textarea"
        minHeight="min-h-16"
      />

      <FormField
        label="Lore"
        defaultValue="Not much here"
        type="textarea"
        minHeight="min-h-16"
      />
    </div>
  );
}

type FormFieldProps = {
  label: string;
  defaultValue: string;
  type: 'input' | 'textarea';
  minHeight?: string;
}

function FormField({ label, defaultValue, type, minHeight = '' }: FormFieldProps) {
  return (
    <div>
      <div className="flex items-center mb-2">
        <h3 className="text-white mr-1">{label}</h3>
        <svg viewBox="0 0 24 24" className="w-4 h-4 text-gray-500">
          <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
        </svg>
      </div>
      {type === 'input' ? (
        <input
          type="text"
          className="w-full p-2 bg-transparent border border-gray-700 rounded text-white"
          defaultValue={defaultValue}
        />
      ) : (
        <textarea
          className={`w-full p-2 bg-transparent border border-gray-700 rounded text-white ${minHeight}`}
          defaultValue={defaultValue}
        />
      )}
    </div>
  );
} 