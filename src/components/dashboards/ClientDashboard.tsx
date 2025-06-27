
import React, { useState } from 'react';
import { WorkspacePanel } from '../WorkspacePanel';
import { CheckIcon, VideoIcon, ListIcon, FileTextIcon } from 'lucide-react';

export const ClientDashboard = () => {
  const [approvals, setApprovals] = useState({
    content: false,
    accessibility: false,
    timing: false,
    final: false
  });

  const handleApprovalChange = (key: keyof typeof approvals) => {
    setApprovals(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const panels = [
    {
      id: 'final-preview',
      title: 'Final Caption Preview',
      icon: VideoIcon,
      content: (
        <div className="bg-black rounded-lg aspect-video flex items-center justify-center relative">
          <div className="text-center text-white">
            <VideoIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-semibold">Final Review</p>
            <p className="text-sm opacity-70">Complete captioned video</p>
          </div>
          <div className="absolute bottom-4 left-4 right-4 bg-black/80 text-white p-3 rounded text-center">
            <p className="text-sm">Welcome to our platform demonstration.</p>
          </div>
        </div>
      )
    },
    {
      id: 'approval-checklist',
      title: 'Client Approval',
      icon: CheckIcon,
      content: (
        <div className="space-y-6">
          <h4 className="text-white font-semibold text-lg">Final Sign-off Checklist</h4>
          
          <div className="space-y-4">
            <label className="flex items-center space-x-3 cursor-pointer group">
              <input 
                type="checkbox" 
                checked={approvals.content}
                onChange={() => handleApprovalChange('content')}
                className="w-5 h-5 rounded border-2 border-slate-600 bg-slate-700 text-blue-500 focus:ring-2 focus:ring-blue-500/50" 
              />
              <div>
                <p className="text-white font-medium">Content Accuracy</p>
                <p className="text-sm text-slate-300">Captions accurately reflect spoken content</p>
              </div>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer group">
              <input 
                type="checkbox" 
                checked={approvals.accessibility}
                onChange={() => handleApprovalChange('accessibility')}
                className="w-5 h-5 rounded border-2 border-slate-600 bg-slate-700 text-blue-500 focus:ring-2 focus:ring-blue-500/50" 
              />
              <div>
                <p className="text-white font-medium">Accessibility Standards</p>
                <p className="text-sm text-slate-300">WCAG 2.1 AA compliance verified</p>
              </div>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer group">
              <input 
                type="checkbox" 
                checked={approvals.timing}
                onChange={() => handleApprovalChange('timing')}
                className="w-5 h-5 rounded border-2 border-slate-600 bg-slate-700 text-blue-500 focus:ring-2 focus:ring-blue-500/50" 
              />
              <div>
                <p className="text-white font-medium">Timing & Synchronization</p>
                <p className="text-sm text-slate-300">Captions are properly synchronized</p>
              </div>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer group">
              <input 
                type="checkbox" 
                checked={approvals.final}
                onChange={() => handleApprovalChange('final')}
                className="w-5 h-5 rounded border-2 border-slate-600 bg-slate-700 text-blue-500 focus:ring-2 focus:ring-blue-500/50" 
              />
              <div>
                <p className="text-white font-medium">Final Approval</p>
                <p className="text-sm text-slate-300">I approve this caption work for delivery</p>
              </div>
            </label>
          </div>

          <button 
            disabled={!Object.values(approvals).every(Boolean)}
            className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
              Object.values(approvals).every(Boolean)
                ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-lg'
                : 'bg-slate-700 text-slate-400 cursor-not-allowed'
            }`}
          >
            {Object.values(approvals).every(Boolean) ? '✅ Complete Sign-off' : 'Complete All Checkboxes'}
          </button>
        </div>
      )
    },
    {
      id: 'caption-summary',
      title: 'Caption Summary',
      icon: ListIcon,
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-700/30 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-blue-400">47</p>
              <p className="text-sm text-slate-300">Total Captions</p>
            </div>
            <div className="bg-slate-700/30 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-green-400">3</p>
              <p className="text-sm text-slate-300">Speakers</p>
            </div>
            <div className="bg-slate-700/30 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-purple-400">5:23</p>
              <p className="text-sm text-slate-300">Duration</p>
            </div>
            <div className="bg-slate-700/30 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-orange-400">98%</p>
              <p className="text-sm text-slate-300">Accuracy</p>
            </div>
          </div>
          
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-2">
              <CheckIcon className="h-5 w-5 text-green-400" />
              <p className="text-green-400 font-semibold">Quality Verified</p>
            </div>
            <p className="text-sm text-slate-300">All accessibility standards met. Ready for final approval.</p>
          </div>
        </div>
      )
    },
    {
      id: 'export-options',
      title: 'Export & Delivery',
      icon: FileTextIcon,
      content: (
        <div className="space-y-4">
          <h4 className="text-white font-semibold">Available Formats</h4>
          
          <div className="space-y-3">
            <div className="bg-slate-700/30 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-white font-medium">SRT Subtitles</p>
                  <p className="text-sm text-slate-400">Standard subtitle format</p>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm transition-colors">
                  Download
                </button>
              </div>
            </div>
            
            <div className="bg-slate-700/30 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-white font-medium">VTT Captions</p>
                  <p className="text-sm text-slate-400">Web video text tracks</p>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm transition-colors">
                  Download
                </button>
              </div>
            </div>
            
            <div className="bg-slate-700/30 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-white font-medium">Burned-in Video</p>
                  <p className="text-sm text-slate-400">Video with embedded captions</p>
                </div>
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm transition-colors">
                  Generate
                </button>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="h-full grid grid-cols-12 grid-rows-8 gap-4 p-4">
      <WorkspacePanel 
        {...panels[0]} 
        className="col-span-8 row-span-6" 
      />
      <WorkspacePanel 
        {...panels[1]} 
        className="col-span-4 row-span-8" 
      />
      <WorkspacePanel 
        {...panels[2]} 
        className="col-span-4 row-span-2" 
      />
      <WorkspacePanel 
        {...panels[3]} 
        className="col-span-4 row-span-2" 
      />
    </div>
  );
};
