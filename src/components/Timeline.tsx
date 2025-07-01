
import React, { useState, useRef } from 'react';
import { TimelineRuler } from './timeline/TimelineRuler';
import { CaptionBlock } from './timeline/CaptionBlock';
import { Playhead } from './timeline/Playhead';
import { SnapLines } from './timeline/SnapLines';
import { Tooltips } from './timeline/Tooltips';
import { Caption, TimelineProps, TooltipState } from './timeline/types';

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
  const [resizeTooltip, setResizeTooltip] = useState<TooltipState | null>(null);
  const [moveTooltip, setMoveTooltip] = useState<TooltipState | null>(null);
  const [isDraggingScrubber, setIsDraggingScrubber] = useState(false);
  const [scrubberTooltip, setScrubberTooltip] = useState<TooltipState | null>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const PIXELS_PER_SECOND = 50;
  const timelineWidth = duration * PIXELS_PER_SECOND;

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
    let shouldUpdate = false;

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
        shouldUpdate = true;
        
        // Show move tooltip with start and end times
        setMoveTooltip({
          show: true,
          startTime: newStartTime,
          endTime: newEndTime,
          x: event.clientX - rect.left
        });
      }
    } else if (dragType === 'resize-start') {
      const rawNewStartTime = dragStartTime + deltaTime;
      newStartTime = snapToSecond(Math.max(0, Math.min(caption.endTime - 1, rawNewStartTime)));
      shouldUpdate = true;
      
      // Show resize tooltip with duration
      setResizeTooltip({
        show: true,
        duration: caption.endTime - newStartTime,
        x: event.clientX - rect.left
      });
    } else if (dragType === 'resize-end') {
      const rawNewEndTime = dragStartTime + deltaTime;
      newEndTime = snapToSecond(Math.min(duration, Math.max(caption.startTime + 1, rawNewEndTime)));
      shouldUpdate = true;
      
      // Show resize tooltip with duration
      setResizeTooltip({
        show: true,
        duration: newEndTime - caption.startTime,
        x: event.clientX - rect.left
      });
    }

    // Immediately update the caption for real-time sync
    if (shouldUpdate) {
      const updatedCaption = {
        ...caption,
        startTime: newStartTime,
        endTime: newEndTime
      };
      
      // Call onCaptionUpdate immediately for real-time updates
      onCaptionUpdate(updatedCaption);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDraggedCaption(null);
    setDragType(null);
    setResizeTooltip(null);
    setMoveTooltip(null);
    setIsDraggingScrubber(false);
    setScrubberTooltip(null);
  };

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
            <TimelineRuler duration={duration} pixelsPerSecond={PIXELS_PER_SECOND} />

            {/* Caption Blocks */}
            <div className="absolute top-6 left-0 right-0 bottom-0">
              {captions.map((caption) => (
                <CaptionBlock
                  key={caption.id}
                  caption={caption}
                  pixelsPerSecond={PIXELS_PER_SECOND}
                  onMouseDown={handleCaptionMouseDown}
                />
              ))}
            </div>

            {/* Playhead */}
            <Playhead
              currentTime={currentTime}
              pixelsPerSecond={PIXELS_PER_SECOND}
              onMouseDown={handleScrubberMouseDown}
            />

            {/* Snap lines (1-second intervals) */}
            <SnapLines duration={duration} pixelsPerSecond={PIXELS_PER_SECOND} />

            {/* Tooltips */}
            <Tooltips 
              resizeTooltip={resizeTooltip} 
              scrubberTooltip={scrubberTooltip}
              moveTooltip={moveTooltip}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Re-export Caption type for backward compatibility
export type { Caption };
