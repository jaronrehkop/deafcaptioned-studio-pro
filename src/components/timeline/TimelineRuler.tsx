
import React from 'react';

interface TimelineRulerProps {
  duration: number;
  pixelsPerSecond: number;
}

export const TimelineRuler = ({ duration, pixelsPerSecond }: TimelineRulerProps) => {
  const formatTime = (seconds: number): string => {
    const totalSeconds = Math.floor(seconds);
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Generate time markers at 1-second intervals
  const timeMarkers = [];
  for (let i = 0; i <= Math.ceil(duration); i++) {
    timeMarkers.push(i);
  }

  return (
    <div className="absolute top-0 left-0 right-0 h-6 bg-slate-700/30 border-b border-slate-600/50">
      {timeMarkers.map((time) => (
        <div
          key={time}
          className="absolute top-0 border-l border-slate-500/50"
          style={{ left: `${time * pixelsPerSecond}px` }}
        >
          <div className="text-xs text-slate-300 ml-1 mt-0.5 font-mono">
            {formatTime(time)}
          </div>
        </div>
      ))}
    </div>
  );
};
