
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface WorkspacePanelProps {
  id: string;
  title: string;
  icon: LucideIcon;
  content: React.ReactNode;
  className?: string;
}

export const WorkspacePanel = ({ title, icon: IconComponent, content, className = '' }: WorkspacePanelProps) => {
  return (
    <div className={`backdrop-blur-sm bg-slate-800/30 border border-slate-700/50 rounded-xl overflow-hidden ${className}`}>
      <div className="bg-slate-800/50 border-b border-slate-700/50 px-4 py-3 flex items-center space-x-3">
        <IconComponent className="h-5 w-5 text-slate-300" />
        <h3 className="text-white font-semibold text-sm">{title}</h3>
      </div>
      <div className="p-4 h-full overflow-auto">
        {content}
      </div>
    </div>
  );
};
