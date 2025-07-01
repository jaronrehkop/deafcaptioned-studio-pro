
import React from 'react';
import { TooltipState } from './types';

interface TooltipsProps {
  resizeTooltip: TooltipState | null;
  scrubberTooltip: TooltipState | null;
  moveTooltip?: TooltipState | null;
}

export const Tooltips = ({ resizeTooltip, scrubberTooltip, moveTooltip }: TooltipsProps) => {
  const formatTimeDetailed = (seconds: number): string => {
    const totalSeconds = Math.floor(seconds);
    const milliseconds = Math.floor((seconds % 1) * 100);
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}.${String(milliseconds).padStart(2, '0')}`;
  };

  return (
    <>
      {/* Resize Tooltip */}
      {resizeTooltip?.show && resizeTooltip.duration !== undefined && (
        <div
          className="absolute top-16 bg-black/90 text-white text-xs px-2 py-1 rounded pointer-events-none z-20 font-mono"
          style={{ left: `${resizeTooltip.x}px`, transform: 'translateX(-50%)' }}
        >
          Duration: {resizeTooltip.duration.toFixed(1)}s
        </div>
      )}

      {/* Move Tooltip */}
      {moveTooltip?.show && moveTooltip.startTime !== undefined && moveTooltip.endTime !== undefined && (
        <div
          className="absolute top-16 bg-black/90 text-white text-xs px-2 py-1 rounded pointer-events-none z-20 font-mono whitespace-nowrap"
          style={{ left: `${moveTooltip.x}px`, transform: 'translateX(-50%)' }}
        >
          Start: {formatTimeDetailed(moveTooltip.startTime)} – End: {formatTimeDetailed(moveTooltip.endTime)}
        </div>
      )}

      {/* Scrubber Tooltip */}
      {scrubberTooltip?.show && scrubberTooltip.time !== undefined && (
        <div
          className="absolute -top-8 bg-black/80 text-white text-xs px-2 py-1 rounded pointer-events-none z-20 font-mono"
          style={{ left: `${scrubberTooltip.x}px`, transform: 'translateX(-50%)' }}
        >
          {formatTimeDetailed(scrubberTooltip.time)}
        </div>
      )}
    </>
  );
};
