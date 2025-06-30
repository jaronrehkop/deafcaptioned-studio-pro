
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
  const [dragType, setDragType] = useState<'move' | 'resize-start' | 'resize-end' | null>(null);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragStartTime, setDragStartTime] = useState(0);
  const [resizeTooltip, setResizeTooltip] = useState<{ show: boolean; duration: number; x: number } | null>(null);
  const [isDraggingScrubber, setIsDraggingScrubber] = useState(false);
  const [scrubberTooltip, setScrubberTooltip] = useState<{ show: boolean; time: number; x: number } | null>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const PIXELS_PER_SECOND = 50;
  const timelineWidth = duration * PIXELS_PER_SECOND;

  const formatTime = (seconds: number): string => {
    const totalSeconds = Math.floor(seconds);
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const formatTimeDetailed = (seconds: number): string => {
    const totalSeconds = Math.floor(seconds);
    const milliseconds = Math.floor((seconds % 1) * 100);
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}.${String(milliseconds).padStart(2, '0')}`;
  };

  const snapToSecond = (time: number): number => {
    return Math.round(time);
  };

  const handleTimelineClick = (event: React.MouseEvent) => {
    if (!timelineRef.current || draggedCaption) return;
    
    const rect = timelineRef.current.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const newTime = (clickX / PIXELS_PER_SECOND);
    const snappedTime = snapToSecond(Math.max(0, Math.min(duration, newTime)));
    onTimeChange(snappedTime);
  };

  const handleScrubberMouseDown = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsDraggingScrubber(true);
    
    if (timelineRef.current) {
      const rect = timelineRef.current.getBoundingClientRect();
      setScrubberTooltip({
        show: true,
        time: currentTime,
        x: event.clientX - rect.left
      });
    }
  };

  const handleCaptionMouseDown = (captionId: string, event: React.MouseEvent, type: 'move' | 'resize-start' | 'resize-end') => {
    event.stopPropagation();
    
    setDraggedCaption(captionId);
    setDragType(type);
    setIsDragging(true);
    setDragStartX(event.clientX);
    
    const caption = captions.find(c => c.id === captionId);
    if (caption) {
      setDragStartTime(type === 'resize-end' ? caption.endTime : caption.startTime);
    }
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!timelineRef.current) return;
    
    const rect = timelineRef.current.getBoundingClientRect();
    
    // Handle scrubber dragging
    if (isDraggingScrubber) {
      const clickX = event.clientX - rect.left;
      const newTime = Math.max(0, Math.min(duration, clickX / PIXELS_PER_SECOND));
      const snappedTime = snapToSecond(newTime);
      
      onTimeChange(snappedTime);
      setScrubberTooltip({
        show: true,
        time: snappedTime,
        x: event.clientX - rect.left
      });
      return;
    }

    // Handle caption dragging
    if (!isDragging || !draggedCaption || !dragType) return;
    
    const deltaX = event.clientX - dragStartX;
    const deltaTime = deltaX / PIXELS_PER_SECOND;
    
    const caption = captions.find(c => c.id === draggedCaption);
    if (!caption) return;

    let newStartTime = caption.startTime;
    let newEndTime = caption.endTime;

    if (dragType === 'move') {
      const rawNewStartTime = caption.startTime + deltaTime;
      const rawNewEndTime = caption.endTime + deltaTime;
      
      newStartTime = snapToSecond(Math.max(0, rawNewStartTime));
      newEndTime = snapToSecond(Math.min(duration, rawNewEndTime));
      
      // Prevent overlap with other captions
      const otherCaptions = captions.filter(c => c.id !== draggedCaption);
      const wouldOverlap = otherCaptions.some(other => 
        (newStartTime < other.endTime && newEndTime > other.startTime)
      );
      
      if (!wouldOverlap) {
        onCaptionUpdate({
          ...caption,
          startTime: newStartTime,
          endTime: newEndTime
        });
      }
    } else if (dragType === 'resize-start') {
      const rawNewStartTime = dragStartTime + deltaTime;
      newStartTime = snapToSecond(Math.max(0, Math.min(caption.endTime - 1, rawNewStartTime)));
      
      onCaptionUpdate({
        ...caption,
        startTime: newStartTime
      });
      
      // Show resize tooltip with duration
      setResizeTooltip({
        show: true,
        duration: caption.endTime - newStartTime,
        x: event.clientX - rect.left
      });
    } else if (dragType === 'resize-end') {
      const rawNewEndTime = dragStartTime + deltaTime;
      newEndTime = snapToSecond(Math.min(duration, Math.max(caption.startTime + 1, rawNewEndTime)));
      
      onCaptionUpdate({
        ...caption,
        endTime: newEndTime
      });
      
      // Show resize tooltip with duration
      setResizeTooltip({
        show: true,
        duration: newEndTime - caption.startTime,
        x: event.clientX - rect.left
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDraggedCaption(null);
    setDragType(null);
    setResizeTooltip(null);
    setIsDraggingScrubber(false);
    setScrubberTooltip(null);
  };

  // Generate time markers at 1-second intervals
  const timeMarkers = [];
  for (let i = 0; i <= Math.ceil(duration); i++) {
    timeMarkers.push(i);
  }

  return (
    <div className="bg-slate-800/50 rounded-lg border border-slate-700/50 overflow-hidden">
      {/* Timeline Container */}
      <div className="relative flex">
        {/* Track Label - Pinned to left */}
        <div className="sticky left-0 z-20 bg-slate-700/80 border-r border-slate-600/50 flex items-center px-3 py-2 min-w-[120px]">
          <h4 className="text-white font-medium text-sm truncate">
            {trackName || 'Caption Track'}
          </h4>
        </div>
        
        {/* Scrollable Timeline */}
        <div className="flex-1 overflow-x-auto">
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
                  <div className="text-xs text-slate-300 ml-1 mt-0.5 font-mono">
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
                  className="absolute top-2 h-12 bg-blue-500/80 border border-blue-400 rounded cursor-move flex items-center px-2 hover:bg-blue-500/90 transition-colors group"
                  style={{
                    left: `${caption.startTime * PIXELS_PER_SECOND}px`,
                    width: `${(caption.endTime - caption.startTime) * PIXELS_PER_SECOND}px`,
                    minWidth: '60px'
                  }}
                  onMouseDown={(e) => handleCaptionMouseDown(caption.id, e, 'move')}
                >
                  {/* Display-only text - no editing */}
                  <span className="text-white text-xs truncate font-medium flex-1 pointer-events-none select-none">
                    {caption.text}
                  </span>
                  
                  {/* Resize handles - always visible on hover */}
                  <div 
                    className="absolute left-0 top-0 bottom-0 w-2 bg-blue-300/70 cursor-ew-resize opacity-0 group-hover:opacity-100 transition-opacity rounded-l hover:bg-blue-300" 
                    onMouseDown={(e) => handleCaptionMouseDown(caption.id, e, 'resize-start')}
                    title="Drag to adjust start time"
                  />
                  <div 
                    className="absolute right-0 top-0 bottom-0 w-2 bg-blue-300/70 cursor-ew-resize opacity-0 group-hover:opacity-100 transition-opacity rounded-r hover:bg-blue-300" 
                    onMouseDown={(e) => handleCaptionMouseDown(caption.id, e, 'resize-end')}
                    title="Drag to adjust end time"
                  />
                </div>
              ))}
            </div>

            {/* Playhead */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-10 cursor-grab active:cursor-grabbing hover:w-1 transition-all"
              style={{ left: `${currentTime * PIXELS_PER_SECOND}px` }}
              onMouseDown={handleScrubberMouseDown}
            >
              <div className="absolute -top-1 -left-1 w-3 h-3 bg-red-500 rotate-45 transform origin-center cursor-grab active:cursor-grabbing" />
            </div>

            {/* Snap lines (1-second intervals) */}
            {timeMarkers.map((time) => (
              <div
                key={`snap-${time}`}
                className="absolute top-6 bottom-0 w-px bg-slate-600/30"
                style={{ left: `${time * PIXELS_PER_SECOND}px` }}
              />
            ))}

            {/* Resize Tooltip */}
            {resizeTooltip?.show && (
              <div
                className="absolute top-16 bg-black/90 text-white text-xs px-2 py-1 rounded pointer-events-none z-20 font-mono"
                style={{ left: `${resizeTooltip.x}px`, transform: 'translateX(-50%)' }}
              >
                Duration: {resizeTooltip.duration.toFixed(1)}s
              </div>
            )}

            {/* Scrubber Tooltip */}
            {scrubberTooltip?.show && (
              <div
                className="absolute -top-8 bg-black/80 text-white text-xs px-2 py-1 rounded pointer-events-none z-20 font-mono"
                style={{ left: `${scrubberTooltip.x}px`, transform: 'translateX(-50%)' }}
              >
                {formatTimeDetailed(scrubberTooltip.time)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
