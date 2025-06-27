
import React from 'react';
import { AccessibilityIcon, VideoIcon } from 'lucide-react';

export const Header = () => {
  return (
    <header className="relative z-50 backdrop-blur-xl bg-slate-900/80 border-b border-slate-700/50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full"></div>
              <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-xl">
                <AccessibilityIcon className="h-6 w-6 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                DeafCaptioned!
              </h1>
              <p className="text-sm text-slate-400">Professional Caption Platform</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-slate-300">
              <VideoIcon className="h-5 w-5" />
              <span className="text-sm font-medium">WCAG 2.1 AA Compliant</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
