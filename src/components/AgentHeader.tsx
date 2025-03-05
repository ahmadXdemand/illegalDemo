export default function AgentHeader() {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">Create Agent</h1>
      <div className="flex items-center space-x-2">
        <button className="p-2 rounded border border-gray-700">
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-white">
            <path fill="currentColor" d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
          </svg>
        </button>
        <button className="p-2 rounded border border-gray-700">
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-white">
            <path fill="currentColor" d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
        </button>
        <button className="px-4 py-2 bg-blue-600 rounded flex items-center text-sm">
          <svg viewBox="0 0 24 24" className="w-4 h-4 mr-1 text-white">
            <path fill="currentColor" d="M8 5v14l11-7z" />
          </svg>
          Launch
        </button>
      </div>
    </div>
  );
} 