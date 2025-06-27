
import React from 'react';
import { WorkspacePanel } from '../WorkspacePanel';
import { VideoIcon, ClipboardIcon, MessageSquareIcon, ListIcon, AccessibilityIcon } from 'lucide-react';

export const EditorDashboard = () => {
  const panels = [
    {
      id: 'video-player',
      title: 'Video Player',
      icon: VideoIcon,
      content: (
        <div className="bg-black rounded-lg aspect-video flex items-center justify-center">
          <div className="text-center text-white">
            <VideoIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-semibold">Video Player</p>
            <p className="text-sm opacity-70">Synced with caption timeline</p>
          </div>
        </div>
      )
    },
    {
      id: 'caption-timeline',
      title: 'Caption Timeline',
      icon: ListIcon,
      content: (
        <div className="space-y-3">
          <div className="bg-slate-700/50 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-slate-300">00:00:05 - 00:00:08</span>
              <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">Speaker 1</span>
            </div>
            <p className="text-white">Welcome to our platform demonstration.</p>
          </div>
          <div className="bg-slate-700/50 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-slate-300">00:00:08 - 00:00:12</span>
              <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">Speaker 2</span>
            </div>
            <p className="text-white">This system provides professional captioning tools.</p>
          </div>
          <div className="bg-slate-700/50 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-slate-300">00:00:12 - 00:00:15</span>
              <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded">[Music]</span>
            </div>
            <p className="text-white italic">[Upbeat background music begins]</p>
          </div>
        </div>
      )
    },
    {
      id: 'notepad',
      title: 'Script Notepad',
      icon: ClipboardIcon,
      content: (
        <div className="h-full">
          <textarea 
            className="w-full h-full bg-slate-700/30 border border-slate-600/50 rounded-lg p-4 text-white placeholder-slate-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            placeholder="Paste your script or rough transcript here..."
            defaultValue="ROUGH SCRIPT:

Speaker 1: Welcome to our platform...
Speaker 2: This system provides...
[Background music starts]
Speaker 1: Let me show you..."
          />
        </div>
      )
    },
    {
      id: 'ai-tools',
      title: 'AI Assistant',
      icon: AccessibilityIcon,
      content: (
        <div className="space-y-4">
          <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-4 rounded-lg hover:shadow-lg transition-all">
            🎯 Auto Tag Speakers
          </button>
          <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg hover:shadow-lg transition-all">
            🎵 Detect Music & Lyrics
          </button>
          <button className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-3 px-4 rounded-lg hover:shadow-lg transition-all">
            🌊 Add Sound Descriptions
          </button>
          <button className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white py-3 px-4 rounded-lg hover:shadow-lg transition-all">
            ♿ WCAG Accessibility Scan
          </button>
          <div className="bg-slate-700/30 rounded-lg p-4 mt-4">
            <h4 className="text-white font-semibold mb-2">AI Suggestions</h4>
            <p className="text-sm text-slate-300">• Consider adding emotional tone indicators</p>
            <p className="text-sm text-slate-300">• Background music detected at 00:12</p>
            <p className="text-sm text-slate-300">• Speaker transition could be clearer</p>
          </div>
        </div>
      )
    },
    {
      id: 'comments',
      title: 'Reviewer Comments',
      icon: MessageSquareIcon,
      content: (
        <div className="space-y-3">
          <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <span className="text-orange-400 font-semibold text-sm">Reviewer</span>
              <span className="text-xs text-slate-400">2 hours ago</span>
            </div>
            <p className="text-white text-sm">Caption at 00:05 needs speaker identification. Please tag as Speaker 1.</p>
          </div>
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <span className="text-blue-400 font-semibold text-sm">Reviewer</span>
              <span className="text-xs text-slate-400">1 hour ago</span>
            </div>
            <p className="text-white text-sm">Great work on the music descriptions! WCAG compliant.</p>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="h-full grid grid-cols-12 grid-rows-8 gap-4 p-4">
      <WorkspacePanel 
        {...panels[0]} 
        className="col-span-8 row-span-5" 
      />
      <WorkspacePanel 
        {...panels[3]} 
        className="col-span-4 row-span-5" 
      />
      <WorkspacePanel 
        {...panels[1]} 
        className="col-span-5 row-span-3" 
      />
      <WorkspacePanel 
        {...panels[2]} 
        className="col-span-3 row-span-3" 
      />
      <WorkspacePanel 
        {...panels[4]} 
        className="col-span-4 row-span-3" 
      />
    </div>
  );
};
