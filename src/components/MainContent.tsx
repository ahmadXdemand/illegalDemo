import AgentHeader from './AgentHeader';
import LeftColumn from './LeftColumn';
import RightColumn from './RightColumn';

export default function MainContent() {
  return (
    <div className="flex-1 p-6 max-w-6xl mx-auto w-full">
      <AgentHeader />
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <LeftColumn />
        <RightColumn />
      </div>
    </div>
  );
} 