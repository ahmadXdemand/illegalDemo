// page.tsx
import Navbar from '@/components/Navbar';
import SubNavigation from '@/components/SubNavigation';
import MainContent from '@/components/MainContent';

export default function AgentCreationPage() {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Navbar />
      <SubNavigation />
      <MainContent />
    </div>
  );
}