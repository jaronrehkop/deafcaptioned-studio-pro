import React, { useState } from 'react';
import { WorkspacePanel } from '../WorkspacePanel';
import { VideoIcon, ClipboardIcon, MessageSquareIcon, ListIcon, SettingsIcon } from 'lucide-react';
import { CaptionSettings } from '../CaptionSettings';
import { VideoPlayer } from '../VideoPlayer';
import { Timeline, Caption } from '../Timeline';

export const EditorDashboard = () => {
  const [videoDuration, setVideoDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [captions, setCaptions] = useState<Caption[]>([]);
  const [activeTrackName, setActiveTrackName] = useState<string>('');

  const handleVideoLoad = (duration: number) => {
    setVideoDuration(duration);
  };

  const handleTimeUpdate = (time: number) => {
    setCurrentTime(time);
  };

  const handleTimeChange = (time: number) => {
    setCurrentTime(time);
  };

  const handleCaptionUpdate = (updatedCaption: Caption) => {
    setCaptions(prev => 
      prev.map(caption => 
        caption.id === updatedCaption.id ? updatedCaption : caption
      )
    );
  };

  const handleCaptionsChange = (newCaptions: Caption[]) => {
    setCaptions(newCaptions);
  };

  const handleTrackNameChange = (name: string) => {
    setActiveTrackName(name);
  };

  const panels = [
    {
      id: 'video-player',
      title: 'Video Player',
      icon: VideoIcon,
      content: (
        <VideoPlayer
          onVideoLoad={handleVideoLoad}
          onTimeUpdate={handleTimeUpdate}
          currentTime={currentTime}
          captions={captions}
        />
      )
    },
    {
      id: 'caption-timeline',
      title: 'Caption Timeline',
      icon: ListIcon,
      content: videoDuration > 0 ? (
        <Timeline
          duration={videoDuration}
          currentTime={currentTime}
          onTimeChange={handleTimeChange}
          captions={captions}
          onCaptionUpdate={handleCaptionUpdate}
          trackName={activeTrackName || 'No Track Selected'}
        />
      ) : (
        <div className="flex items-center justify-center h-full text-slate-400">
          <div className="text-center">
            <ListIcon className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>Upload a video to see the timeline</p>
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
      id: 'caption-settings',
      title: 'Caption Settings',
      icon: SettingsIcon,
      content: (
        <CaptionSettings 
          onCaptionsChange={handleCaptionsChange}
          onTrackNameChange={handleTrackNameChange}
          currentTime={currentTime}
        />
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
        className="col-span-8 row-span-4" 
      />
      <WorkspacePanel 
        {...panels[3]} 
        className="col-span-4 row-span-8" 
      />
      <WorkspacePanel 
        {...panels[1]} 
        className="col-span-8 row-span-2" 
      />
      <WorkspacePanel 
        {...panels[2]} 
        className="col-span-6 row-span-2" 
      />
      <WorkspacePanel 
        {...panels[4]} 
        className="col-span-6 row-span-2" 
      />
    </div>
  );
};
