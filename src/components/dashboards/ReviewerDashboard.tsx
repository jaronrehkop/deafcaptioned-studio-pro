
import React from 'react';
import { WorkspacePanel } from '../WorkspacePanel';
import { CheckIcon, MessageSquareIcon, AccessibilityIcon, ListIcon, VideoIcon } from 'lucide-react';

export const ReviewerDashboard = () => {
  const panels = [
    {
      id: 'video-review',
      title: 'Video Review',
      icon: VideoIcon,
      content: (
        <div className="bg-black rounded-lg aspect-video flex items-center justify-center">
          <div className="text-center text-white">
            <VideoIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-semibold">Review Mode</p>
            <p className="text-sm opacity-70">Caption sync verification</p>
          </div>
        </div>
      )
    },
    {
      id: 'accessibility-report',
      title: 'Accessibility Report',
      icon: AccessibilityIcon,
      content: (
        <div className="space-y-4">
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <CheckIcon className="h-5 w-5 text-green-400" />
              <div>
                <p className="text-green-400 font-semibold">WCAG 2.1 AA Compliant</p>
                <p className="text-sm text-slate-300">Caption contrast meets standards</p>
              </div>
            </div>
          </div>
          <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <span className="text-orange-400">⚠️</span>
              <div>
                <p className="text-orange-400 font-semibold">1 Warning</p>
                <p className="text-sm text-slate-300">Caption block exceeds 2 lines at 00:15</p>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <h4 className="text-white font-semibold">Quick Stats</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-slate-400">Total Captions:</span>
                <span className="text-white ml-2">47</span>
              </div>
              <div>
                <span className="text-slate-400">Speakers Tagged:</span>
                <span className="text-white ml-2">3</span>
              </div>
              <div>
                <span className="text-slate-400">Music Blocks:</span>
                <span className="text-white ml-2">2</span>
              </div>
              <div>
                <span className="text-slate-400">Avg Duration:</span>
                <span className="text-white ml-2">3.2s</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'comment-system',
      title: 'Review Comments',
      icon: MessageSquareIcon,
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-white font-semibold">Add Review Comment</h4>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded text-sm transition-colors">
              New Comment
            </button>
          </div>
          <textarea 
            className="w-full bg-slate-700/30 border border-slate-600/50 rounded-lg p-3 text-white placeholder-slate-400 resize-none focus:outline-none focus:ring-2 focus:ring-orange-500/50"
            placeholder="Add your review comment..."
            rows={3}
          />
          <div className="space-y-3">
            <div className="bg-slate-700/30 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <span className="text-orange-400 font-semibold text-sm">Your Comment</span>
                <span className="text-xs text-slate-400">Draft</span>
              </div>
              <p className="text-white text-sm">Please clarify speaker at timestamp 00:23. Could be clearer for accessibility.</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'ai-validation',
      title: 'AI Validation Tools',
      icon: CheckIcon,
      content: (
        <div className="space-y-4">
          <button className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-3 px-4 rounded-lg hover:shadow-lg transition-all">
            🔍 AI Highlight Issues
          </button>
          <button className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white py-3 px-4 rounded-lg hover:shadow-lg transition-all">
            🎯 Re-suggest Speakers
          </button>
          <button className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 text-white py-3 px-4 rounded-lg hover:shadow-lg transition-all">
            ✅ Validation Checklist
          </button>
          <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-4 rounded-lg hover:shadow-lg transition-all">
            📊 Version Comparison
          </button>
          <div className="bg-slate-700/30 rounded-lg p-4">
            <h4 className="text-white font-semibold mb-2">AI Recommendations</h4>
            <p className="text-sm text-slate-300">• All speakers properly identified</p>
            <p className="text-sm text-slate-300">• Music descriptions are adequate</p>
            <p className="text-sm text-orange-300">• Consider shortening caption at 00:15</p>
          </div>
        </div>
      )
    },
    {
      id: 'approval-panel',
      title: 'Approval Actions',
      icon: CheckIcon,
      content: (
        <div className="space-y-4">
          <div className="bg-slate-700/30 rounded-lg p-4">
            <h4 className="text-white font-semibold mb-3">Review Status</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-300 text-sm">Accessibility Check</span>
                <CheckIcon className="h-5 w-5 text-green-400" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300 text-sm">Speaker Identification</span>
                <CheckIcon className="h-5 w-5 text-green-400" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300 text-sm">Timing Accuracy</span>
                <span className="text-orange-400 text-sm">Needs Review</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button className="bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg transition-colors">
              Send Back
            </button>
            <button className="bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg transition-colors">
              Approve
            </button>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="h-full grid grid-cols-12 grid-rows-8 gap-4 p-4">
      <WorkspacePanel 
        {...panels[0]} 
        className="col-span-7 row-span-5" 
      />
      <WorkspacePanel 
        {...panels[1]} 
        className="col-span-5 row-span-5" 
      />
      <WorkspacePanel 
        {...panels[2]} 
        className="col-span-4 row-span-3" 
      />
      <WorkspacePanel 
        {...panels[3]} 
        className="col-span-4 row-span-3" 
      />
      <WorkspacePanel 
        {...panels[4]} 
        className="col-span-4 row-span-3" 
      />
    </div>
  );
};
