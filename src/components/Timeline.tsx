
import React, { useState, useRef, useEffect } from 'react';

interface Caption {
  id: string;
  text: string;
  startTime: number;
  endTime: number;
}

interface TimelineProps {
  duration: number;
  currentTime: number;
  onTimeChange: (time: number) => void;
  captions: Caption[];
  onCaptionUpdate: (caption: Caption) => void;
  trackName?: string;
}

export const Timeline = ({ 
  duration, 
  currentTime, 
  onTimeChange, 
  captions, 
  onCaptionUpdate,
  trackName 
}: TimelineProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [draggedCaption, setDraggedCaption] = useState<string | null>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const PIXELS_PER_SECOND = 50;
  const timelineWidth = duration * PIXELS_PER_SECOND;

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleTimelineClick = (event: React.MouseEvent) => {
    if (!timelineRef.current || draggedCaption) return;
    
    const rect = timelineRef.current.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const newTime = (clickX / PIXELS_PER_SECOND);
    const clampedTime = Math.max(0, Math.min(duration, newTime));
    onTimeChange(clampedTime);
  };

  const handleCaptionDragStart = (captionId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setDraggedCaption(captionId);
    setIsDragging(true);
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!isDragging || !draggedCaption || !timelineRef.current) return;
    
    const rect = timelineRef.current.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const newStartTime = Math.max(0, mouseX / PIXELS_PER_SECOND);
    
    const caption = captions.find(c => c.id === draggedCaption);
    if (caption) {
      const captionDuration = caption.endTime - caption.startTime;
      const newEndTime = Math.min(duration, newStartTime + captionDuration);
      
      onCaptionUpdate({
        ...caption,
        startTime: newStartTime,
        endTime: newEndTime
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDraggedCaption(null);
  };

  // Generate time markers
  const timeMarkers = [];
  const markerInterval = duration > 60 ? 10 : 5; // 10s intervals for long videos, 5s for short
  
  for (let i = 0; i <= duration; i += markerInterval) {
    timeMarkers.push(i);
  }

  return (
    <div className="bg-slate-800/50 rounded-lg border border-slate-700/50 overflow-hidden">
      {/* Track Header */}
      {trackName && (
        <div className="bg-slate-700/50 px-4 py-2 border-b border-slate-600/50">
          <h4 className="text-white font-medium text-sm">{trackName}</h4>
        </div>
      )}
      
      {/* Timeline Container */}
      <div className="relative overflow-x-auto">
        <div 
          ref={timelineRef}
          className="relative h-20 cursor-pointer"
          style={{ width: `${timelineWidth}px`, minWidth: '100%' }}
          onClick={handleTimelineClick}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* Time Ruler */}
          <div className="absolute top-0 left-0 right-0 h-6 bg-slate-700/30 border-b border-slate-600/50">
            {timeMarkers.map((time) => (
              <div
                key={time}
                className="absolute top-0 border-l border-slate-500/50"
                style={{ left: `${time * PIXELS_PER_SECOND}px` }}
              >
                <div className="text-xs text-slate-300 ml-1 mt-0.5">
                  {formatTime(time)}
                </div>
              </div>
            ))}
          </div>

          {/* Caption Blocks */}
          <div className="absolute top-6 left-0 right-0 bottom-0">
            {captions.map((caption) => (
              <div
                key={caption.id}
                className="absolute top-2 h-12 bg-blue-500/80 border border-blue-400 rounded cursor-move flex items-center px-2 hover:bg-blue-500/90 transition-colors"
                style={{
                  left: `${caption.startTime * PIXELS_PER_SECOND}px`,
                  width: `${(caption.endTime - caption.startTime) * PIXELS_PER_SECOND}px`,
                  minWidth: '60px'
                }}
                onMouseDown={(e) => handleCaptionDragStart(caption.id, e)}
              >
                <span className="text-white text-xs truncate font-medium">
                  {caption.text}
                </span>
                
                {/* Resize handles */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-300 cursor-ew-resize opacity-0 hover:opacity-100 transition-opacity" />
                <div className="absolute right-0 top-0 bottom-0 w-1 bg-blue-300 cursor-ew-resize opacity-0 hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>

          {/* Playhead */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-10 pointer-events-none"
            style={{ left: `${currentTime * PIXELS_PER_SECOND}px` }}
          >
            <div className="absolute -top-1 -left-1 w-3 h-3 bg-red-500 rotate-45 transform origin-center" />
          </div>

          {/* Snap lines (visual feedback) */}
          {timeMarkers.map((time) => (
            <div
              key={`snap-${time}`}
              className="absolute top-6 bottom-0 w-px bg-slate-600/30"
              style={{ left: `${time * PIXELS_PER_SECOND}px` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
