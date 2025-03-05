"use client";

import { useState } from 'react';
import Modal from './Modal';
import SuccessModal from './SuccessModal';

export default function LeftColumn() {
  const [showCryptoModal, setShowCryptoModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tokenAddress, setTokenAddress] = useState("");
  const [deploymentData, setDeploymentData] = useState<{
    mintAddress: string;
    associatedTokenAccount: string;
  } | null>(null);

  const handleContractClick = () => {
    setShowCryptoModal(true);
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
        setShowCryptoModal(false);
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
    <div className="md:col-span-5">
      <div className="relative mb-4">
        <div className="bg-orange-500 w-full aspect-square flex items-center justify-center relative overflow-hidden">
          <div className="w-full h-full" style={{ backgroundColor: '#FF6A3D' }}>
            <div className="w-full h-full bg-cover bg-center" 
                 style={{ 
                   backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path fill=\"%23000\" d=\"M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z\"/></svg>')",
                   opacity: 0.3
                 }}>
            </div>
          </div>
        </div>
        <div className="mt-2 flex space-x-2">
          <button className="flex-1 px-3 py-2 bg-gray-800 rounded text-sm flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-4 h-4 mr-1">
              <path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
            </svg>
            Generate
          </button>
          <button className="flex-1 px-3 py-2 bg-gray-800 rounded text-sm flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-4 h-4 mr-1">
              <path fill="currentColor" d="M5 20h14v-2H5v2zm0-10h4v6h6v-6h4l-7-7-7 7z" />
            </svg>
            Upload Image
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <SelectField label="Framework" options={["Eliza", "Other"]} />
        <SelectField label="Model Provider" options={["OpenAI", "Other"]} />
        <SelectField label="Voice" options={["Not Set", "Male", "Female"]} />
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">Contracts</span>
          <button
            onClick={handleContractClick}
            className="relative w-32 px-3 py-1 bg-transparent text-white text-right appearance-none"
          >
            <div className="flex items-center justify-end space-x-2">
              <span>Crypto</span>
              <svg className="w-4 h-4 text-white" viewBox="0 0 20 20">
                <path fill="currentColor" d="M7 10l5 5 5-5z" />
              </svg>
            </div>
          </button>
        </div>
      </div>

      <Modal 
        isOpen={showCryptoModal} 
        onClose={() => setShowCryptoModal(false)}
        onSubmit={handleDeployToken}
      >
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white mb-4">Crypto Contract Details</h2>
          
          <div className="space-y-2">
            <label className="block text-sm text-gray-400">Name</label>
            <input
              type="text"
              value="Crypto Coin"
              readOnly
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm text-gray-400">Symbol</label>
            <input
              type="text"
              value="CC"
              readOnly
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm text-gray-400">URI</label>
            <input
              type="text"
              value="https://gateway.pinata.cloud/ipfs/QmP7rNUJT9w7BuEvCBbip7dqdXrXiS7An2YJ95KLbdYLwS/"
              readOnly
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
            />
          </div>

          <button
            onClick={handleDeployToken}
            disabled={loading}
            className={`w-full mt-6 px-4 py-2 bg-blue-600 text-white rounded 
              ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'} 
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
      </Modal>

      {deploymentData && (
        <SuccessModal
          isOpen={showSuccessModal}
          onClose={() => setShowSuccessModal(false)}
          mintAddress={deploymentData.mintAddress}
          associatedTokenAccount={deploymentData.associatedTokenAccount}
        />
      )}
    </div>
  );
}

type SelectFieldProps = {
  label: string;
  options: string[];
  value?: string;
  onChange?: (value: string) => void;
}

function SelectField({ label, options, value, onChange }: SelectFieldProps) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-gray-400">{label}</span>
      <div className="relative w-32">
        <select 
          className="w-full bg-transparent border-none text-white outline-none appearance-none pr-8 text-right"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
        >
          {options.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <svg className="w-4 h-4 text-white" viewBox="0 0 20 20">
            <path fill="currentColor" d="M7 10l5 5 5-5z" />
          </svg>
        </div>
      </div>
    </div>
  );
} 