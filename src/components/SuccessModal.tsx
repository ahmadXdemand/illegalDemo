"use client";

type SuccessModalProps = {
  isOpen: boolean;
  onClose: () => void;
  mintAddress: string;
  associatedTokenAccount: string;
};

export default function SuccessModal({ isOpen, onClose, mintAddress, associatedTokenAccount }: SuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg p-8 w-full max-w-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6">
            <path
              fill="currentColor"
              d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
            />
          </svg>
        </button>

        <div className="space-y-6">
          <div className="text-center">
            <div className="bg-green-500 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-8 h-8 text-white">
                <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Token Deployed Successfully!</h2>
            <p className="text-gray-400">Your token has been created on the Solana network</p>
          </div>

          <div className="space-y-4">
            <div className="bg-gray-800 rounded-lg p-4">
              <label className="block text-sm text-gray-400 mb-1">Mint Address</label>
              <div className="flex items-center space-x-2">
                <code className="flex-1 text-green-400 break-all">{mintAddress}</code>
                <button 
                  onClick={() => navigator.clipboard.writeText(mintAddress)}
                  className="p-2 hover:bg-gray-700 rounded"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-gray-400">
                    <path fill="currentColor" d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
                  </svg>
                </button>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-4">
              <label className="block text-sm text-gray-400 mb-1">Associated Token Account</label>
              <div className="flex items-center space-x-2">
                <code className="flex-1 text-green-400 break-all">{associatedTokenAccount}</code>
                <button 
                  onClick={() => navigator.clipboard.writeText(associatedTokenAccount)}
                  className="p-2 hover:bg-gray-700 rounded"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-gray-400">
                    <path fill="currentColor" d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex space-x-4 mt-6">
              <a 
                href={`https://explorer.solana.com/address/${mintAddress}?cluster=devnet`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors text-center"
              >
                View on Explorer
              </a>
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 