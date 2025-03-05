export default function Navbar() {
  return (
    <nav className="flex items-center px-4 py-2 border-b border-gray-800">
      <div className="flex items-center space-x-2">
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-white">
          <path fill="currentColor" d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
        </svg>
        <span className="text-gray-500">Dashboard</span>
      </div>
      <div className="flex-1 flex justify-center space-x-8">
        <span className="px-3 py-1 border-b-2 border-white">Agents</span>
        <span className="px-3 py-1 text-gray-500">Templates</span>
      </div>
      <div className="flex items-center space-x-4">
        <button className="px-3 py-1 rounded bg-gray-800 text-white text-sm">Go to dashboard</button>
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-white">
          <path fill="currentColor" d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
        </svg>
        <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center">
          <span className="text-white">A</span>
        </div>
      </div>
    </nav>
  );
} 