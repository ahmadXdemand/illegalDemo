export default function SubNavigation() {
  return (
    <div className="flex items-center p-4 border-b border-gray-800">
      <a href="/dashboard" className="flex items-center text-gray-500">
        <svg viewBox="0 0 24 24" className="w-5 h-5 mr-1">
          <path fill="currentColor" d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
        </svg>
        Back
      </a>
      <div className="flex space-x-1 ml-4">
        <button className="px-3 py-1 bg-gray-800 text-white rounded text-sm border border-gray-700">Edit</button>
        <button className="px-3 py-1 text-gray-400 text-sm">Builder</button>
        <button className="px-3 py-1 text-gray-400 text-sm">Chat</button>
      </div>
    </div>
  );
} 