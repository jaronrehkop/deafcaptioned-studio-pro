
import React from 'react';
import { UserRole } from '../pages/Index';
import { EditorDashboard } from './dashboards/EditorDashboard';
import { ReviewerDashboard } from './dashboards/ReviewerDashboard';
import { ClientDashboard } from './dashboards/ClientDashboard';
import { ArrowLeftIcon } from 'lucide-react';

interface DashboardProps {
  role: UserRole;
  onRoleChange: (role: UserRole) => void;
}

export const Dashboard = ({ role, onRoleChange }: DashboardProps) => {
  const renderDashboard = () => {
    switch (role) {
      case 'editor':
        return <EditorDashboard />;
      case 'reviewer':
        return <ReviewerDashboard />;
      case 'client':
        return <ClientDashboard />;
      default:
        return null;
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="bg-slate-800/50 border-b border-slate-700/50 px-6 py-3">
        <div className="flex items-center justify-between">
          <button
            onClick={() => onRoleChange(null)}
            className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors"
          >
            <ArrowLeftIcon className="h-5 w-5" />
            <span>Back to Role Selection</span>
          </button>
          
          <div className="text-right">
            <h2 className="text-lg font-semibold text-white capitalize">{role} Workspace</h2>
            <p className="text-sm text-slate-400">DeafCaptioned Platform</p>
          </div>
        </div>
      </div>
      
      <div className="flex-1">
        {renderDashboard()}
      </div>
    </div>
  );
};
